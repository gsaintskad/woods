import { treeNode } from "./treeNode.ts";
import {HTMLNodeElement} from "./HTMLNodeElement.ts";

export class Edge<T> extends HTMLElement {
  private shadow: ShadowRoot;
  private edge: HTMLDivElement;

  private nodeA:treeNode<T>;
  private nodeB:treeNode<T>;

  constructor(nodeA: treeNode<T>, nodeB: treeNode<T>) {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.edge = document.createElement("div");
    this.nodeA = nodeA;
    this.nodeB = nodeB;

    let style = document.createElement("style");
    style.id="edgeStyles";

    this.shadow.appendChild(style);
    this.updateState();
    this.shadow.appendChild(this.edge);

  }
  public updateState() {
    const dx = this.nodeB.coordinates[0] - this.nodeA.coordinates[0];
    const dy = this.nodeB.coordinates[1] - this.nodeA.coordinates[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Angle in degrees

    const style = this.shadow.querySelector("#edgeStyles");
    if (style) {
      style.textContent = `
            :host {
                display: block;
                position: absolute;
                width: ${distance}px; /* Set width based on distance */
                height: 0.25em; /* Fixed height for the edge */
                background-color: white;
                border: 1px solid black; 
                transform: rotate(${angle}deg); /* Rotate the edge to align with the line */
                transform-origin: 0 0; /* Align the rotation around the start of the edge */
                margin: 0;
                padding: 0;
                z-index: -1;
                top: ${this.nodeA.coordinates[1]+HTMLNodeElement.nodeRadius }px; /* Position vertically based on min Y */
                left: ${this.nodeA.coordinates[0]+HTMLNodeElement.nodeRadius }px; /* Position horizontally based on min X */
            }
        `;
    }
  }

}
