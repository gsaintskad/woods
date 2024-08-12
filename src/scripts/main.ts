import '../styles/style.css';
import '../styles/tree.css';
import typescriptLogo from '../typescript.svg';
import viteLogo from '/vite.svg';
import {treeNode} from "./treeNode.ts";

customElements.define('tree-node', treeNode);
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="logoHolder">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    <h1>Vite + TypeScript</h1>
  </div>
`
let tNode:treeNode=new treeNode(5);



document.querySelector<HTMLDivElement>('#app')!.appendChild(tNode);


