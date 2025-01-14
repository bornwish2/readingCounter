import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import {
    ENSelectedColumnVariables,
    IMasrafStates,
    IObjectIteratation,
    ISearchInOrderTo,
    ITitleValue,
} from 'interfaces/ioverall-config';
import { ENSearchs, ISearchMoshReq, ISearchProReportInput, ISearchSimpleOutput, ISearchSimpleReq } from 'interfaces/search';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { ConfirmDialogCheckboxComponent } from './../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { FollowUpService } from './follow-up.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENSearchs = ENSearchs;

  _isOrderByDate: boolean = true;

  searchReqPro: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    zoneIds: [],
    year: 1400,
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: []
  }
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]
  _years: ITitleValue[] = [];
  searchReqMosh: ISearchMoshReq = {
    zoneId: null,
    searchBy: null,
    item: '',
    similar: false
  }
  _searchSimpleReq: ISearchSimpleReq = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400
  }
  private _searchReqPro: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    zoneIds: [],
    year: 1400,
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: []
  }
  private _isValidateByDate: boolean;
  private _searchProExcel: IObjectIteratation[] = [
    { field: 'billId', header: 'شناسه قبض', isSelected: true },
    { field: 'trackNumber', header: 'شناسه قبض', isSelected: true },
    { field: 'radif', header: 'شناسه قبض', isSelected: true },
    { field: 'eshterak', header: 'شناسه قبض', isSelected: true },
  ]
  private _searchPro: IObjectIteratation[] =
    [
      { field: 'billId', header: 'شناسه قبض', isSelected: false },
      { field: 'counterReaderName', header: 'مامور', isSelected: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
      { field: 'radif', header: 'ش.پرونده', isSelected: false },
      { field: 'eshterak', header: 'اشتراک', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'qeraatCode', header: 'قرائت', isSelected: false },
      { field: 'firstName', header: 'نام', isSelected: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
      { field: 'karbariCode', header: 'کاربری', isSelected: true },
      { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
      { field: 'preNumber', header: 'رقم قبلی', isSelected: true },
      { field: 'counterNumber', header: 'رقم فعلی', isSelected: true },
      { field: 'preDate', header: 'تاریخ قبلی', isSelected: false },
      { field: 'offloadDateJalali', header: 'تاریخ فعلی', isSelected: true },
      { field: 'address', header: 'آدرس', isSelected: false },
      { field: 'pelak', header: 'پلاک', isSelected: false },
      { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
      { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
      { field: 'qotrCode', header: 'قطر', isSelected: false },
      // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: false },
      { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
      { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
      { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
      { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
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
      { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
      { field: 'masraf', header: 'مصرف', isSelected: false },
      { field: 'y', header: 'Y', isSelected: false },
      { field: 'x', header: 'X', isSelected: false },
      { field: 'gisAccuracy', header: 'دقت', isSelected: false },
      { field: 'eslahType', header: 'اصلاح', isSelected: false },
      { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
      { field: 'offLoadTime', header: 'زمان', isSelected: false },
      { field: 'dateDifference', header: 'مدت', isSelected: false },
      { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
      { field: 'description', header: 'توضیحات', isSelected: false }
    ];
  private _searchMosh: IObjectIteratation[] =
    [
      { field: 'billId', header: 'شناسه قبض', isSelected: false },
      { field: 'counterReaderName', header: 'مامور', isSelected: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
      { field: 'radif', header: 'ش.پرونده', isSelected: false },
      { field: 'eshterak', header: 'اشتراک', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'qeraatCode', header: 'قرائت', isSelected: false },
      { field: 'firstName', header: 'نام', isSelected: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
      { field: 'karbariCode', header: 'کاربری', isSelected: true },
      { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
      { field: 'preNumber', header: 'رقم قبلی', isSelected: true },
      { field: 'counterNumber', header: 'رقم فعلی', isSelected: true },
      { field: 'preDate', header: 'تاریخ قبلی', isSelected: false },
      { field: 'offloadDateJalali', header: 'تاریخ فعلی', isSelected: true },
      { field: 'address', header: 'آدرس', isSelected: false },
      { field: 'pelak', header: 'پلاک', isSelected: false },
      { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
      { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
      { field: 'qotrCode', header: 'قطر', isSelected: false },
      // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: false },
      { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
      { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
      { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
      { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
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
      { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
      { field: 'masraf', header: 'مصرف', isSelected: false },
      { field: 'y', header: 'Y', isSelected: false },
      { field: 'x', header: 'X', isSelected: false },
      { field: 'gisAccuracy', header: 'دقت', isSelected: false },
      { field: 'eslahType', header: 'اصلاح', isSelected: false },
      { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
      { field: 'offLoadTime', header: 'زمان', isSelected: false },
      { field: 'dateDifference', header: 'مدت', isSelected: false },
      { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
      { field: 'description', header: 'توضیحات', isSelected: false }
    ];
  private _searchSimple: IObjectIteratation[] = [
    // { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
    { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true },
    { field: 'trackNumber', header: 'شماره پیگیری', isSelected: true, isNumber: true },
    { field: 'itemQuantity', header: 'تعداد', isSelected: true, isNumber: true },
    { field: 'listNumber', header: 'ش لیست', isSelected: true },
    { field: 'isBazdid', header: 'بازدید', isSelected: true, isBoolean: true },
    { field: 'isRoosta', header: 'روستا', isSelected: true, isBoolean: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
    { field: 'fromDate', header: 'از', isSelected: false },
    { field: 'toDate', header: 'تا', isSelected: false },
    { field: 'overallQuantity', header: 'کل تعداد', isSelected: false, isNumber: true },
    { field: 'trackStatusTitle', header: 'وضعیت', isSelected: false }
  ]

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private followUpService: FollowUpService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  /*COLUMNS*/
  columnSearchMoshtarakin = (): IObjectIteratation[] => {
    return this._searchMosh;
  }
  columnSearchSimple = (): IObjectIteratation[] => {
    return this._searchSimple;
  }
  columnSearchPro = (): IObjectIteratation[] => {
    return this._searchPro;
  }
  columnSearchProExcel = (): IObjectIteratation[] => {
    return this._searchProExcel;
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  columnGetSearchPro = (): ISearchProReportInput => {
    return this._searchReqPro;
  }
  /*API CALLS*/
  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getCounterReportByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterReportByZoneIdDictionary(zoneId);
  }
  getCounterStateByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getByQuoteId = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, id).toPromise().then(res => {
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
  getKarbariDictionaryCode = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getKarbariDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getKarbariDictionary();
  }
  getCounterStateDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateDictionary();
  }
  doSearch = (method: ENInterfaces, body: any): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getProExcel = (method: ENInterfaces, body: any): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBLOB(method, body).toPromise().then(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  /*VALIDATION*/
  private validationNullMosh = (dataSource: ISearchMoshReq): boolean => {
    if (dataSource.hasOwnProperty('searchBy')) {
      if (MathS.isNull(dataSource.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('item')) {
      if (MathS.isNull(dataSource.item)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
        return false;
      }
    }
    return true;
  }
  private validationNullPro = (dataSource: ISearchProReportInput): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource.fromDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource.toDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    return true;
  }
  private validationByReadingPeriod = (dataSource: ISearchProReportInput): boolean => {
    if (dataSource.hasOwnProperty('readingPeriodId')) {
      if (MathS.isNull(dataSource.readingPeriodId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('year')) {
      if (MathS.isNull(dataSource.year)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    return true;
  }
  private validationSearchSimpleByPeriod = (object: ISearchSimpleReq): boolean => {
    if (MathS.isNull(object.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNull(object.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (MathS.isNull(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(object.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(object.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    return true;
  }
  private validateSearchSimpleByDate = (object: ISearchSimpleReq): boolean => {
    if (MathS.isNull(object.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(object.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    if (MathS.isNull(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    return true;
  }
  private validationNumbers = (object: ISearchMoshReq): boolean => {
    if (object.hasOwnProperty('searchBy')) {
      if (MathS.isNaN(object.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
        return false;
      }
    }
    return true;
  }
  private validationDate = (object: ISearchProReportInput): boolean => {
    if (object.fromDate.length == 10 && object.toDate.length == 10)
      return true;
    return false;
  }
  /*VERIFICATION*/
  verificationSimpleSearch = (searchReq: ISearchSimpleReq): boolean => {
    searchReq.fromDate = Converter.persianToEngNumbers(searchReq.fromDate);
    searchReq.toDate = Converter.persianToEngNumbers(searchReq.toDate);
    if (this._isOrderByDate)
      return this.validateSearchSimpleByDate(searchReq);
    return this.validationSearchSimpleByPeriod(searchReq)
  }
  verificationMosh = (searchReq: ISearchMoshReq): boolean => {
    return this.validationNullMosh(searchReq) && this.validationNumbers(searchReq)
  }
  verificationPro = (searchReq: ISearchProReportInput, isValidateByDate?: boolean): boolean => {
    searchReq.fromDate = Converter.persianToEngNumbers(searchReq.fromDate);
    searchReq.toDate = Converter.persianToEngNumbers(searchReq.toDate);
    this._searchReqPro = searchReq;
    if (isValidateByDate == true || isValidateByDate == false)
      this._isValidateByDate = isValidateByDate;

    if (this._isValidateByDate) {
      return this.validationNullPro(searchReq) && this.validationDate(searchReq);
    }
    return this.validationByReadingPeriod(searchReq);
  }
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
      item.preAverage = +MathS.getRange(item.preAverage);
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
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  getMasrafStates = () => {
    return IMasrafStates;
  }
  makeHadPicturesToBoolean = (dataSource: any) => {
    dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  receiveYear = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  receiveFromDateJalali = (variable: ENSearchs, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENSearchs, $event: string) => {
    this[variable].toDate = $event;
  }
  routeToWoui = (object: any) => {
    this.router.navigate(['wr/m/track/woui', false, object.id]);
  }
  routeToLMAll = (row: ISearchSimpleOutput) => {
    this.router.navigate(['wr/m/l/all', false, row.trackingId]);
  }
  routeToLMPayDay = (row: ISearchSimpleOutput) => {
    this.utilsService.routeToByParams('wr/m/l/pd', row.trackNumber);
  }
  routeToFollowUp = (row: ISearchSimpleOutput) => {
    this.followUpService.setTrackNumber(row.trackNumber);
    this.utilsService.routeToByUrl('/wr/m/s/fwu');
  }
  showInMap = (dataSource: object) => {
    this.utilsService.routeToByParams('/wr', { trackNumber: dataSource['trackNumber'], day: dataSource['insertDateJalali'], distance: dataSource['overalDistance'] });
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