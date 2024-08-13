import {treeNode} from "./treeNode.ts";
import {HTMLNodeElement} from "./HTMLNodeElement.ts";
export class Tree{
    private container: HTMLElement;
    private H:number=0;

    private d=1;
    private maxWidth=0;
    public nodeElements: Map<treeNode, HTMLElement> = new Map();
    public _root:treeNode|null=null;
    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        if (!this.container) {
            throw new Error('Container element not found');
        }

      // window.addEventListener('resize',this.drawTree.bind(this));
    }
    public render():void {
        this.calculateNodesCoordinates(this._root,null,null);
    }
    private drawTree(){
        this.calculateNodesCoordinates(this._root,null,null);

    }
    private applyNodePosition(HTMLNode: HTMLNodeElement,coordinatesTuple:[number,number]){
        HTMLNode.coordinates=coordinatesTuple;
       // console.dir(HTMLNode);
        HTMLNode.style.left = `${HTMLNode.coordinates[0]}px`; // Example dynamic position
        HTMLNode.style.top = `${HTMLNode.coordinates[1]}px`;
    }

    private processNode(node:treeNode,currLevel:number=0){

        let HTMLNode:HTMLNodeElement=new HTMLNodeElement(node);

        node.nodeLevel=currLevel;
        HTMLNode.nodeLevel=currLevel;
        //this.calculateNodesCoordinates(this._root,null,null);
      //  this.applyNodePosition(HTMLNode);

        this.container.appendChild(HTMLNode);
        this.nodeElements.set(node,HTMLNode );
    }
    private calculateNodesCoordinates(currNode:treeNode|null,parentX:number|null,direction:"right"|"left"|null){
        if(currNode===null){
            return;
        }
        currNode.coordinates[1]=3*HTMLNodeElement.nodeRadius*currNode.nodeLevel;
        if(parentX===null&&direction===null){

        currNode.coordinates[0]=HTMLNodeElement.nodeRadius+(():number=>{
            let sum:number =0;

            for(let i=0;i<this.H-currNode.nodeLevel;i++){
                sum+=Math.pow(2,i)*(2*HTMLNodeElement.nodeRadius+0.5*this.d);
            }

            return sum;
            })();
        }
        else if(direction==="left"){
            currNode.coordinates[0]=parentX-Math.pow(2,this.H-currNode.nodeLevel)*(2*HTMLNodeElement.nodeRadius+0.5*this.d);
        }
        else if(direction==="right"){
            currNode.coordinates[0]=parentX+Math.pow(2,this.H-currNode.nodeLevel)*(2*HTMLNodeElement.nodeRadius+0.5*this.d);

        }
        else{throw new Error("something went wrong while calculating nodes' coordinates....=<")}

        console.log(currNode)
        this.applyNodePosition(this.nodeElements.get(currNode)as HTMLNodeElement,currNode.coordinates);

        this.calculateNodesCoordinates(currNode.left,currNode.coordinates[0],"left");
        this.calculateNodesCoordinates(currNode.left,currNode.coordinates[0],"right");
    }
    private editContainer(){
        this.maxWidth=3*HTMLNodeElement.nodeRadius*Math.pow(2,this.H)-HTMLNodeElement.nodeRadius;
        // this.container.style.minWidth =`${3*HTMLNodeElement.nodeRadius*Math.pow(2,this.H)-HTMLNodeElement.nodeRadius}em`;
    }
    public appendTreeNode(node:treeNode,currNode:treeNode|null=this._root,currLevel:number=0):treeNode{
        // console.log(`iteration #${this.i++},newNode:${node?node.value:"null"}, currNode: ${currNode?currNode.value:"null"},root:${this._root?this._root.value:"null"}`);
        console.log(`is currNode root?${currNode===this._root}`);

        if (this._root === null) {
            this._root = node;
            this.processNode(node);
            return this._root;
        }
        if(currNode===null){
            if(this.H<currLevel){
                this.H=currLevel;
              //  this.calculateRootCoordinates();
                // this.editContainer();
            }
            this.processNode(node,currLevel);
            return node;
        }
        else if(currNode.value<=node.value){
            currNode.right= this.appendTreeNode(node,currNode.right,++currLevel);
        }
        else{
            currNode.left=this.appendTreeNode(node,currNode.left,++currLevel);
        }
        return currNode;
    }
}