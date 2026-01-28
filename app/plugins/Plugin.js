const { $ } = await src("/app/base.js");
export class Plugin {
	css = new CSSStyleSheet();
	$control = $.new();
	static requirements = [];
	constructor() {}
	_enabled = false;
	on() {
		if (
			this._enabled ||
			this.constructor.requirements.some(req=>!req())
		) return;
		if (!document.adoptedStyleSheets.includes(this.css)) {
			document.adoptedStyleSheets.push(this.css);
		}
		this._enabled = true;
	}
	off() {
		if (!this._enabled) return;
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
			(s) => s !== this.css,
		);
        this._enabled = false;
	}
}
