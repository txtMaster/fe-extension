globalThis.cache = {};

/**@param {string} uri */
globalThis.src = async (uri) => {
	if (!cache[uri]) cache[uri] = await import(chrome.runtime.getURL(uri));
	return cache[uri];
};

globalThis.css = new CSSStyleSheet()
document.adoptedStyleSheets.push(globalThis.css);

(async () => {
	const { FixOpsPlugin, $ } = await src("app/base.js");
	const $panel = $.define("section", "", "extension-panel");
	$panel.textContent = "hola";
    css.insertRule(`#extension-panel{
        background-color:white;
        position: fixed;
        right:0;
        opacity: 1;
        z-index:2000;
        padding:1rem;
        border-radius:20px;
    }`,0)
	document.body.insertAdjacentElement("afterbegin", $panel);


    const pluginTest = new FixOpsPlugin();
    $panel.appendChild(pluginTest.$control)
})();
