import { loadAgentDataRoutes } from './load-agent-data.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadAgentDataComponent } from './load-agent-data.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    LoadAgentDataComponent,
    FilterPipe,

  ],
  imports: [
    RouterModule.forChild(loadAgentDataRoutes),
    CommonModule,
    SharedModule,
  ]
})
export class LoadAgentDataModule { }
