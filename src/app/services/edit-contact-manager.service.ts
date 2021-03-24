import { Injectable } from '@angular/core';

import { ENSnackBarColors, ENSnackBarTimes, IResponses } from '../Interfaces/ioverall-config';
import { IAUserEditSave, IUserEditManager } from './../Interfaces/iuser-manager';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {
  dataSource: IAUserEditSave;
  constructor(
    private snackWrapperService: SnackWrapperService,
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  private getAUserProvince = (zoneItems: any): number[] => {
    let selectedZones = [0];
    zoneItems.map(proIt => {
      proIt.regionItems.map(regionIt => {
        regionIt.zoneItems.map(zoneIt => {
          if (zoneIt.isSelected)
            selectedZones.push(zoneIt.id)
        })
      })
    })
    return selectedZones;
  }
  private getAUserRoleItems = (val: any): number[] => {
    const a: number[] = [];
    val.filter(ids => {
      if (ids.isSelected)
        a.push(ids.id);
    });
    if (this.utilsService.isNull(a))
      return [0];
    return a;
  }
  private addAUserActions = (actionItems: any): string[] => {
    let selectedActions: string[] = [];
    actionItems.map(appIt => {
      appIt.moduleItems.map(moduleIt => {
        moduleIt.controllerItems.map(ctrlIt => {
          ctrlIt.actionItems.map(actionIt => {
            if (actionIt.isSelected) {
              selectedActions.push(actionIt.value)
            }
          })
        })
      })
    })
    return selectedActions;
  }
  checkEmptyUserInfos = () => {
    if (!this.utilsService.isNullWithText(this.dataSource.firstName, 'نام را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(this.dataSource.sureName, 'نام خانوادگی را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(this.dataSource.mobile, 'شماره موبایل را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(this.dataSource.displayName, 'نام  نمایش(نمایشی) را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(this.dataSource.selectedRoles[0], 'گروه دسترسی را مشخص نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(this.dataSource.selectedActions[0], 'خدمتی را مشخص نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(this.dataSource.selectedZones[0], 'سطح دسترسی به ناحیه ای را انتخاب نمایید', ENSnackBarColors.warn))
      return false;
    return true;
  }
  vertification = () => {
    if (!this.checkEmptyUserInfos())
      return false;
    if (!this.utilsService.mobileValidation(this.dataSource.mobile))
      return false;
    if (this.dataSource.email)
      if (!this.utilsService.isEmailValid(this.dataSource.email))
        return false;
    return true;
  }
  private connectToServer = (vals: IAUserEditSave) => {
    this.dataSource = vals;
    // if (!this.vertification())
    //   return false;
    this.interfaceManagerService.postUserContactManager(vals).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fiveMili, ENSnackBarColors.success);
        this.utilsService.routeToByUrl('/wr/mu/all');
      }
    });
  }
  editAUserContact = (UUid: string, dataSource: IUserEditManager) => {
    const vals: IAUserEditSave = {
      selectedRoles: this.getAUserRoleItems(dataSource.roleItems),
      selectedZones: this.getAUserProvince(dataSource.provinceItems),
      selectedActions: this.addAUserActions(dataSource.appItems),
      id: UUid,
      firstName: dataSource.userInfo.firstName,
      sureName: dataSource.userInfo.sureName,
      email: dataSource.userInfo.email,
      mobile: dataSource.userInfo.mobile,
      displayMobile: dataSource.userInfo.displayMobile,
      displayName: dataSource.userInfo.displayName,
      deviceId: dataSource.userInfo.deviceId
    }
    this.connectToServer(vals);
  }
}