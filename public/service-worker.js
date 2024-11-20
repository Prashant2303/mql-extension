chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    console.log('In sw receiver', request, sender);

    const allowedWebsites = ["http://localhost:3000", "https://my-question-list.vercel.app"]

    const { origin } = new URL(sender.url);

    if (sender.url && allowedWebsites.includes(origin)) {
        const { action, userData } = request;
        switch (action) {
            case "LOGIN": {
                await chrome.storage.local.set({ userData });
                const msg = "User logged in extension";
                console.log(msg);
                sendResponse(msg);
                break;
            }
            case "LOGOUT": {
                await chrome.storage.local.clear();
                const msg = "User logged out of extension";
                console.log(msg);
                sendResponse(msg);
                break;
            }
            case "UPDATE": {
                await chrome.storage.local.set({ userData });
                const msg = "User updated in extension";
                console.log(msg);
                sendResponse(msg);
                break;
            }
            default:
                break;
        }
    }
});
