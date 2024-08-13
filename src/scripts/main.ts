import '../styles/style.css';
import '../styles/tree.css';
import typescriptLogo from '../typescript.svg';
import viteLogo from '/vite.svg';
import {HTMLNodeElement} from "./HTMLNodeElement.ts";
import {treeNode} from "./treeNode.ts";
import {Tree} from "./tree";

customElements.define('tree-node', HTMLNodeElement);
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

for(let i=1;i<=5;i++){
    tree.appendTreeNode(new treeNode(i));
}


tree.render();
console.log(tree);
