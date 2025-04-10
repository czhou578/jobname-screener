
// Select the job list container
// const jobListContainer = document.querySelector(".TLMROFEMTCRfHzVUhGINJATfqcfxkbxZYELI");

// if (jobListContainer) {
//   // Create a MutationObserver to monitor changes in the job list
//   const observer = new MutationObserver((mutationsList) => {
//     for (const mutation of mutationsList) {
//       if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//         console.log("New jobs detected!");
        
//         // Process the new job postings
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === 1) {
//             console.log("New job element:", node);
//           }
//         });
//       }
//     }
//   });

//   // Start observing the job list container for added nodes (new jobs)
//   observer.observe(jobListContainer, { childList: true, subtree: true });

//   console.log("Observer started for LinkedIn jobs.");
// } else {
//   console.error("Job list container not found.");
// }

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



