import { Injectable } from '@angular/core';

import { appItems, IAUserEditSave, IRoleItems, IUserEditManager, IUserInfo } from '../Interfaces/iuser-manager';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {
  editContactData: appItems[] = [];
  roleItems: IRoleItems[] = [];
  allUserData: IUserEditManager;
  provinceItemsData: any; //for now is any instead of interface

  constructor() { }

  // gather data for edit ///////////////
  getSelectedActions = (): string[] => {
    const selectedActions: string[] = [];
    this.editContactData.map(vals1 => {
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
  getSelectedRoles = (): number[] => {
    this.roleItems = this.allUserData.roleItems;
    return this.roleItems.map(ids => {
      return ids.id
    })
  }
  getSelectedZones = (): number[] => {
    // can this done without map or less map?
    let a: number[];
    this.allUserData.provinceItems.map(regionIt => {
      regionIt.regionItems.map(zoneIt => {
        zoneIt.zoneItems.map(val => {
          a.push(val.id)
        })
      })
    })
    console.log(a);
    return [0];
  }
  getUserInfos = (): IUserInfo => {
    return this.allUserData.userInfo;
  }
  editAUserContact = (editContactData: appItems[], allUserData: IUserEditManager): Promise<IAUserEditSave> => {
    this.editContactData = editContactData;
    this.allUserData = allUserData;
    this.provinceItemsData = this.allUserData.provinceItems;
    return new Promise((resolve) => {
      const userInfo = this.getUserInfos();
      const vals = {
        selectedRoles: this.getSelectedRoles(),
        selectedZones: this.getSelectedZones(),
        selectedActions: this.getSelectedActions(),
        id: userInfo.id,
        deviceId: userInfo.deviceId,
        displayName: userInfo.displayName,
        email: userInfo.email,
        firstName: userInfo.firstName,
        mobile: userInfo.mobile,
        displayMobile: userInfo.displayMobile,
        sureName: userInfo.sureName
      }
      resolve(vals)
    });
  }

  // ///////////

}
