/* global chrome */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openSidePanel') {
        chrome.sidePanels.create({
            path: 'side-panel.html',
            width: 300,
            title: 'My Side Panel',
            open: true
        });
    }
});