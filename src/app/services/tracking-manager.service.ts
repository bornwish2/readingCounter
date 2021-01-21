import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IEditTracking, ITracking } from './../Interfaces/imanage';
import { IResponses } from './../Interfaces/iresponses';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  columnSelectedMenuDefault = () => {
    return [
      { field: 'trackNumber', header: 'شماره پیگیری', isSelected: true },
      { field: 'listNumber', header: 'شماره لیست', isSelected: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'zoneTitle', header: 'عنوان ناحیه', isSelected: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false },
      { field: 'year', header: 'سال', isSelected: false },
      { field: 'isRoosta', header: 'روستایی', isSelected: false },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true },
      { field: 'fromDate', header: 'از تاریخ', isSelected: false },
      { field: 'toDate', header: 'تا تاریخ', isSelected: false },
      { field: 'itemQuantity', header: 'تعداد', isSelected: true },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
      { field: 'hasPreNumber', header: 'شماره پیشین', isSelected: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: false },
      { field: 'displayRadif', header: 'ردیف', isSelected: false },
      { field: 'counterReaderName', header: 'مامور قرائت پیشین', isSelected: false }
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  getImportedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackImported();
  }
  getLoadedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackLoaded();
  }
  getReadingDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackReading();
  }
  getOffloadedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackOffloaded();
  }
  getFinishedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackFinished();
  }
  getFollowUpSource = (trackNumber: string): Observable<any> => {
    return this.interfaceManagerService.getTrackFollowUp(trackNumber);
  }
  postEditingTrack = (rowData: ITracking): Observable<any> => {
    return this.interfaceManagerService.postTrackingEdit(this.selectSpecialParameters(rowData));
  }
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  migrateDataRowToImported = (trackingId: string) => {
    this.interfaceManagerService.toImported({ trackingId }).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message);
    });
  }
  migrateDataRowToReading = (trackingId: string) => {
    this.interfaceManagerService.toReading({ trackingId }).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message);
    });
  }
  migrateDataRowToOffloaded = (trackingId: string) => {
    this.interfaceManagerService.toOffloaded({ trackingId }).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message);
    });
  }
  // follow up

  // imported service control
  private selectSpecialParameters = (rowData: ITracking): IEditTracking => {
    const a: IEditTracking = {
      id: rowData.id,
      alalHesabPercent: rowData.alalHesabPercent,
      imagePercent: rowData.imagePercent,
      hasPreNumber: rowData.hasPreNumber,
      displayBillId: rowData.displayBillId,
      displayRadif: rowData.displayRadif,
      counterReaderId: rowData.counterReaderId
    }
    return a;
  }
  // 

}
