const getCurrentTab = async () => {
	const [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	return tab?.id ? tab : null;
};

chrome.runtime.onMessage.addListener((msg, sender) => {
	if (msg.type === "POPUP_CONFIG_CHANGE") {
		console.log(msg.payload);
		chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
			if (!tab?.id) return;
			chrome.tabs.sendMessage(tab.id, {
				type: "CONFIG_CHANGE",
				payload: msg.payload,
			});
		});
	}
});
/*
chrome.webRequest.onCompleted.addListener(
	async function (details) {
		const tab = await getCurrentTab();
		if (!tab) return;
		chrome.tabs.sendMessage(tab.id, {
			type: "FETCH",
			payload: { ...details, eventype: "COMPLETED" },
		});
	},
	{ urls: ["<all_urls>"] },
);
*/
chrome.webRequest.onCompleted.addListener(
	async (details) => {
		if (details.tabId === -1) return;
		chrome.tabs
			.sendMessage(details.tabId, {
				type: "FETCH",
				payload: { ...details, eventype: "ON_COMPLETE" },
			})
			.catch((e) => {});
	},
	{ urls: ["<all_urls>"] },
);

chrome.webRequest.onBeforeRequest.addListener(
	async (details) => {
		if (details.tabId === -1) return;
		chrome.tabs
			.sendMessage(details.tabId, {
				type: "FETCH",
				payload: { ...details, eventype: "ON_BEFORE_REQUEST" },
			})
			.catch((e) => {});
	},
	{ urls: ["<all_urls>"] },
);

chrome.webRequest.onBeforeRedirect.addListener(
	async (details) => {
		if (details.tabId === -1) return;
		chrome.tabs
			.sendMessage(details.tabId, {
				type: "FETCH",
				payload: { ...details, eventype: "ON_BEFORE_REDIRECT" },
			})
			.catch((e) => {});
	},
	{ urls: ["<all_urls>"] },
);
