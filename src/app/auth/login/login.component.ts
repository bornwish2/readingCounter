import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ICredentials } from 'interfaces/iauth-guard-permission';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { infoVersion, infoVersionItems } from 'services/DI/info-version';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('closeSubItems', style({
        height: '0',
        width: '0',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('openSubItems', style({
        opacity: '1',
        maxHeight: '15rem',
        width: '19rem',
        visibility: 'visible'
      })),
      transition('closeSubItems<=>openSubItems', animate('250ms ease-in-out'))
    ])
  ]
})
export class LoginComponent {
  userData: ICredentials = { username: '', password: '' };
  showVersionInfo: boolean = false;
  infoVersionItems: IDictionaryManager[] = [];

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  convertNumbers = () => {
    this.userData.password = Converter.persianToEngNumbers(this.userData.password);
    this.userData.username = Converter.persianToEngNumbers(this.userData.username);
  }
  logging = () => {
    this.convertNumbers();
    if (this.utilsService.isNull(this.userData.password) || this.utilsService.isNull(this.userData.username)) {
      this.utilsService.snackBarMessageWarn(EN_messages.userPass_empty);
      return;
    }
    this.authService.logging(this.userData);
  }
  getVersionInfos = () => {
    this.infoVersionItems = infoVersion.getInfoItems();
  }
}
