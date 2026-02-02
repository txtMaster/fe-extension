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