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
    <div id="insertBtn" class="interfaceButton" role="button">insert</div>
    <div id="clearBtn" class="interfaceButton" role="button">clear</div>
    <div id="saveBtn" class="interfaceButton" role="button">save</div>
    <div id="deleteBtn" class="interfaceButton" role="button">delete</div>
  </div>
  <div id="treeContainer"></div>
   <div id="appFooter"></div>
`
type T=string;

console.log();
const tree:Tree<T> =new Tree("treeContainer");

tree.compare=<T>(a:T,b:T):number=>{

    if(a<b){
      return -1;
    }
    else if(a>b){
      return 1;
    }
    else return 0;
}

const input:HTMLInputElement=document.querySelector("#insertInput")!;
const insertBtn:HTMLButtonElement=document.querySelector("#insertBtn")!;
const clearBtn:HTMLButtonElement=document.querySelector("#clearBtn")!;
const deleteBtn:HTMLButtonElement=document.querySelector("#deleteBtn");
const treeContainer:HTMLDivElement=document.querySelector("#treeContainer");

const footer:HTMLDivElement=document.querySelector("#appFooter")!;





const insertCallback=()=>{
    try{
        let  enteredValue=Number(input.value);
       // console.log(typeof enteredValue);
        if (!isNaN(enteredValue)){

            enteredValue=Number(input.value);

            if(isNaN(enteredValue)){
                throw new Error(`your input :${input.value} is invalid, beacause its ${enteredValue}`);
            }
          //@ts-ignores
          tree.appendTreeNode(enteredValue);
         // console.log(tree);
          input.value="";
          tree.render();
          footer.innerHTML+=`${enteredValue} `;
        }
        else {
          //@ts-ignores
          tree.appendTreeNode(input.value);
         // console.log(tree);
          input.value="";
          tree.render();
          footer.innerHTML+=`${input.value} `;


        }

    }
    catch(e){
        alert(`Error while inserting tree.\n\n${e}`);
    }
}


insertBtn.addEventListener("click",insertCallback);
input.addEventListener("keydown",(event )=>{
    if(event.key == "Enter"){
        insertCallback();

    }
});

clearBtn.addEventListener("click",tree.deleteTree.bind(tree));

