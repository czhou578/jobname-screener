// Listen for messages from the popup script

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let existingCompanies = null

    if (request.action === "setData") {
        existingCompanies = request.data
        localStorage.setItem('companies', JSON.stringify(existingCompanies.companies))
    }

    const currentUrl = window.location.href.toLowerCase();
    // Get the current page's URL
    
    // Check if the URL contains "linkedin" or "indeed"
    if (currentUrl.includes("linkedin.com/jobs/")) {
    
        let listedNameElements = document.querySelectorAll('.job-card-container__primary-description')

        for (let companyName of listedNameElements) {
            if (existingCompanies !== null && existingCompanies.companies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }
          
      console.log("This page is LinkedIn related.");
    } else if (currentUrl.includes("indeed.com/jobs")) {
        const elements = document.querySelectorAll('[data-testid="company-name"]');

        for (let companyName of elements) {
            if (existingCompanies !== null && existingCompanies.companies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }

      console.log("This page is Indeed related.");
    } else {
      console.log("This page is not LinkedIn or Indeed related.");
    }
  });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === "runContentScript") {
    if (localStorage.getItem('companies') !== null) {
        let existingCompanies = JSON.parse(localStorage.getItem('companies'))

        const currentUrl = window.location.href.toLowerCase();
        
        if (currentUrl.includes("linkedin.com/jobs/")) {
        
            let listedNameElements = document.querySelectorAll('.job-card-container__primary-description')
    
            for (let companyName of listedNameElements) {
                if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                    companyName.style.color = 'orange'
                }
            }
                
            console.log("This page is LinkedIn related.");
        } else if (currentUrl.includes("indeed")) {

            const elements = document.querySelectorAll('[data-testid="company-name"]');

            for (let companyName of elements) {
                if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                    companyName.style.color = 'orange'
                }
            }

        } else {
            console.log("This page is not LinkedIn or Indeed related.");
        }
        console.log('Key exists');
    } else {
        console.log('Key does not exist');
    }
}
});



