import {treeNode} from "./treeNode.ts";
import {HTMLNodeElement} from "./HTMLNodeElement.ts";
import {Edge} from "./Edge.ts";
export class Tree<T>{
    private container: HTMLElement;
    private H:number=0;

    public compare:(valA:T,valB:T)=>number;
    private d=1;
    private maxWidth=0;
    public nodeElements = new Map<treeNode<T>, HTMLElement>();
    public edgeElements =new Map<[treeNode<T>,treeNode<T>],Edge<T>>();
    public _root:treeNode<T>|null=null;
    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        if (!this.container) {
            throw new Error('Container element not found');
        }
        this.compare=<T>(valA:T,valB:T)=>{
            throw new Error(`u have not implement the compare function. Comparing is impossible.
            inputted values valA:${valA}, valB${valB}`);

        }
      // window.addEventListener('resize',this.drawTree.bind(this));
    }
    public render():void {
        this.calculateNodesCoordinates(this._root,null,null);
        this.edgeElements.forEach((value:Edge<T>)=>value.updateState());
        this.drawEdges();
    }

    private applyNodePosition(HTMLNode: HTMLNodeElement<T>,coordinatesTuple:[number,number]){
        HTMLNode.coordinates=coordinatesTuple;
       // console.dir(HTMLNode);
        HTMLNode.style.left = `${HTMLNode.coordinates[0]}px`; // Example dynamic position
        HTMLNode.style.top = `${HTMLNode.coordinates[1]}px`;
    }

    private processNode(node:treeNode<T>,currLevel:number=0){

        let HTMLNode:HTMLNodeElement<T>=new HTMLNodeElement(node);

        node.nodeLevel=currLevel;
        HTMLNode.nodeLevel=currLevel;
        //this.calculateNodesCoordinates(this._root,null,null);
      //  this.applyNodePosition(HTMLNode);

        this.container.appendChild(HTMLNode);
        this.nodeElements.set(node,HTMLNode );
    }
    public deleteTree(){
        this._root=null;
        this.H=0;
        this.edgeElements.clear();
        this.nodeElements.clear();
        this.container.innerHTML="";
    }
    private calculateNodesCoordinates(currNode: treeNode<T> | null, parentX: number | null, direction: "right" | "left" | null) {
        // console.log("root is",this._root,"\n-----------------------");
        if (currNode === null) {

            return;
        }

       // console.log("currNode is :",currNode);
        // Calculate vertical position based on node level
        currNode.coordinates[1] = 3 * HTMLNodeElement.nodeRadius * currNode.nodeLevel;

        // Calculate horizontal position based on direction and depth
        if (parentX === null && direction === null) {
            // Root node calculation
            currNode.coordinates[0] = HTMLNodeElement.nodeRadius + (() => {
                let sum: number = 0;
                for (let i = 0; i < this.H - currNode.nodeLevel; i++) {
                    sum += Math.pow(2, i) * (2 * HTMLNodeElement.nodeRadius + 0.5 * this.d);
                }
                return sum;
            })();
        } else if (direction === "left") {
            currNode.coordinates[0] = parentX - Math.pow(2, this.H - currNode.nodeLevel) * (2 * HTMLNodeElement.nodeRadius + 0.5 * this.d);
        } else if (direction === "right") {
            currNode.coordinates[0] = parentX + Math.pow(2, this.H - currNode.nodeLevel) * (2 * HTMLNodeElement.nodeRadius + 0.5 * this.d);
        } else {
            throw new Error("Invalid direction parameter");
        }

        // Apply position to the node
      //  console.log(`Node Value: ${currNode.value}, Coordinates: ${currNode.coordinates}`);
        this.applyNodePosition(this.nodeElements.get(currNode) as HTMLNodeElement<T>, currNode.coordinates);

        // Recursively calculate positions for children
        this.calculateNodesCoordinates(currNode.left, currNode.coordinates[0], "left");
        this.calculateNodesCoordinates(currNode.right, currNode.coordinates[0], "right");
    }
    private editContainer(){
        this.maxWidth=3*HTMLNodeElement.nodeRadius*Math.pow(2,this.H)-HTMLNodeElement.nodeRadius;
        // this.container.style.minWidth =`${3*HTMLNodeElement.nodeRadius*Math.pow(2,this.H)-HTMLNodeElement.nodeRadius}em`;
    }
    private drawEdges(currNode:treeNode<T>|null=this._root){
        if(currNode === null) {
            return;
        }
        if(currNode.left!==null){
            const edge:Edge<T>=new Edge<T>(currNode,currNode.left);
            this.edgeElements.set([currNode,currNode.left],edge);
            this.container.appendChild(edge);
        }
        if(currNode.right!==null){
            const edge:Edge<T>=new Edge(currNode,currNode.right);
            this.edgeElements.set([currNode,currNode.right],edge);
            this.container.appendChild(edge);
        }
        this.drawEdges(currNode.left);
        this.drawEdges(currNode.right);
    }
    public appendTreeNode(newNodeVal:T,currNode:treeNode<T>|null=this._root,currLevel:number=0):treeNode<T>{
        // console.log(`iteration #${this.i++},newNode:${node?node.value:"null"}, currNode: ${currNode?currNode.value:"null"},root:${this._root?this._root.value:"null"}`);
     //   console.log(`is currNode root?${currNode===this._root}`);

        if (this._root === null) {

            this._root = new treeNode<T>(newNodeVal);
            this.processNode(this._root);
            return this._root;
        }
        if(currNode===null){


                if(currLevel > 4){
                    throw new Error("Invalid node level. Maximum that is possible is 4");
                }
                if (this.H < currLevel) {
                    this.H = currLevel;
                    //  this.calculateRootCoordinates();
                    // this.editContainer();
                }
                const node=new treeNode<T>(newNodeVal);
                this.processNode(node, currLevel);
                return node;


        }
        else if(this.compare(currNode.value,newNodeVal)>=0){
            currNode.right= this.appendTreeNode(newNodeVal,currNode.right,++currLevel);
        }
        else if(this.compare(currNode.value,newNodeVal)===-1){
            currNode.left=this.appendTreeNode(newNodeVal,currNode.left,++currLevel);
        }
        else throw new Error("Comparing issue, while appending new treeNode into the tree");
        return currNode;
    }
}