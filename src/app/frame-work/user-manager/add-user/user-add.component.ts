import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { appItems, IAddAUserManager, IAddUserInfos, IRoleItems } from 'interfaces/iuser-manager';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UserAddManagerService } from 'services/user-add-manager.service';

import { UserInputsComponent } from './user-inputs/user-inputs.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: any;
  subscription: Subscription[] = [];

  personalizeInfo: IAddAUserManager;
  provinceItemsData: any;

  userAppItems: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 
  // user input component
  @ViewChild(UserInputsComponent) userInfos: any;
  userInputWrapper: IAddUserInfos;
  userDetails: IAddUserInfos = {
    userCode: null,
    username: null,
    password: null,
    confirmPassword: '',
    firstName: '',
    sureName: '',
    email: '',
    mobile: '',
    displayMobile: false,
    displayName: '',
    isActive: true,
    deviceId: ''
  }



  constructor(
    private userAddManagerService: UserAddManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
  }
  addUser = () => {
    this.userAddManagerService.userAddA(this.dataSource, this.userInputWrapper);
  }
  userInputVals = () => {
    this.userInputWrapper = this.userInfos.userInputForm;
  }
  userRolesVals = () => {
    this.roleItemsData = this.userInfos.userInputForm;
  }
  nullSavedSource = () => this.closeTabService.saveDataForForAddUsers = null;

  getUsersDataSource = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForForAddUsers) {
      this.dataSource = this.closeTabService.saveDataForForAddUsers;
      this.roleItemsData = this.dataSource.roleItems;
      this.userAppItems = this.dataSource.appItems;
      this.provinceItemsData = this.dataSource.provinceItems;
    }
    else {
      this.interfaceManagerService.GET(ENInterfaces.userADD).subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.closeTabService.saveDataForForAddUsers = res;

          this.roleItemsData = this.dataSource.roleItems;
          this.userAppItems = this.dataSource.appItems;
          this.provinceItemsData = this.dataSource.provinceItems;
        }
      })
    }

  }
  ngOnInit(): void {
    this.getUsersDataSource();

  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/mu/add')
          this.getUsersDataSource(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
    this.userInputVals();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
