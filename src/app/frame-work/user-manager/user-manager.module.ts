import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProvinceItemsComponent } from './province-items/province-items.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';

@NgModule({
  declarations: [ProvinceItemsComponent],
  imports: [
    CommonModule,
    UserManagerRoutingModule
  ]
})
export class UserManagerModule { }
