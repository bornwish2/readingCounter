import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) { }

  columnSelectedProfile = (): IObjectIteratation[] => {
    return [
      { field: 'firstName', header: 'نام', isSelected: false, readonly: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: false, readonly: true },
      { field: 'username', header: 'نام کاربری', isSelected: false, readonly: true },
      { field: 'email', header: 'ایمیل', isSelected: false, readonly: true },
      { field: 'displayName', header: 'نام نمایش', isSelected: false, readonly: true },
      { field: 'userCode', header: 'کد کاربری', isSelected: false, readonly: true }
    ];
  }
  verification = (password: IChangePassword) => {
    if (MathS.isNull(password.oldPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (MathS.isNull(password.newPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (MathS.isNull(password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (!MathS.isSameLength(password.newPassword, password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.passwords_notFetch);
      return false;
    }
    return true;
  }
  changePassword = async (password: IChangePassword) => {
    if (!this.verification(password))
      return;
    if (await this.firstConfirmDialog(EN_messages.confirm_passwordChange)) {
      return this.interfaceManagerService.POSTBODY(ENInterfaces.changePassword, password).subscribe((res: IResponses) => {
        if (res)
          this.utilsService.snackBarMessageSuccess(res.message);
      });
    }
  }
  getMyInfoDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.getMyProfile).subscribe((res: IResponses) => {
          resolve(res)
        });
      });
    } catch (e) {
      console.error(e);

    }
  }
  firstConfirmDialog = (reason: EN_messages): Promise<any> => {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: reason,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(async desc => {
        if (desc) {
          resolve(desc)
        }
      })
    })
  }
}
