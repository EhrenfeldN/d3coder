D3.checkInstall(D3.createContextMenu());

chrome.storage.onChanged.addListener(function(changes, namespace) {
    D3.createContextMenu();
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
    console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
    if (request.command == "doCopy") {
        console.log(D3);
        var responseStatus = D3.copyToClipboard(D3.lastMessage);
        sendResponse({status: [chrome.i18n.getMessage("message_copied_to_clipboard"), responseStatus] });
    } else {
        sendResponse({}); // snub them.
    }
});
