// Get the current page's URL
const currentUrl = window.location.href.toLowerCase();

// Check if the URL contains "linkedin" or "indeed"
if (currentUrl.includes("linkedin.com/jobs/")) {
    //grab all comopany names from current page and store in array
    //grab company names from local storage
    //compare from both lists and find duplicates. If find match, change header color to orange
    let listedNameElements = document.getElementsByTagName('strong')

    chrome.storage.local.get(['companies'], function(result) {
        for (let companyName of listedNameElements) {
            if (result.companies.includes(companyName.textContent)) {
              companyName.style.color = 'orange'
            }
        }
      });
      
  console.log("This page is LinkedIn related.");
} else if (currentUrl.includes("indeed")) {
  console.log("This page is Indeed related.");
} else {
  console.log("This page is not LinkedIn or Indeed related.");
}
