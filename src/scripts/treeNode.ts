import '../styles/tree.css';
export class treeNode extends HTMLElement {
    private shadow   =this.attachShadow({mode:'open'});
    private static _nodeCount: number = 0;
    static get nodeCount():number{
        return treeNode._nodeCount;
    }

    public value:number|null=null;
    public right:treeNode|null=null;
    public left:treeNode|null=null;


    constructor(value:number|null) {
        super();
        this.value = value;
        treeNode._nodeCount++;
        this.drawTreeNode();
    }

    public get getShadow():ShadowRoot{
        return this.shadow;
    }

    private drawTreeNode(){

        this.shadow.innerHTML=`
            <div class="mainDiv">
            <p class="valueHolder">${this.value}</p>
</div>
        `
    }
}
