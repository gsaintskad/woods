import { treeNode } from "./treeNode.ts";
import {HTMLNodeElement} from "./HTMLNodeElement.ts";

export class Edge extends HTMLElement {
  private shadow: ShadowRoot;
  private edge: HTMLDivElement;

  constructor(nodeA: treeNode, nodeB: treeNode) {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.edge = document.createElement("div");

    const dx = nodeB.coordinates[0] - nodeA.coordinates[0];
    const dy = nodeB.coordinates[1] - nodeA.coordinates[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Angle in degrees

    let style = document.createElement("style");
    style.textContent = `
            :host {
                display: block;
                position: absolute;
                width: ${distance}px; /* Set width based on distance */
                height: 0.25em; /* Fixed height for the edge */
                background-color: white;
                border: 1px solid black; 
                transform: rotate(${angle}deg); /* Rotate the edge to align with the line */
                transform-origin: start; /* Align the rotation around the start of the edge */
                margin: 0;
                padding: 0;
                z-index: -1;
                top: ${Math.min(nodeA.coordinates[1], nodeB.coordinates[1])+2*HTMLNodeElement.nodeRadius}px; /* Position vertically based on min Y */
                left: ${Math.min(nodeA.coordinates[0], nodeB.coordinates[0])}px; /* Position horizontally based on min X */
            }
        `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(this.edge);
  }
}
