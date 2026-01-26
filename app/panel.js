document.getElementById("FixOpsColPlugin").onchange = async ({ target }) => {
	if (target.id) return;
    //await chrome.storage.local()
	chrome.runtime.sendMessage({
		type: "POPUP_CONFIG_CHANGE",
        payload:{
            pluginClassName: target.id,
            value: target.checked
        }
	});
};