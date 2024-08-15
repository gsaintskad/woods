export class treeNode<T > {
   // public displayValue: unknown;
    private _value: T |null=null;
    public left: treeNode<T> | null = null;
    public right: treeNode<T> | null = null;
    public nodeLevel:number = 0;
    public coordinates:[number, number]=[0,0];
    public static displayPropertyName?:any;
    constructor(value: T|null) {
        this._value = value;
    }
    get value():any {
        if(this._value&&typeof this._value==="object"){
           if("toCompare" in this._value){
             //  console.log("return this._value[\"toCompare\"]",this._value["toCompare"])
               console.log("this.value[this._value[\"toCompare\"]as string]:",this.value[this._value["toCompare"]as string])
               return this.value[this._value["toCompare"]as string];
           }
           else{throw new Error("If you want nodes to hold objects you have to choose which property will be value to be shown, and to be compared");}
        }
        else return this._value;
    }
    public getDisplayValue(){
        console.log(this._value);
        if(this._value&&typeof this._value==="object"){
            if("toDisplay" in this._value){
                //  console.log("return this._value[\"toCompare\"]",this._value["toCompare"])

                return this.value[this._value["toDisplay"]as string];
            }
            else{throw new Error("If you want nodes to hold objects you have to choose which property will be value to be shown, and to be compared");}
        }
        else if(typeof this._value==="number"){
            return this._value;
        }
        else if(typeof this._value==="string"){
            return this._value;
        }
        else if(this._value===null){return "null";}
        else throw new Error("this method available only for object nodes");
    }



}
