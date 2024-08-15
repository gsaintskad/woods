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

// class Data{
//   public data:number;
//   public name:string;
//   readonly toDisplay:string="name";
//   readonly toCompare:string="data";
//   constructor(name:string,data:number){
//     this.name = name;
//     this.data=data;
//   }
// }
// // treeNode.displayPropertyName="data";
// // // type ks=keyof number;
// const tree:Tree<Data> =new Tree("treeContainer");
//
// // tree.compare=(a: treeNode<Data>,b:treeNode<Data>)=>{
//   if(a.value >b.value){
//     return -1;
//   }
//   else  if(a.value <b.value){
//     return 1;
//   }
//   else return 0;
// }
// let i=1;
// let s=new Data("Num"+String(15+Math.pow(-1*i,i)),15+Math.pow(-1*i,i))
// let t:keyof Data="data";
// console.log("data" in s);

// for(let i:number=1;i<1;i++){
//   // tree.appendTreeNode(String(15+Math.pow(-1*i,i)),)
//   console.log(`iteration#${i}`,tree);
//   tree.appendTreeNode(new treeNode<Data>( new Data("Num"+String(15+Math.pow(-1*i,i)),15+Math.pow(-1*i,i))));
// }
const tree:Tree<string> =new Tree("treeContainer");

const compare=<T>(a:T,b:T):number=>{

  if(a >b){
    return 1;
  }
  else  if(a <b){
    return -1;
  }
  else return 0;
}

tree.compare=compare<string>;
//
const input:HTMLInputElement=document.querySelector("#insertInput")!;
const insertBtn:HTMLButtonElement=document.querySelector("#insertBtn")!;
const clearBtn:HTMLButtonElement=document.querySelector("#clearBtn")!;
const deleteBtn:HTMLButtonElement=document.querySelector("#deleteBtn");
const treeContainer:HTMLDivElement=document.querySelector("#treeContainer");
//
const footer:HTMLDivElement=document.querySelector("#appFooter")!;

const stringInsertCallback=()=>{
  tree.appendTreeNode(input.value);
  footer.innerHTML+=`${input.value} `;

  input.value="";
  tree.render();
}
//
// const numberInsertCallback= ()=>{
//     try{
//
//       let enteredValue=Number(input.value);
//       // console.log(typeof enteredValue);
//       if (!isNaN(enteredValue)){
//
//         enteredValue=Number(input.value);
//
//       }
//
//       else {
//         throw new Error(`your input :${input.value} is invalid, beacause its ${enteredValue}`);
//       }
//
//       tree.appendTreeNode(enteredValue);
//
//       input.value="";
//       tree.render();
//       footer.innerHTML+=`${enteredValue} `;
//
//     }
//     catch(e){
//       alert(`Error while inserting tree.\n\n${e}`);
//     }
//   }

const insertCallback=stringInsertCallback;


insertBtn.addEventListener("click",insertCallback);
input.addEventListener("keydown",(event )=>{
    if(event.key == "Enter"){
        insertCallback();

    }
});

clearBtn.addEventListener("click",tree.deleteTree.bind(tree));
