const { Plugin } = await src("/app/plugins/Plugin.js");
const { configMap } = await src("/app/configMap.js");

export class FixOpsColPlugin extends Plugin {
	constructor() {
		super();
		//poner scroll a la tabla para que no aparesca bruscamente al dar clck en el boton de operaciones
		this.css.insertRule(`#filter-list > .table-responsive{
            overflow-y: scroll !important;
        }`);
		//fijar la ultima columna de operaciones
		this.css.insertRule(`tbody tr td:last-child{
            position:sticky;
            right:0;
            z-index:3;
        }`);
	}
}
