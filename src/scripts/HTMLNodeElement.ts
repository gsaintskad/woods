import {treeNode} from "./treeNode.ts";
export class HTMLNodeElement<T> extends HTMLElement {
    private shadow: ShadowRoot=this.attachShadow({mode: 'open'});
    private mainDiv: HTMLDivElement=document.createElement("div");
    public valueHolder:HTMLParagraphElement=document.createElement("p");
    public nodeLevel:number = 0;
    public static nodeRadius  =30;
    public coordinates:[number,number];
    private tNode:treeNode<T>|null = null;
    constructor(node:treeNode<T>) {
        super();

        this.tNode=node;
        let style=document.createElement("style");
        // style.textContent=`@import url('src/styles/tree.css')`;
        style.textContent = `
            :host {
                display: block;
                position: absolute; /* Ensure positioning is possible */
                width: ${1.5*HTMLNodeElement.nodeRadius}px; /* Match mainDiv dimensions */
                height: ${1.5*HTMLNodeElement.nodeRadius}px; /* Match mainDiv dimensions */
                background-color: green;
                border-radius: 100%;
                text-align: center;
                margin: 0;
                padding: 0;
            }
            .mainDiv {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 0;
            }
            .valueHolder {
                font-size: ${HTMLNodeElement.nodeRadius}px;
                padding: 0;
                margin: 0;
            }
        `;
        this.shadow.appendChild(style);

        this.mainDiv.classList.add('mainDiv');
        this.valueHolder.classList.add('valueHolder');
        this.valueHolder.innerHTML=`${this.tNode!.displayValue}`;
        this.initEventHandlers();
        this.mainDiv.appendChild(this.valueHolder);


        this.shadow.appendChild(this.mainDiv);


    }
    private initEventHandlers(){
        this.mainDiv.addEventListener("pointerover", (evt:Event) => {
            console.log(`pointer over ${this.tNode!.displayValue}`,evt)
        })
    }



}