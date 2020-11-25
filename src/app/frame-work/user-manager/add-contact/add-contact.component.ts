import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { appItems, IAddAUserManager, IAddUserInfos, IRoleItems } from './../../../Interfaces/iuser-manager';
import { AddUserManagerService } from './../../../services/add-user-manager.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, AfterViewInit {
  userDetails: IAddUserInfos = {
    userCode: 0,
    username: '',
    password: '',
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
  personalizeInfo: IAddAUserManager;
  provinceItemsData: any;
  dataSource: any;

  // stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  // 

  addContactData: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private addUserManagerService: AddUserManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private interactionService: InteractionService,
    private router: Router
  ) {
  }
  addAContact = () => {
    this.addUserManagerService.addAContact(this.dataSource);
  }
  getContactSource = () => {
    this.interfaceManagerService.getAddUserContactManager().subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.roleItemsData = res.roleItems;
        this.addContactData = res.appItems;
        this.provinceItemsData = res.provinceItems;
      }
    })
  }
  ngOnInit(): void {
    this.getContactSource();

  }
  ngAfterViewInit(): void {
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res && res.length !== 0) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }


}
