import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { IFragmentDetails, IFragmentMaster } from '../Interfaces/ireads-manager';

@Injectable({
  providedIn: 'root'
})
export class FragmentManagerService {
  fragmentMaster: IFragmentMaster;
  fragmentDetails: IFragmentDetails;

  zoneDictionary: IDictionaryManager[] = [];

  columnSelectedFragmentMaster = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true },
      { field: 'routeTitle', header: 'مسیر', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: false, ltr: true },
      { field: 'isValidated', header: 'تایید شده', isSelected: true, readonly: true, isBoolean: true },
    ];
  }
  columnSelectedFragmentDetails = (): IObjectIteratation[] => {
    return [
      { field: 'routeTitle', header: 'مسیر', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: false, ltr: true },
      { field: 'orderDigit', header: 'ترتیب', isSelected: true, readonly: true },
      { field: 'orderPersian', header: 'فارسی', isSelected: true, readonly: true, isBoolean: true }
    ];
  }
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) { }

  /* Master */
  getDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.fragmentMASTERALL).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  addFragmentMaster = (body: IFragmentMaster): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentMASTERADD, body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(res);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  editFragmentMaster = (body: IFragmentMaster) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentMASTEREDIT, body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  removeFragmentMaster = (body: IFragmentMaster): Promise<boolean> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentMASTERREMOVE, body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(true);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  isValidateMaster = (body: IFragmentMaster): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentMASTERVALIDATE, body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(res);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  /* Details */
  getFragmentDetails = (masterId: string): Promise<any> => {
    if (masterId.length < 6) {
      this.routeToFragmentMaster();
      return;
    }
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.fragmentDETAILSDETAILS, masterId).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  addFragmentDetails = (body: IFragmentDetails): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentDETAILSADD, body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(res);
          }
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  editFragmentDetails = (body: IFragmentDetails) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentDETAILSEDIT, body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  removeFragmentDetails = (body: IFragmentDetails): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentDETAILSREMOVE, body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message)
            resolve(true);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getRouteParams = () => {
    return this.utilsService.getRouteBySplit('/');
  }
  routeToFragmentDetails = (route: string) => {
    this.utilsService.routeToByParams('/wr/m/r/nob/', route);
  }
  routeToFragmentMaster = () => {
    this.utilsService.routeTo('/wr/m/r/nob');
  }
  /**/
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }

  /* VALIDATION */
  private nullValidation = (sth: string | number, message?: string): boolean => {
    if (MathS.isNull(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  private NANValidation = (sth: string, message?: string): boolean => {
    if (MathS.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }

  /* VERIFICATION */

  firstConfirmDialog = (): Promise<any> => {
    const title = EN_messages.confirm_remove;
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }
  private masterValidation = (): boolean => {
    if (!this.nullValidation(this.fragmentMaster.zoneId, EN_messages.insert_zone))
      return false;
    if (!this.nullValidation(this.fragmentMaster.fromEshterak, 'از اشتراک را وارد نمایید'))
      return false;
    if (!this.nullValidation(this.fragmentMaster.toEshterak, 'تا اشتراک را وارد نمایید'))
      return false;
    if (!this.nullValidation(this.fragmentMaster.routeTitle, 'عنوان مسیر را وارد نمایید'))
      return false;

    if (!this.NANValidation(this.fragmentMaster.fromEshterak, 'فرمت از اشتراک ناصحیح است'))
      return false;
    if (!this.NANValidation(this.fragmentMaster.fromEshterak, 'فرمت  تا اشتراک ناصحیح است'))
      return false;

    if (!MathS.isSameLength(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!MathS.isFromLowerThanToByString(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!MathS.lengthControl(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    return true;
  }
  ValidationMasterNoMessage = (fragmentMaster: IFragmentMaster): boolean => {
    if (!this.nullValidation(fragmentMaster.zoneId))
      return false;
    if (!this.nullValidation(fragmentMaster.fromEshterak))
      return false;
    if (!this.nullValidation(fragmentMaster.toEshterak))
      return false;
    if (!this.nullValidation(fragmentMaster.routeTitle))
      return false;

    if (!this.NANValidation(fragmentMaster.fromEshterak))
      return false;
    if (!this.NANValidation(fragmentMaster.fromEshterak))
      return false;

    if (!MathS.isSameLength(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!MathS.isFromLowerThanToByString(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!MathS.lengthControl(fragmentMaster.fromEshterak, fragmentMaster.toEshterak, 5, 15)) {
      return false;
    }
    return true;
  }
  private detailsValidation = (): boolean => {
    if (!this.nullValidation(this.fragmentDetails.fragmentMasterId, EN_messages.call_supportGroup))
      return false;
    if (!this.nullValidation(this.fragmentDetails.fromEshterak, EN_messages.insert_fromEshterak))
      return false;
    if (!this.nullValidation(this.fragmentDetails.toEshterak, EN_messages.insert_ToEshterak))
      return false;
    if (!this.nullValidation(this.fragmentDetails.routeTitle, EN_messages.insert_title_route))
      return false;

    if (!this.NANValidation(this.fragmentDetails.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;

    if (!this.NANValidation(this.fragmentDetails.toEshterak, EN_messages.format_invalid_to_eshterak))
      return false;
    if (!MathS.isFromLowerThanToByString(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!MathS.isSameLength(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!MathS.lengthControl(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    return true;
  }
  ValidationDetailsNoMessage = (fragmentDetails: IFragmentDetails): boolean => {
    if (!this.nullValidation(fragmentDetails.fragmentMasterId))
      return false;
    if (!this.nullValidation(fragmentDetails.fromEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.toEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.routeTitle))
      return false;

    if (!this.NANValidation(fragmentDetails.fromEshterak))
      return false;
    if (!this.NANValidation(fragmentDetails.toEshterak))
      return false;

    if (!MathS.isFromLowerThanToByString(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!MathS.isSameLength(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!MathS.lengthControl(fragmentDetails.fromEshterak, fragmentDetails.toEshterak, 5, 15))
      return false;
    return true;
  }

  verificationMaster = (fragmentMaster: IFragmentMaster): boolean => {
    this.fragmentMaster = fragmentMaster;
    return this.masterValidation();
  }
  verificationDetails = (fragmentDetails: IFragmentDetails): boolean => {
    this.fragmentDetails = fragmentDetails;
    return this.detailsValidation();
  }

  findIDFromTitleZoneDictionary = (title: number | string): number => {
    let a = null;
    this.zoneDictionary.find(item => {
      if (item.title === title)
        a = item.id
    })
    return a;
  }
  setZoneDictionary = (zoneDic: IDictionaryManager[]) => {
    if (!this.zoneDictionary)
      this.zoneDictionary = zoneDic;
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
}
