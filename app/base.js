export const dom = {
	find: (qry, container = document) => container.querySelector(qry),
	finds: (qry, container = document) => container.querySelectorAll(qry),
	new: (tag = "div", container = document) => container.createElement(tag),
	define: (tag = "div", classname, id) => {
		const $el = dom.new(tag);
		if (classname) $el.className = classname;
		if (id) $el.id = id;
		return $el;
	},
};

window.__patches ??= {};

export const fetchListeners = {
	listeners: new Set(),
	add: function (callback) {
		this.listeners.add(callback);
	},
	remove(cb) {
		this.listeners.delete(cb);
	},
};

const DEFAULT_CONFIG = {
	enabled: true,
	plugins: {},
};

export const getConfig = async () => {
	const { config } = await chrome.storage.local.get({ config: DEFAULT_CONFIG });
	return config;
};

export const replaceConfig = async (callback = (config) => config) => {
	const config = await getConfig();
	const newConfig = callback(config);
	await chrome.storage.local.set({ config: newConfig });
};
