const API_KEY = "AIzaSyDoxZ603PjBf9o6qCqtzQG8wr-3WmBEv04";  // Replace with your Google API Key
const SPREADSHEET_ID = "1fc0h0DPjSsbHR__qecMSrF2IW9AUhPPDh00jDWEOoy0"  // Replace with your Spreadsheet ID
const range = 'A:A';  // Define the range for column A
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
  
    button.addEventListener("click", async function () {
      // Send a message to the background script
        button.style.backgroundColor = 'orange';
        button.style.value = 'Fetching...'

        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const data = await response.json();
            const columnAData = data.values || [];
            let result = columnAData.flat()

            chrome.storage.local.set({ "companies": result });

            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                // Get the data from local storage
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['content.js']
                }, () => {
                    console.log("Content script injected.");
                    // Now you can safely send a message
                    chrome.storage.local.get("companies", function(result) {
                    // Send the data to the content script
                    chrome.tabs.sendMessage(tabs[0].id, { action: "setData", data: result }, (response) => {
                        console.log(response);
                    });
                });
    
                });
            });            

            button.style.value = 'Fetched!'
            button.style.backgroundColor = ''
            setTimeout(() => {
                button.style.value = 'Fetch Data'
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    });
  });


