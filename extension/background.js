async function fetchColumnA() {
    console.log('inside function')
    const API_KEY = 'AIzaSyDoxZ603PjBf9o6qCqtzQG8wr-3WmBEv04';  // Replace with your Google API Key
    const SPREADSHEET_ID = '1fc0h0DPjSsbHR__qecMSrF2IW9AUhPPDh00jDWEOoy0';  // Replace with your Spreadsheet ID
    const range = 'A:A';  // Define the range for column A
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        const columnAData = data.values || [];
        let result = columnAData.flat()

        console.log("Column A Data:", result);
        chrome.storage.local.set({ companies: result});

        // return columnAData;
    } catch (error) {
        console.error("Failed to fetch data from Google Sheets:", error);
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "runScript") {
      // Call the function to run the script
      console.log('run the script')
      fetchColumnA()
    }
  });