chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.status === "complete") {
      chrome.tabs.sendMessage(tabId, { action: "runContentScript" });
    }
  });