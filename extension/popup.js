document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
  
    button.addEventListener("click", function () {
      // Send a message to the background script
      chrome.runtime.sendMessage({ action: "runScript" });
    });
  });


// async function fetchColumnA() {
//     console.log('inside function')
//     const API_KEY = 'AIzaSyDoxZ603PjBf9o6qCqtzQG8wr-3WmBEv04';  // Replace with your Google API Key
//     const SPREADSHEET_ID = '1fc0h0DPjSsbHR__qecMSrF2IW9AUhPPDh00jDWEOoy0';  // Replace with your Spreadsheet ID
//     const range = 'A:A';  // Define the range for column A
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
    
//     try {
//         const response = await fetch(url);
        
//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
        
//         const data = await response.json();
//         const columnAData = data.values || [];
//         let result = columnAData.flat()

//         console.log("Column A Data:", result);
//         chrome.storage.local.set({ companies: result});

//         // return columnAData;
//     } catch (error) {
//         console.error("Failed to fetch data from Google Sheets:", error);
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    if (button) {
      button.addEventListener('click', function() {
        // alert('Button clicked!');
        console.log('heasdkfjasdf')
        // fetchColumnA()
      });
    } else {
      console.log('Button not found!');
    }
  });
  
