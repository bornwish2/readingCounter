import { Injectable } from '@angular/core';

import { IAddUserManager } from './../Interfaces/iuser-manager';

@Injectable({
  providedIn: 'root'
})
export class AddUserManagerService {
  dataSource: any;

  constructor() { }

  // addUserManagerConfig = () => {
  //   this.interfaceManagerService.getAddUserContactManager().subscribe((res: any) => {
  //     if (res) {
  //       return res;
  //     }
  //   })
  // }
  private getAUserProvince = (): number[] => {
    return this.dataSource.provinceItems.map(ids => {
      return ids.id
    });
  }
  private getAUserRoleItems = (): number[] => {
    return this.dataSource.roleItems.map(ids => {
      return ids.id
    });
  }
  getSelectedActions = (): string[] => {
    const selectedActions: string[] = [];
    this.dataSource.appItems.map(vals1 => {
      vals1.moduleItems.map(vals2 => {
        vals2.controllerItems.map(vals3 => {
          vals3.actionItems.map(vals4 => {
            if (vals4.isSelected === true)
              selectedActions.push(vals4.value);
            if (vals4.isSelected === false)
              vals4.value = ''
          })
        })
      })
    })
    return selectedActions;
  }
  addAContact = (dataSource: IAddUserManager) => {
    this.dataSource = dataSource;
    const vals = {
      selectedRoles: this.getAUserRoleItems(),
      selectedZones: this.getAUserProvince(),
      selectedActions: this.getSelectedActions(),
      // deviceId: aUserInfo.deviceId,
      // displayName: aUserInfo.displayName,
      // email: aUserInfo.email,
      // firstName: aUserInfo.firstName,
      // mobile: aUserInfo.mobile,
      // displayMobile: aUserInfo.displayMobile,
      // sureName: aUserInfo.sureName,
      // userCode: aUserInfo.userCode,
      // isActive: aUserInfo.isActive
    }
    console.log(vals);
  }
}
