export class treeNode<T > {
    public displayValue: unknown;
    public value: T |null=null;
    public left: treeNode<T> | null = null;
    public right: treeNode<T> | null = null;
    public nodeLevel:number = 0;
    public coordinates:[number, number]=[0,0];

    constructor(element: T|null, displayProp?:keyof T) {

        if(element&&typeof element==="object"){
            if(displayProp){
                if(displayProp in element ){
                    this.value = element;
                    this.displayValue=element[displayProp];
                }
                else{
                    throw new Error("The inputted property to display(displayProp) is absent in the element");
                }
            }
            else{throw new Error("If you want nodes to hold objects you have to choose which property will be value to be shown, and to be compared")}
        }
        else if(element&&typeof element==="string"){
            this.value = element;
            this.displayValue = element;
        }
        else if(!isNaN(element as number)&&typeof element==="number"){
            this.value=element
            this.displayValue = element;
        }
        else{
            throw new Error("unknown type error");
        }


    }

}
