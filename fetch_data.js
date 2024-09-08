const { google } = require('googleapis');
const sheets = google.sheets('v4');

async function getCompanies(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: 'your-spreadsheet-id',
        range: 'Sheet1!A:A', // Assuming column A has company names
    });
    const rows = response.data.values;
    return rows ? rows.map(row => row[0]) : [];
}
