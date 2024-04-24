// dbOperation.js
const config = require('./dbConfig');
const sql = require('mssql');
const fs = require('fs'); 

const insertPDF = async (filename) => {
    try {
        console.log('1')
        let pool = await sql.connect(config);

        // Read the file from the uploads directory
        const fileData = fs.readFileSync(`uploads/${filename}`);

        // Convert binary data to Base64 string
        const base64Data = Buffer.from(fileData).toString('base64');
        
        console.log('2')

        let file = await pool.request()
            .input('pdf', sql.NVarChar(sql.MAX), base64Data) 
            .query(`
                INSERT INTO SSS (Pay_Slip)
                VALUES (@pdf)
            `); 

        console.log(file);
    } catch (error) {
        console.error("Error updating employee attendance:", error);
        throw error;
    }
}

const getSubmissions = async () => {
    try {
        let pool = await sql.connect(config);

        // Query the database to get the PDF data based on the ID
        let result = await pool.request() 
            .query(`
                SELECT 
                    Employee.Name,
                    Employee.EmailAddress,
                    Submission.SubmissionID,
                    Submission.TransactionType,
                    Submission.TurnAround,
                    Submission.Status,
                    Submission.DateTime,
                    Submission.LoanAppDate,
                    Submission.TransactionNum,
                    Submission.TypeOfDelivery
                FROM Submission
                LEFT JOIN Employee ON Submission.EmpId = Employee.EmpId 
            `);

        // If there's no result, return null
        if (result.recordset.length === 0) {
            return null;
        } 
    
        return result.recordset;

    } catch (error) {
        console.error("Error retrieving PDF data:", error);
        throw error;
    }
}

const getUserSubmissions = async (id) => {
    try {
        let pool = await sql.connect(config);

        // Query the database to get the PDF data based on the ID
        let result = await pool.request() 
            .input('id', sql.Int, id)
            .query(`
                SELECT 
                    Employee.Name,
                    Submission.SubmissionID,
                    Submission.TransactionType,
                    Submission.TurnAround,
                    Submission.Status,
                    Submission.DateTime,
                    Submission.LoanAppDate,
                    Submission.TransactionNum,
                    Submission.TypeOfDelivery
                FROM Submission
                LEFT JOIN Employee ON Submission.EmpId = Employee.EmpId 
                Where Submission.EmpId = @id
            `);

        // If there's no result, return null
        if (result.recordset.length === 0) {
            return null;
        } 
    
        return result.recordset;

    } catch (error) {
        console.error("Error retrieving PDF data:", error);
        throw error;
    }
}

const getPDF = async (id) => {
    try {
        let pool = await sql.connect(config);

        // Query the database to get the PDF data based on the ID
        let result = await pool.request() 
            .input('id', sql.Int, id)
            .query(`
                SELECT *
                FROM PdfFile
                WHERE SubmissionID = @id
            `);

        // If there's no result, return null
        if (result.recordset.length === 0) {
            return null;
        } 
        // console.log(result.recordset)
        return result.recordset;
    } catch (error) {
        console.error("Error retrieving PDF data:", error);
        throw error;
    }
}

const updatePDF = async (id,reason,subId) => {
    try {
        let pool = await sql.connect(config);

        console.log('this',id,reason,subId); 
        let result = await pool.request()
            .input('id', sql.Int, id)
            .input('reason', sql.NVarChar(200), reason) // Assuming the reason is a string with a maximum length of 50 characters
            .query(`
                UPDATE PdfFile
                SET ResubmitReason = @reason,
                Resubmit = 1,
                Updated = 1
                WHERE PdfFileID = @id
            `); 
        let submission = await pool.request()
            .input('id', sql.Int, subId) 
            .query(`
                UPDATE Submission
                SET Status = 'Resubmit'
                WHERE SubmissionID = @id
            `);
 
        return "Successfully updated the pdf";
    } catch (error) {
        console.error("Error updating PDF data:", error);
        throw error;
    }
}

const updateSubmission = async (id) => {
    try {
        let pool = await sql.connect(config);
 
        let result = await pool.request()
            .input('id', sql.Int, id) 
            .query(`
                UPDATE Submission
                SET Status = 'Complete'
                WHERE SubmissionID = @id
            `);
 
        return "Successfully updated the pdf";
    } catch (error) {
        console.error("Error updating PDF data:", error);
        throw error;
    }
}


module.exports = {
    insertPDF,
    getSubmissions,
    getUserSubmissions,
    getPDF,
    updatePDF,
    updateSubmission,
};