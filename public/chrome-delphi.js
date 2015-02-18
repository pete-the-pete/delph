/**
* Listen for clicks on the main extension button.
*/
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html#/analytics')});
});