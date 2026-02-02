const { dom } = await src("/app/base.js");
export class Plugin {
	css = new CSSStyleSheet();
	$control = dom.new();
	static requirements = [];
	constructor() {}
	_enabled = false;
	on() {
		if (
			this._enabled ||
			!this.constructor.requirements.every(req=>req())
		) return;
		this._on();
		if (!document.adoptedStyleSheets.includes(this.css)) {
			document.adoptedStyleSheets.push(this.css);
		}
		this._enabled = true;
	}
	_on(){

	}
	off() {
		if (!this._enabled) return;
		this._off();
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
			(s) => s !== this.css,
		);
        this._enabled = false;
	}
	_off(){

	}
}
