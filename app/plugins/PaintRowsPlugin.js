const {Plugin} = await src("/app/plugins/Plugin.js");
export class PaintRowsPlugin extends Plugin{
    constructor(){
        super();
        this.css.insertRule(`tbody tr{
            &:has( > td:nth-last-child(2) .badge-success),
            &:has( > td:nth-last-child(2) .success) {
                background-color:oklch(.93 .035 150);
                &:hover{
                    background-color:oklch(.96 .037 150);
                }
            }
        }`);
    }
}