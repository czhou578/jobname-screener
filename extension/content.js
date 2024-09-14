// Listen for messages from the popup script

let existingCompanies = null

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setData") {
        existingCompanies = request.data
        console.log(existingCompanies); // Output: "myValue"
    }

    const currentUrl = window.location.href.toLowerCase();
    // Get the current page's URL
    
    // Check if the URL contains "linkedin" or "indeed"
    if (currentUrl.includes("linkedin.com/jobs/")) {
    
    // Send a message to the popup script to get the data
    
        //grab all comopany names from current page and store in array
        //grab company names from local storage
        //compare from both lists and find duplicates. If find match, change header color to orange
        let listedNameElements = document.querySelectorAll('.job-card-container__primary-description')
        console.log('listed elements, ', listedNameElements)

        for (let companyName of listedNameElements) {
            if (existingCompanies !== null && existingCompanies.companies.includes(companyName.innerText)) {
                console.log('company, ', companyName)
                companyName.style.color = 'orange'
            }
        }
          
      console.log("This page is LinkedIn related.");
    } else if (currentUrl.includes("indeed")) {
      console.log("This page is Indeed related.");
    } else {
      console.log("This page is not LinkedIn or Indeed related.");
    }
  });

