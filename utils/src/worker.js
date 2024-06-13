chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.type == 'download') {
        chrome.downloads.download({
            url: message.url,
            filename: message.filename,
        })
    }
})

chrome.commands.onCommand.addListener((cmd, tab) => {
    if (cmd == 'skip-1-30') {
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
                allFrames: true,
            },
            files: ['src/skip.js'],
        })
    }
})
