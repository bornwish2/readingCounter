import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth4-edit-dg',
  templateUrl: './auth4-edit-dg.component.html',
  styleUrls: ['./auth4-edit-dg.component.scss']
})
export class Auth4EditDgComponent {
  form: FormGroup;
  selected: any;
  diValue: any;
  dataTest: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth4EditDgComponent>,
  ) {
    this.diValue = data.di;
    data = data.row;

    this.dataTest = {
      id: data.id,
      title: data.title,
      authLevel3Id: data.authLevel3Id,
      value: data.value,
      cssClass: data.cssClass,
      logicalOrder: data.logicalOrder
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
