import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportDynamic, IImportDynamicDefault, IImportDynamicRes } from 'interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { ConfirmDialogComponent } from '../frame-work/import-dynamic/confirm-dialog/confirm-dialog.component';
import { Converter } from './../classes/converter';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  importDynamicValue: IImportDynamic;

  constructor(
    private snackWrapperService: SnackWrapperService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private interfaceManagerService: InterfaceManagerService
  ) { }

  persentCheck = (val: number): boolean => {
    return this.utilsService.persentCheck(val);
  }
  persentOfalalHesab = (): boolean => {
    if (this.persentCheck(this.importDynamicValue.alalHesabPercent))
      return true;
    return false;
  }
  persentOfImage = (): boolean => {
    if (this.persentCheck(this.importDynamicValue.imagePercent))
      return true;
    return false;
  }
  validationOnNull = (val: any): boolean => {
    if (this.utilsService.isNull(val))
      return false;
    return true;
  }
  private NANValidation = (sth: string, message?: string): boolean => {
    if (this.utilsService.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }

  checkVertification = (val: IImportDynamicDefault, _isOrderByDate: boolean): boolean => {
    this.importDynamicValue = val;
    if (!this.utilsService.isSameLength(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.snackWrapperService.openSnackBar(EN_messages.sameLength_eshterak, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }

    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_from_esterak))
      return false;
    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_to_esterak))
      return false;

    if (!this.utilsService.lengthControl(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak, 5, 15)) {
      this.snackWrapperService.openSnackBar(EN_messages.format_invalid_esterak, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (!this.utilsService.isFromLowerThanToByString(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.snackWrapperService.openSnackBar(EN_messages.lessThan_eshterak, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (!this.persentOfImage()) {
      this.snackWrapperService.openSnackBar(EN_messages.percent_pictures, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (!this.persentOfalalHesab()) {
      this.snackWrapperService.openSnackBar(EN_messages.percent_pictures, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (!_isOrderByDate) {
      if (!this.validationOnNull(val.readingPeriodId)) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_reading_time, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (!this.validationOnNull(this.importDynamicValue.counterReaderId)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_reader, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  validationInvalid = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar(EN_messages.thereis_no_reader, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }
  validationReadingPeriod = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar(EN_messages.not_found_period, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }
  validationReadingConfigDefault = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar(EN_messages.thereis_no_default, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }
  validationPeriodKind = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar(EN_messages.thereis_no_type, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  validationZoneDictionary = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar(EN_messages.not_found_zoneId, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  showResDialog = (res: IImportDynamicRes) => {
    return new Promise(resolve => {
      this.dialog.open(ConfirmDialogComponent, {
        minWidth: '19rem',
        data: res
      })
    })
  }

  /*API CALLS */
  getReadingPeriod = (zoneId: number, kindId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuoteTriple(ENInterfaces.readingPeriodDictionaryByZoneIdAndKindId, zoneId, kindId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingConfigDefaults = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.readingConfigDefaultByZoneId, zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(e => e);
    }
  }
  postImportDynamicData = (importDynamic: IImportDynamicDefault): Promise<any> => {
    importDynamic.fromDate = Converter.persianToEngNumbers(importDynamic.fromDate);
    importDynamic.toDate = Converter.persianToEngNumbers(importDynamic.toDate);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.postImportData, importDynamic).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

}
