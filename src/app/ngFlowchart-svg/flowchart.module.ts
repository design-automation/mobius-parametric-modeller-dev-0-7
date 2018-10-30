import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material';

import { FlowchartComponent } from './flowchart.component';
import { NodeComponent } from './node/node.component';
import { EdgeComponent } from './edge/edge.component';


@NgModule({
  declarations: [
    FlowchartComponent, 
    NodeComponent, 
    EdgeComponent,
  ],
  exports: [ FlowchartComponent ],
  imports: [ CommonModule,
             FormsModule, 
             MatIconModule ],
  entryComponents: [ ],
  providers: [ ]
})
export class SVGFlowchartModule {
    constructor () { }
}
