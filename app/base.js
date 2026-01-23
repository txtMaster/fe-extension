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


export class Plugin {
	css = new CSSStyleSheet();
	$control = $.new();
	constructor() {}
	on() {
		if (!document.adoptedStyleSheets.includes(this.css)) {
			document.adoptedStyleSheets.push(this.css);
		}
	}
	off() {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
			(s) => s !== this.css,
		);
	}
}

export class FixOpsPlugin extends Plugin {
	constructor() {
		super();
		this.$control.innerHTML = /*html */ `<label>
            <input type="checkbox"> fijar columna de operaciones
        </label>`;
		this.$control.addEventListener("change", (e) => {
			e.target.checked ? this.on() : this.off();
		});
		this.css.insertRule(`tbody tr td:last-child{
            position:sticky;
            right:0;
        }`);
	}
}