export const $ = {
	find: (qry, container = document) => container.querySelector(qry),
	finds: (qry, container = document) => container.querySelectorAll(qry),
	new: (tag = "div", container = document) => container.createElement(tag),
	define: (tag = "div", classname, id) => {
		const $el = $.new(tag);
		if (classname) $el.className = classname;
		if (id) $el.id = id;
		return $el;
	},
};