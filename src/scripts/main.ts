import '../styles/style.css';
import '../styles/tree.css';
import typescriptLogo from '../typescript.svg';
import viteLogo from '/vite.svg';
import {HTMLNodeElement} from "./HTMLNodeElement.ts";
import {treeNode} from "./treeNode.ts";
import {Edge} from "./Edge.ts";
import {Tree} from "./tree";

customElements.define('tree-node', HTMLNodeElement);
customElements.define('node-edge',Edge );
const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div class="logoHolder">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    <h1>Vite + TypeScript</h1>
  </div>
  <div id="treeContainer">
        
  </div>
`
let tree:Tree =new Tree("treeContainer");



function generateFullBinaryTreeArray(height: number): number[] {
    // Calculate the total number of nodes in a full binary tree of given height
    const totalNodes: number = Math.pow(2, height + 1) - 1;
    const array: number[] = [];
    const myarray:number[]=[];

    // Populate the array with node values (e.g., sequential numbers)
    for (let i = 0; i < totalNodes; i++) {
        array.push(i + 1); // Using 1-based indexing for simplicity
    }
    const mid:number=(array.length-1)/2;
    for(let i = 0; i <= mid; i++) {
        myarray.push(array[mid+i*Math.pow(-1,i)]);
        myarray.push(array[mid+i*Math.pow(-1,i+1)]);
    }

    return myarray;
}

// Generate array for a full binary tree with height 5
const height: number = 3;
// const treeArray: number[] = generateFullBinaryTreeArray(height);
// const treeArray: number[] =[10,3,5,1,23,5,7,1,23,5,7,0,-1,-10,15,100,99,87,55,15.5,16,17,2,2.5,3,3.5,3.3,3.2,14,13,12,13.5,14.5,14.6,1000,10000,9000,200000];
const treeArray: number[]=[8,4,12,2,6,10,14,1,3,5,7,9,13,15];
// function push(){
//     tree.appendTreeNode(new treeNode())
// }

treeArray.forEach((v)=>{
    tree.appendTreeNode(new treeNode(v));
})

tree.render();
console.log(tree);
const edge=new Edge(tree._root,tree._root.right);

document.querySelector("#treeContainer").appendChild(edge);
