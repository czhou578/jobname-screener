
let existingCompanies = JSON.parse(localStorage.getItem('companies')) || [];

const jobListContainer = document.body; // Use the body or a specific container to observe changes

if (jobListContainer) {
    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(() => {
        const listedNameElements = document.querySelectorAll('[dir="ltr"]');
        console.log('Current number of elements:', listedNameElements.length);

        // Iterate over the elements and check if they match existingCompanies
        for (let companyName of listedNameElements) {
            if (existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'; // Highlight the company name
            }
        }
    });

    // Start observing the container for changes in child nodes
    observer.observe(jobListContainer, { childList: true, subtree: true });

    console.log("Observer started to monitor changes in the job list.");
} else {
    console.error("Job list container not found.");
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let existingCompanies = null

    if (request.action === "setData") {
        existingCompanies = request.data.companies
        console.log('data received, ', existingCompanies)
        localStorage.setItem('companies', JSON.stringify(existingCompanies))
        console.log('content script has set local storage')
    }

    const currentUrl = window.location.href.toLowerCase();
    // Get the current page's URL
    
    // Check if the URL contains "linkedin" or "indeed"
    if (currentUrl.includes("linkedin.com/jobs/")) {
    
        let listedNameElements = document.querySelectorAll('[dir="ltr"]')
        console.log('listedNameElements', listedNameElements)

        for (let companyName of listedNameElements) {
            if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }
          
      console.log("This page is LinkedIn related.");
    } else if (currentUrl.includes("indeed.com/jobs")) {
        const elements = document.querySelectorAll('[data-testid="company-name"]');

        for (let companyName of elements) {
            if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }

      console.log("This page is Indeed related.");
    } else if (currentUrl.includes("levels.fyi/jobs")) {

        const elements = document.querySelectorAll('.company-jobs-preview-card_companyName__cQKav')

        for (let companyName of elements) {
            if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }        

    } else if (currentUrl.includes("workatastartup.com/companies")) { //ycombinator jobs website
        const elements = document.querySelectorAll('.company-name')

        for (let companyName of elements) {
            if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }          

        console.log("This page is not LinkedIn or Indeed related.");
    
    } else if (currentUrl.includes("wellfound.com/jobs")) {
        const elements = document.getElementsByTagName('h2')
        for (let companyName of elements) {
            if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        } 
    } else if (currentUrl.includes("ziprecruiter.com/jobs")) {
        const elements = document.querySelectorAll('[data-testid="job-card-company"]');
        for (let companyName of elements) {
            if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                companyName.style.color = 'orange'
            }
        }         
    }
  });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === "runContentScript") {
    console.log('runContentScript has been received')

    if (localStorage.getItem('companies') !== null) {
        let existingCompanies = JSON.parse(localStorage.getItem('companies'))

        const currentUrl = window.location.href.toLowerCase();
        
        if (currentUrl.includes("linkedin.com/jobs/")) {
        
            let listedNameElements = document.querySelectorAll('.NOCEEbNyHzVQXNshVZJTiaELfHeRmUgRpKvpVyUbL')
            
            console.log('listedNameElements', listedNameElements)
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

        } else if (currentUrl.includes("levels.fyi")) {
            const elements = document.querySelectorAll('.company-jobs-preview-card_companyName__cQKav')

            for (let companyName of elements) {
                if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                    companyName.style.color = 'orange'
                }
            }

        } else if (currentUrl.includes("ziprecruiter")) {
            const elements = document.querySelectorAll('[data-testid="job-card-company"]');
            for (let companyName of elements) {
                if (existingCompanies !== null && existingCompanies.includes(companyName.innerText)) {
                    companyName.style.color = 'orange'
                }
            }             
        }
        console.log('Key exists');

    } else {
        console.log('Key does not exist');
    }
}
});



