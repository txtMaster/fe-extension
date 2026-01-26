import { mappedPluginClassNames } from "/app/plugins/mappedPluginClassNames.js";

const DEFAULT_CONFIG = {
	enabled: true,
	plugins: {},
};

const getConfig = async () => {
	const { config } = await chrome.storage.local.get({ config: DEFAULT_CONFIG });
	return config;
};

const replaceConfig = async (callback = (config) => config) => {
	const config = await getConfig();
	const newConfig = callback(config);
	await chrome.storage.local.set({ config: newConfig });
};

const $pluginSwitch = document.getElementById("PluginSwitch");

getConfig().then(({ enabled, plugins }) => {
	$pluginSwitch.checked = enabled;
	for (const pluginName in plugins) {
		const value = plugins[pluginName];
		const input = document.getElementById(pluginName);
		if (input) input.checked = value;
	}
});

mappedPluginClassNames.forEach((id) => {
	const input = document.getElementById(id);
	if (!input) return;
	document.getElementById(id).onchange = async ({ target }) => {
		await replaceConfig((config) => {
			config.plugins[target.id] = target.checked;
			return config;
		});
		const { enabled } = await getConfig();
		//si esta deshabilitado, no notificar al content_script
		if (!enabled) return;
		chrome.runtime.sendMessage({
			type: "POPUP_CONFIG_CHANGE",
			payload: {
				plugins: {
					[target.id]: target.checked,
				},
			},
		});
	};
});

document.getElementById("PluginSwitch").onchange = async ({ target }) => {
	await replaceConfig((config) => ({ ...config, enabled: target.checked }));
	let pluginsState = {};
	if (!target.checked)
		pluginsState = Object.fromEntries(
			mappedPluginClassNames.map((name) => [name, false]),
		);
	else pluginsState = (await getConfig()).plugins;
	chrome.runtime.sendMessage({
		type: "POPUP_CONFIG_CHANGE",
		payload: {
			plugins: pluginsState,
		},
	});
};
