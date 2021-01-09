import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule
  ]
})
export class SharedPrimeNgModule {
  static forRoot(): ModuleWithProviders<SharedPrimeNgModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedPrimeNgModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}