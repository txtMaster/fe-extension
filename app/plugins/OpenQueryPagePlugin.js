const {Plugin} = await src("/app/plugins/Plugin.js");
export class OpenQueryPagePlugin extends Plugin{
    static requirements = [
        ()=>window.location.pathname.startsWith("/vc-cpe/app/invoice")
    ];
    constructor(){
        super();
        this.css.insertRule(`#filter-list table tbody tr td:first-child{
                background-color:red;
                scale: 0.9;
            }
        `);
    }

    on(){
        super.on()
        /**@type {HTMLElement} */
        const $tbody = document.querySelector("#filter-list table tbody")
        if(!$tbody)return console.log("TBODY no aparece")
        $tbody.onclick = (e)=>{
            console.log(e.target, e.target.parentElement.firstChild)
            if(e.target.tagName !== "TD") return;
            if(e.target.parentElement.firstChild !== e.target)return;
            const $row = this.parentElement;
        }   
    }
}