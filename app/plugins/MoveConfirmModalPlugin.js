const { Plugin } = await src("/app/plugins/Plugin.js")

export class MoveConfirmModalPlugin extends Plugin {
    $taskPopup;
    x_traslate = 0;
    y_traslate = 0;
    xPosition = 0;
    yPosition = 0;
    onDrag = false;
    constructor() {
        super()
        this.css.insertRule(`#CRMActivityConfirmModal{
            overflow: hidden !important;
        }`);
        this.css.insertRule(`#CRMActivityConfirmModal > * > * {
            position: relative;
        }`);
    }
    on() {
        super.on()
        this.$taskPopup = document.querySelector("#CRMActivityConfirmModal > * > *");
        if(!this.$taskPopup) return console.log("no existe el popup de confirmacion")
        this.$taskPopup.onpointerdown = e => {
            if (!e.ctrlKey) return
            this.onDrag = true;
            this.$taskPopup.setPointerCapture(e.pointerId);
            this.x_traslate = e.clientX - this.x_traslate;
            this.y_traslate = e.clientY - this.y_traslate;
        }
        this.$taskPopup.onpointermove = e => {
            if (e.pressure === 0 || !this.onDrag) return;
            this.yPosition = e.clientY - this.y_traslate;
            this.xPosition = e.clientX - this.x_traslate;
            this.$taskPopup.style.setProperty("transform", `translate(${this.xPosition}px, ${this.yPosition}px)`)
        }
        this.$taskPopup.onpointerup = e => {
            if (this.onDrag) {
                this.x_traslate = this.xPosition;
                this.y_traslate = this.yPosition;
            }
            this.onDrag = false;
        }
    }
    off(){
        super.off()
        const {$taskPopup} = this;
        if($taskPopup){
           $taskPopup.onpointermove = $taskPopup.onpointerup = $taskPopup.onpointerdown = ()=>{} 
        }
    }
}