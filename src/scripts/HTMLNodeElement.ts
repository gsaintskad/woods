import {treeNode} from "./treeNode.ts";
export class HTMLNodeElement extends HTMLElement {
    private shadow: ShadowRoot=this.attachShadow({mode: 'open'});
    private mainDiv: HTMLDivElement=document.createElement("div");
    public valueHolder:HTMLParagraphElement=document.createElement("p");
    public nodeLevel:number = 0;
    public static nodeRadius  =1;
    public coordinates:[number,number]
    constructor(node:treeNode) {
        super();

        let style=document.createElement("style");
        // style.textContent=`@import url('src/styles/tree.css')`;
        style.textContent = `
            :host {
                display: block;
                position: absolute; /* Ensure positioning is possible */
                width: 2em; /* Match mainDiv dimensions */
                height: 2em; /* Match mainDiv dimensions */
                background-color: rgba(0, 147, 20, 0.8);
                border-radius: 100%;
                text-align: center;
                margin: 0;
            }
            .mainDiv {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .valueHolder {
                font-size: 1em;
                padding: 0;
                margin: 0;
            }
        `;
        this.shadow.appendChild(style);

        this.mainDiv.classList.add('mainDiv');
        this.valueHolder.classList.add('valueHolder');
        this.valueHolder.innerHTML=`${node!.value}`;
        this.mainDiv.appendChild(this.valueHolder);


        this.shadow.appendChild(this.mainDiv);


    }
}