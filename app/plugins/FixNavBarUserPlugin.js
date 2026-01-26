const { $ } = await src("/app/base.js");
const { Plugin } = await src("/app/plugins/Plugin.js");

export class FixNavBarUserPlugin extends Plugin {
	constructor() {
		super();
		this.$control.innerHTML = /*html */ `<label>
            <input type="checkbox"> Fijar barra de usuario
        </label>
        `;
		this.css.insertRule(`header *:has(>#navbarMenuUser){
            &> [aria-labelledby="navbarMenuUser"]:hover{
                display: block;
            }
        }`);
	}
}
