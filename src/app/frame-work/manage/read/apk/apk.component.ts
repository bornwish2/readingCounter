import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAPK } from 'interfaces/inon-manage';
import { ApkService } from 'services/apk.service';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent extends FactoryONE {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';
  progress: number = 0;

  uploadForm: any = {
    versionCode: null,
    versionName: '',
    description: '',
    file: File
  }

  dataSource: IAPK[] = [];
  _columns: any[] = [];

  constructor(
    private apkService: ApkService,
    private closeTabService: CloseTabService,
    private outputManagerService: OutputManagerService
  ) {
    super();
  }

  downloadAPK = async () => {
    const a = await this.apkService.getlastAPK();
    console.log(a);
    this.outputManagerService.downloadFile(a, '.apk');
  }
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = (form: NgForm, isSubscription?: boolean) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (!fileInput.files) {
      return;
    }

    if (!this.apkService.checkVertitication(fileInput.files, form.value))
      return;

    this.apkService.postTicket().subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.apkService.showSuccessMessage(event.body.message);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    })
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.closeTabService.saveDataForAPKManager = null;

    if (this.closeTabService.saveDataForAPKManager === null || !this.closeTabService.saveDataForAPKManager) {
      this.dataSource = await this.apkService.getDataSource();
      this.closeTabService.saveDataForAPKManager = this.dataSource;
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAPKManager;
    }

    this._columns = this.apkService.columnAPK();
  }

}