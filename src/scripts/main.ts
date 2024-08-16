import '../styles/style.css';
import '../styles/tree.css';
import typescriptLogo from '../typescript.svg';
import viteLogo from '/vite.svg';
import {HTMLNodeElement} from "./HTMLNodeElement.ts";
import {treeNode} from "./treeNode.ts";
import {Edge} from "./Edge.ts";
import {Tree} from "./tree";
import {isValidURL, isJsonUrl ,processJSONArray,DisplayableJSON} from './isJSONURL.ts';

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
<div id="appFooter">
     <div id="jsonBtn" class="footerButton" role="button">Create a json tree</div>
     <div id="numberBtn" class="footerButton" role="button">Create a number tree</div>
     <div id="stringBtn" class="footerButton" role="button">Create a string tree</div>
</div>
`
let tree:Tree<any>|null=null;

const input:HTMLInputElement=document.querySelector("#insertInput")!;
const insertBtn:HTMLButtonElement=document.querySelector("#insertBtn")!;

const clearBtn:HTMLButtonElement=document.querySelector("#clearBtn")!;


const deleteBtn:HTMLButtonElement=document.querySelector("#deleteBtn");
const treeContainer:HTMLDivElement=document.querySelector("#treeContainer");
//
const footer:HTMLDivElement=document.querySelector("#appFooter")!;

const stringBtn:HTMLButtonElement=document.querySelector("#stringBtn")!;
const numberBtn:HTMLButtonElement=document.querySelector("#numberBtn")!;
const jsonBtn:HTMLButtonElement=document.querySelector("#jsonBtn")!;

class Data{
  public data:number;
  public name:string;
  readonly toDisplay:string="name";
  readonly toCompare:string="data";
  constructor(name:string,data:number){
    this.name = name;
    this.data=data;
  }
}
// for(let i:number=1;i<1;i++){
//   // tree.appendTreeNode(String(15+Math.pow(-1*i,i)),)
//   console.log(`iteration#${i}`,tree);
//   tree.appendTreeNode(new treeNode<Data>( new Data("Num"+String(15+Math.pow(-1*i,i)),15+Math.pow(-1*i,i))));
// }

let InsertCallback:()=>any;
const createTree = <T>(insertCallback: () => void) => {
  if (tree !== null) {
    // Clear the existing tree
    tree.deleteTree();
  }

  // Create a new tree instance
  tree = new Tree<T>("treeContainer");

  // Remove any previous event listener from the insert button
  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      InsertCallback();
    }
  };
  if (InsertCallback) {
    insertBtn.removeEventListener("click", InsertCallback);
    input.removeEventListener("keydown", handleEnterKey);
  }

  // Assign the new insert callback
  InsertCallback = insertCallback;

  // Attach the new event listener for the insert button
  insertBtn.addEventListener("click", InsertCallback);

  // Function to handle "Enter" key press

  // Attach the new event listener for the "Enter" key on the input
  input.addEventListener("keydown", handleEnterKey);

  console.log(tree);
};


const stringInsertCallback=()=>{
  let enteredValue=input.value.trim();
  if (enteredValue !== ""){
    tree.appendTreeNode(new treeNode<string>(input.value.trim()));
    //footer.innerHTML+=`${input.value} `;

    tree.render();
    input.value="";
    console.log(tree);

  }

}

const numberInsertCallback = () => {
  let enteredValue = input.value.trim(); // Trim to remove any extra spaces

  if (enteredValue === "") {
    // Prevent insertion if input is empty
    throw new Error("Input cannot be empty!");

  }

  let numberValue = Number(enteredValue);

  if (isNaN(numberValue)) {
    // Handle invalid number
    throw new Error(`Your input: "${input.value}" is invalid.`);

  }

  // Now you have a valid number
  tree.appendTreeNode(new treeNode<number>(numberValue));

  input.value = ""; // Clear input after successful insertion
  tree.render();
};
const jsonInsertCallback=()=>{
  const enteredValue = input.value.split("|").map((el)=>el.trim());
  processJSONArray(enteredValue[0], enteredValue[1],enteredValue[2]).then(processedJSONarr=>{
    processedJSONarr.forEach((dJSON)=>{
        tree.appendTreeNode(new treeNode<DisplayableJSON>(dJSON));
        tree.render();
        console.log(tree);
      }
    );
    console.log(processedJSONarr);
  }).catch(console.error);
}

numberBtn.addEventListener("click", ()=>{
  createTree<number>(numberInsertCallback);

});
stringBtn.addEventListener("click", ()=>{
  createTree<string>(stringInsertCallback);

});
jsonBtn.addEventListener("click",()=>{
  createTree<DisplayableJSON>(jsonInsertCallback);
  tree.compare=(a:treeNode<DisplayableJSON>,b:treeNode<DisplayableJSON>):number=>{
    if(a.compareValue>b.compareValue){
      return -1;
    }
    else if(a.compareValue<b.compareValue){
      return 1;
    }
    else if(a.compareValue===b.compareValue) return 0;
    else throw new Error(`Unrecognized property "${a.compareValue}"`);
  }

})
createTree<number>(numberInsertCallback);
clearBtn.addEventListener("click",tree.deleteTree.bind(tree));




