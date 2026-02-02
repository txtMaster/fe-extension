const { Plugin } = await src("/app/plugins/Plugin.js");
const { dom, fetchListeners } = await src("/app/base.js");
console.log(fetchListeners);

export class FastLoginPlugin extends Plugin {
	/**@type {HTMLElement}*/ $loginPopup = null;

	static requirements = [() => window.location.pathname !== "/vc-cpe/login"];

	xhrListener = (response) => {
		if (response.eventype !== "ON_BEFORE_REDIRECT") return;
		if (
			response.method === "POST" &&
			response.statusCode === 303 &&
			response.redirectUrl === "https://e-vf.softwareintegrado.com/vc-cpe/login"
		)
			this.show();
	};

	constructor() {
		super();
		this.css.insertRule(`#popuplogin{
            position: fixed;
            margin: 0 !important;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            min-height: 60vmin !important;
            max-height: fit-content;
            width: auto !important;
            max-width: 50vw;
            z-index:1000;
        }`);
		this.css.insertRule(`#popuplogin button[type="submit"]{
            background-color: oklch(.7 .1 260);
            color:white;
        }`);
	}
	_on() {
		super._on();
		if (!this.$loginPopup) this.$loginPopup = this.makePopup();
		this.hide();
		document.body.appendChild(this.$loginPopup);
		fetchListeners.add(this.xhrListener);
	}
	_off() {
		super._off();
		this.$loginPopup.remove();
		fetchListeners.remove(this.xhrListener);
	}

	show() {
		if (this.$loginPopup) this.$loginPopup.style.setProperty("display", "");
	}
	hide() {
		if (this.$loginPopup)
			this.$loginPopup.style.setProperty("display", "none", "important");
	}

	makePopup() {
		/**@type {HTMLElement}*/ const $loginPopup = dom.define(
			"div",
			"card w-100 d-flex flex-column justify-content-center p-4 mt-4",
			"popuplogin",
		);
		$loginPopup.innerHTML = /*html */ `
    <form action="#" method="POST" class="w-100 h-auto" accept-charset="utf-8">
        <div class="text-center position-relative mt-4 mb-3">
            <h1 class="text-uppercase m-0 p-0">Inicio de Sesión</h1>
        </div>
        <div class="form-group mb-1">
            <label for="user" class="font-weight-600 mb-0">
                Usuario
            </label>
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                <span class="input-group-text bg-light">
                    <i class="fa fa-user"></i>
                </span>
                </div>
                <input type="text" class="form-control form-control-sm" id="user" name="user" value="">
            </div>
        </div>
        <div class="form-group mb-1">
            <label for="password" class="font-weight-600 mb-0">
                Contraseña
            </label>

            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                <span class="input-group-text bg-light">
                    <i class="fa fa-key"></i>
                </span>
                </div>
                <input type="password" class="form-control form-control-sm" id="password" name="password" value="">
            </div>
        </div>
        <div class="form-group form-check">
        </div>
        <div class="w-100 h-auto d-flex flex-column justify-content-center">
            <button type="submit" class="btn btn-grad w-100 text-center mt-2 mb-2">
                aceptar
            </button>
            <button type="button"
            class="btn btn-grad w-100 text-center mt-2 mb-2 bg-red"
            id="closebtn">
                cerrar
            </button>
        </div>
    </form>
        `;
		/**@type {HTMLFormElement} */
		const $form = dom.find("form", $loginPopup);
		/**@type {HTMLButtonElement} */
		const $submitButton = dom.find('button[type="submit"]', $form);
		const $closeBtn = dom.find("#closebtn", $form);
		console.log($closeBtn);
		$closeBtn.onclick = () => {
			console.log("bt");
			this.hide();
		};
		$form.onsubmit = async (e) => {
			e.preventDefault();
			const { target } = e;
			$submitButton.textContent = "...";
			const response = await fetch(
				"https://e-vf.softwareintegrado.com/vc-cpe/master/login/access",
				{
					headers: {
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin",
						"x-requested-with": "XMLHttpRequest",
					},
					referrer: "https://e-vf.softwareintegrado.com/vc-cpe/login",
					body: new URLSearchParams(new FormData(target)),
					method: "POST",
					mode: "cors",
					credentials: "include",
				},
			);
			if (!response.ok) {
				$submitButton.textContent = "Aceptar";
				return;
			}
			const response2 = await fetch(
				"https://e-vf.softwareintegrado.com/vc-cpe/master/panel",
			);
			if (response2.ok) this.hide();
			$submitButton.textContent = "Aceptar";
		};
		return $loginPopup;
	}
}
