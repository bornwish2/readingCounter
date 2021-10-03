import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { SectionsService } from 'services/sections.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-province-add-dg',
  templateUrl: './province-add-dg.component.html',
  styleUrls: ['./province-add-dg.component.scss']
})
export class ProvinceAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<ProvinceAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private sectorsManagerService: SectorsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: '',
      countryId: data.countryId,
      logicalOrder: ['']
    })
  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ProvinceADD, this.form.value))
      return;

    this.dictionaryWrapperService.cleanSingleDictionary('provinceDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}