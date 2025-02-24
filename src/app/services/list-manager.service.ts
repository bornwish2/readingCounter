import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { ENSelectedColumnVariables, IObjectIteratation } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { MathS } from '../classes/math-s';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { CloseTabService } from './close-tab.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  private readingListGUID: string;
  private readingListGUID_extra: string;
  private saveTo: number = 0;
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  private _listManagerAll: IObjectIteratation[] = [
    { field: 'billId', header: 'شناسه قبض', isSelected: false },
    { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
    { field: 'radif', header: 'ش.پرونده', isSelected: false },
    { field: 'eshterak', header: 'اشتراک', isSelected: true },
    // { field: 'zoneId', header: 'ناحیه', isSelected: false },
    { field: 'qeraatCode', header: 'قرائت', isSelected: false },
    { field: 'firstName', header: 'نام', isSelected: true },
    { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
    { field: 'karbariCode', header: 'کاربری', isSelected: true },
    { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
    { field: 'preNumber', header: 'رقم قبلی', isSelected: true },
    { field: 'counterNumber', header: 'رقم فعلی', isSelected: true },
    { field: 'preDate', header: 'تاریخ قبلی', isSelected: false },
    { field: 'offloadDateJalali', header: 'تاریخ فعلی', isSelected: true },
    { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
    { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
    { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
    { field: 'address', header: 'آدرس', isSelected: false },
    { field: 'pelak', header: 'پلاک', isSelected: false },
    { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
    { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
    { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
    { field: 'qotrCode', header: 'قطر', isSelected: false },
    // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
    { field: 'postalCode', header: 'کد پستی', isSelected: false },
    { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
    { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
    { field: 'counterInstallDate', header: 'تاریخ نصب', isSelected: false },
    { field: 'tavizDate', header: 'تاریخ تعویض', isSelected: false },
    { field: 'tavizNumber', header: 'ش تعویض', isSelected: false },
    { field: 'zarfiat', header: 'ظرفیت', isSelected: false },
    { field: 'mobile', header: 'موبایل', isSelected: false },
    { field: 'hazf', header: 'حذف', isSelected: false },
    { field: 'hasError', header: 'خطا', isSelected: false, isBoolean: true },
    { field: 'errorDescription', header: 'توضیح خطا', isSelected: false },
    { field: 'possibleAddress', header: 'آدرس پیمایش', isSelected: false },
    { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false },
    { field: 'possibleEshterak', header: 'اشتراک پیمایش', isSelected: false },
    { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false },
    { field: 'possiblePhoneNumber', header: 'تلفن پیمایش', isSelected: false },
    { field: 'possibleAhadMaskooniOrAsli', header: 'مسکونی/اصلی پیمایش', isSelected: false },
    { field: 'possibleAhadTejariOrFari', header: 'تجاری/فرعی پیمایش', isSelected: false },
    { field: 'possibleAhadSaierOrAbBaha', header: 'آحاد/سایر/آبها پیمایش', isSelected: false },
    { field: 'y', header: 'Y', isSelected: false },
    { field: 'x', header: 'X', isSelected: false },
    { field: 'gisAccuracy', header: 'دقت', isSelected: false },
    { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
    { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
    { field: 'masraf', header: 'مصرف', isSelected: false },
    // { field: 'eslahType', header: 'اصلاح', isSelected: false },
    { field: 'excludedForEslah', header: 'اصلاح', isSelected: true, isBoolean: true },
    { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
    { field: 'offLoadTime', header: 'زمان', isSelected: false },
    { field: 'dateDifference', header: 'مدت', isSelected: false },
    { field: 'description', header: 'توضیحات', isSelected: false }
  ]

  columnLMAll = (): IObjectIteratation[] => {
    return this._listManagerAll;
  }
  columnSelectedLMPerDay = (): IObjectIteratation[] => {
    return [
      { field: 'day', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'fromTime', header: 'از ساعت', isSelected: true, readonly: true },
      { field: 'toTime', header: 'تا ساعت', isSelected: true, readonly: true },
      { field: 'duration', header: 'مدت(h)', isSelected: true, readonly: true },
      { field: 'distance', header: 'مسافت', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: false, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: false, readonly: true },
      { field: 'xarabFaqedCount', header: 'تعداد فاقد/خراب', isSelected: false, readonly: true },
      { field: 'xarabFaqedPercent', header: 'درصد فاقد/خراب', isSelected: false, readonly: true }
    ];
  }
  columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'counterReaders', header: 'مامور(ها)', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
      { field: 'overalDistance', header: 'مسافت کل(m)', isSelected: true, readonly: true },
      { field: 'overalDuration', header: 'زمان کل(h)', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: true, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: true, readonly: true }
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private closeTabService: CloseTabService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) { }

  whereToSave = (): number => {
    return this.saveTo == 0 ? this.saveTo = 1 : this.saveTo = 0
  }
  nullSavedAllLMSource = () => {
    this.saveTo === 0 ? this.closeTabService.saveDataForLMAll = null : this.closeTabService.saveDataForLMAll_extra = null
  }
  getLMAll = (trackingId: string): Promise<any> | IOnOffLoadFlat[] => {
    if (this.readingListGUID === trackingId && !MathS.isNull(this.closeTabService.saveDataForLMAll))
      return this.closeTabService.saveDataForLMAll;
    if (this.readingListGUID_extra === trackingId && !MathS.isNull(this.closeTabService.saveDataForLMAll_extra))
      return this.closeTabService.saveDataForLMAll_extra;

    if (this.whereToSave() == 0) {
      this.readingListGUID = trackingId;
      return this.getLMAllFirst(trackingId);
    }
    else {
      this.readingListGUID_extra = trackingId;
      return this.getLMAllExtra(trackingId);
    }
  }
  getLMAllFirst = (trackingId: string): Promise<any> | IOnOffLoadFlat[] => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.ListOffloadedALL, trackingId).subscribe(res => {
          this.closeTabService.saveDataForLMAll = res;
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getLMAllExtra = (trackingId: string): Promise<any> | IOnOffLoadFlat[] => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.ListOffloadedALL, trackingId).subscribe(res => {
          this.closeTabService.saveDataForLMAll_extra = res;
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getLMAllZoneDictionary = () => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariDictionaryCode = () => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getKarbariDictionary = () => {
    return this.dictionaryWrapperService.getKarbariDictionary();
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  getCounterStateDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateDictionary();
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getLM = (method: ENInterfaces, trackNumber: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, trackNumber).subscribe(res => {
        resolve(res);
      })
    })
  }
  postLMPDXY = (body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.ListPerDayXY, body).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postById = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  /*OTHER */
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(MathS.getRange(item.newRate))
      if (item.gisAccuracy)
        item.gisAccuracy = MathS.getRange(item.gisAccuracy)
      if (item.x)
        item.x = MathS.getRange(item.x)
      if (item.y)
        item.y = MathS.getRange(item.y)
    })
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  showResDialog = (res: any[], disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogCheckboxComponent,
        {
          disableClose: disableClose,
          minWidth: '19rem',
          data: {
            data: res,
            title: title
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (disableClose) {
          if (result) {
            resolve(true);
          }
        }
      })
    });
  }
  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }

}
