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
    <input id="insertInput" placeholder="number"/>
    <div id="insertBtn" role="button">insert</div>
  </div>
  <div id="treeContainer">
        
  </div>
`
let tree:Tree =new Tree("treeContainer");


const input:HTMLInputElement=document.querySelector("#insertInput")!;
const insertBtn:HTMLButtonElement=document.querySelector("#insertBtn")!;

const callback=()=>{
    tree.appendTreeNode(new treeNode(Number(input.value)));
    input.value="";
    tree.render();
}
insertBtn.addEventListener("click",callback);
input.addEventListener("keydown",(event )=>{
    if(event.key == "Enter"){
        callback();

    }
})