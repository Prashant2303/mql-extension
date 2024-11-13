chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        console.log('In sw receiver', request, sender);

        const allowedWebsites = ["http://127.0.0.1:5500/index.html", "http://localhost:3000/signin"]
        if (sender.url && allowedWebsites.includes(sender.url)) {
            console.log('Store the token', request.userData);
            const { userData } = request;
            chrome.storage.local.set({ userData }).then(() => {
                console.log("Value is set");
                sendResponse(userData);
            });
        }
    });
