globalThis.cache = {};

/**@param {string} uri */
globalThis.src = async (uri) => {
	if (!cache[uri]) cache[uri] = await import(chrome.runtime.getURL(uri));
	return cache[uri];
};
globalThis.srcAll = async (...uris) => {
	return await Promise.all(uris.map((uri) => src(uri)));
};

globalThis.css = new CSSStyleSheet();
document.adoptedStyleSheets.push(globalThis.css);

(async () => {
	const { dom, fetchListeners } = await src("/app/base.js");
	//obtener todos las classes de los plugins
	const { mappedPluginClasses } = await src(
		"/app/plugins/mappedPluginClasses.js",
	);

	//instanciar los plugins
	const mappedPlugins = {};

	for (const className in mappedPluginClasses) {
		const pluginClass = mappedPluginClasses[className];
		mappedPlugins[className] = new pluginClass();
	}

	//cargar configuracion
	/**@type {{ config:object }} */
	const { config } = await chrome.storage.local.get({ config: {} });

	//encender los plugins guardados
	if (config?.enabled && typeof config?.plugins === "object") {
		for (const pluginName in config.plugins) {
			const plugin = mappedPlugins[pluginName];
			const enabled = config.plugins[pluginName];
			enabled ? plugin.on() : plugin.off();
		}
	}

	chrome.runtime.onMessage.addListener(({ payload, type }) => {
		if (type === "CONFIG_CHANGE" && typeof payload === "object") {
			const { plugins } = payload;
			for (const pluginName in plugins) {
				const pluginState = plugins[pluginName];
				const plugin = mappedPlugins?.[pluginName];
				if (plugin) pluginState ? plugin?.on() : plugin?.off();
			}
		} else if (type === "FETCH") {
			fetchListeners.listeners.forEach((callback) => callback(payload));
		}
	});
})();
