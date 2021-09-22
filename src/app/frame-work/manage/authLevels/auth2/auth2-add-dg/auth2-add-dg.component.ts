import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { SectionsService } from 'services/sections.service';

@Component({
  selector: 'app-auth2-add-dg',
  templateUrl: './auth2-add-dg.component.html',
  styleUrls: ['./auth2-add-dg.component.scss']
})
export class Auth2AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth2AddDgComponent>,
    private sectionsService: SectionsService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) {
    data = data.di;
    this.form = fb.group({
      title: ['', Validators.required],
      authLevel1Id: data.authLevel1Id,
      cssClass: [''],
      logicalOrder: [''],
      route: [''],
      inSidebar: [false]
    })
  }
  save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    this.dictionaryWrapperService.cleanSingleDictionary('authLev2Dictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
