import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-karbari-edit-dg',
  templateUrl: './karbari-edit-dg.component.html',
  styleUrls: ['./karbari-edit-dg.component.scss']
})
export class KarbariEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService,
    private dialogRef: MatDialogRef<KarbariEditDgComponent>) {

    const editable = data.editable;
    data = data.row;
    this.selected = data.provinceId;

    this.form = fb.group({
      id: data.id,
      moshtarakinId: data.moshtarakinId,
      title: data.title,
      provinceId: editable,
      isMaskooni: data.isMaskooni,
      isSaxt: data.isSaxt,
      hasReadingVibrate: data.hasReadingVibrate
    })

  }
  save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}