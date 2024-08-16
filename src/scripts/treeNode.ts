import {isValidURL, isJsonUrl ,processJSONArray,DisplayableJSON} from './isJSONURL.ts';
export class treeNode<T> {

    private _value: T |null=null;
    public left: treeNode<T> | null = null;
    public right: treeNode<T> | null = null;
    public nodeLevel:number = 0;
    public coordinates:[number, number]=[0,0];
    public static displayPropertyName?:any;
    constructor(value: T|null) {
        this._value = value;
    }
    get displayValue() {
        if(this._value === null) return null;
        else if(typeof this._value==="object"&& this._value !== null){
            if("displayPropertyName"in this._value){
                return this._value.displayPropertyName;
            }
            else throw new Error(`missing displayablePropertyName "${this._value}"`);
        }
        else{
            return this._value;
        }
    }
    get compareValue(){
        if(this._value === null) return null;
        else if(typeof this._value==="object"&& this._value !== null){
            if("compareProperty"in this._value){
                return this._value.compareProperty as number|string;
            }
            else throw new Error(`missing compareProperty "${this._value}"`);
        }
        else{
            return this._value;
        }
    }
    // get value():any {
    //     if(this.value&&typeof this.value==="object"){
    //        if("toCompare" in this.value){
    //          //  console.log("return this.value[\"toCompare\"]",this.value["toCompare"])
    //            console.log("this.value[this.value[\"toCompare\"]as string]:",this.value[this.value["toCompare"]as string])
    //            return this.value[this.value["toCompare"]as string];
    //        }
    //        else{throw new Error("If you want nodes to hold objects you have to choose which property will be value to be shown, and to be compared");}
    //     }
    //     else return this.value;
    // }
    // public getDisplayValue(){
    //     console.log(this.value);
    //     if(this.value&&typeof this.value==="object"){
    //         if("toDisplay" in this.value){
    //             //  console.log("return this.value[\"toCompare\"]",this.value["toCompare"])
    //
    //             return this.value[this.value["toDisplay"]as string];
    //         }
    //         else{throw new Error("If you want nodes to hold objects you have to choose which property will be value to be shown, and to be compared");}
    //     }
    //     else if(typeof this.value==="number"){
    //         return this.value;
    //     }
    //     else if(typeof this.value==="string"){
    //         return this.value;
    //     }
    //     else if(this.value===null){return "null";}
    //     else throw new Error("this method available only for object nodes");
    // }



}
