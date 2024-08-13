export class treeNode {
    public value: number|null;
    public left: treeNode | null = null;
    public right: treeNode | null = null;
    public nodeLevel:number = 0;
    public coordinates:[number, number]=[0,0];

    constructor(value: number|null) {
        this.value = value;
    }
}
