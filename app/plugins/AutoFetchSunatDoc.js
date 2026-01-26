const { Plugin } = await src("/app/plugins/AutoFetchSunatDoc.js");
export class AutoFetchSunatDoc extends Plugin {
	constructor() {
		super();
	}

	verifyDoc(ruc,tipo,serie,numero,fechaDeEmision,total) {
		const body = new URLSearchParams({
			accion: "CapturaCriterioValidez",
			token: "", // actualiza si es dinámico
			num_ruc: ruc,
			tipocomprobante: tipo,
			cod_docide: "-",
			num_docide: "",
			num_serie: serie,
			num_comprob: numero,
			fec_emision: fechaDeEmision,
			cantidad: total,
		});

		fetch(
			"https://e-consulta.sunat.gob.pe/ol-ti-itconsvalicpe/ConsValiCpe.htm",
			{
				headers: {
					accept:
						"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
					"accept-language": "es-419,es;q=0.5",
					"cache-control": "max-age=0",
					"content-type": "application/x-www-form-urlencoded",
				},
				referrer:
					"https://e-consulta.sunat.gob.pe/ol-ti-itconsvalicpe/ConsValiCpe.htm",
				body: body.toString(),
				method: "POST",
				mode: "cors",
				credentials: "include",
			},
		);
	}
}
