
export class treeNode extends HTMLElement {
    private shadow   =this.attachShadow({mode:'open'});
    private static _nodeCount: number = 0;
    static get nodeCount():number{
        return treeNode._nodeCount;
    }

    public value:number|null=null;
    private right:treeNode|null=null;
    private left:treeNode|null=null;



    constructor(value:number|null) {
        super();
        this.value = value;
        treeNode._nodeCount++;
        this.drawTreeNode();
        this.connectCSS(`@import url('src/styles/tree.css')`);
    }




    private connectCSS(link:string){
        let style=document.createElement("style");
        style.textContent=link;
        this.shadow.appendChild(style);
    }



    private drawTreeNode(){

        this.shadow.innerHTML=`
            <div class="mainDiv" role="button">
                <p class="valueHolder">${this.value}</p>
            </div>
        `
        const mainDiv = this.shadow.querySelector('.mainDiv')!;
        mainDiv.addEventListener('click',()=>{
            console.dir(this);
        });
    }

}
