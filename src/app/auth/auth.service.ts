import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IAuthTokenType, IAuthUser, ICredentials } from 'interfaces/iauth-guard-permission';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';
import { CloseTabService } from 'services/close-tab.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { MainService } from 'services/main.service';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private mainService: MainService,
    private jwtService: JwtService,
    private utilsService: UtilsService,
    private closeTabService: CloseTabService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }
  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() })
  }
  logging = (userData: ICredentials) => {
    const returnUrl = this.utilsService.getRouteParams('returnUrl');
    this.mainService.POSTBODY('v1/account/login', userData).subscribe((res: IAuthTokenType) => {
      this.saveTolStorage(res);
      this.routeToReturnUrl(returnUrl);
    })
  }
  private clearAllSavedData = () => this.closeTabService.cleanAllData();
  private clearDictionaries = () => this.dictionaryWrapperService.cleanDictionaries();
  logout = () => {
    const refreshToken = this.jwtService.getRefreshToken();
    this.clearAllSavedData();
    this.clearDictionaries();
    this.mainService.POSTBODY('V1/Account/Logout', { refreshToken }).subscribe(() => {
      this.jwtService.removeAuthLocalStorage();
      this.utilsService.routeTo('/login');
    })
  }
  saveTolStorage = (token: IAuthTokenType) => {
    this.jwtService.saveToLocalStorage(token.access_token);
    this.jwtService.saveToLocalStorageRefresh(token.refresh_token);
  }
  private routeToReturnUrl = (returnUrl: string) => {
    if (!MathS.isNull(returnUrl))
      this.utilsService.routeTo(returnUrl);
    else
      this.utilsService.routeTo('/wr');
  }
  isAuthUserLoggedIn(): boolean {
    return (this.jwtService.hasStoredAccessAndRefreshTokens() &&
      !this.jwtService.isAccessTokenTokenExpired());
  }
  getAuthUser(): IAuthUser | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }

    const decodedToken = this.jwtService.getDecodedAccessToken();
    const roles = this.jwtService.getDecodedTokenRoles();
    return Object.freeze({
      userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      displayName: decodedToken["DisplayName"],
      roles: roles
    });
  }
  noAccessMessage = (errorMessage?: string) => {
    if (MathS.isNull(errorMessage))
      this.utilsService.snackBarMessageWarn(EN_messages.access_denied);
    else
      this.utilsService.snackBarMessageWarn(errorMessage);
  }
  goOutInMessage = () => {
    this.utilsService.snackBarMessage(EN_messages.accedd_denied_relogin, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
  }

}
