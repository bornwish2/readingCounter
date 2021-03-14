import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IProvinceManager } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { CloseTabService } from './../../../../services/close-tab.service';
import { SnackWrapperService } from './../../../../services/snack-wrapper.service';
import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';
import { Auth3EditDgComponent } from './auth3-edit-dg/auth3-edit-dg.component';


@Component({
  selector: 'app-auth3',
  templateUrl: './auth3.component.html',
  styleUrls: ['./auth3.component.scss']
})
export class Auth3Component implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  authLevel2IdFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  subscription: Subscription[] = [];

  auth2Dictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'authLevel2Id', 'actions'];
  filterValues = {
    title: '',
    authLevel2Id: ''
  };

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  // add auth 2 not working
  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth3AddDgComponent, {
        data: {
          di: this.auth2Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel3Manager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth3EditDgComponent, {
        width: '30rem',
        data: { row, di: this.auth2Dictionary }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editAuthLevel3Manager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  deleteDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        resolve(result)
      });
    });
  }
  deleteSingleRow = async (row: IProvinceManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteAuthLevel3Manager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.authLevel2Id)
          dataSource.authLevel2Id = zoneDic.title;
      })
    });
  }
  getAuthLevel2Id = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getAuthLev2Dictionary());
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel3Manager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  filter = () => {
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.authLevel2IdFilter.valueChanges
      .subscribe(
        authLevel2Id => {
          this.filterValues.authLevel2Id = authLevel2Id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel3 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel3) {
      this.dataSource.data = this.closeTabService.saveDataForAppLevel3;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.closeTabService.saveDataForAppLevel3 = this.dataSource.data;
    }
    this.auth2Dictionary = await this.getAuthLevel2Id();
    this.convertIdToTitle(this.dataSource.data, this.auth2Dictionary);
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }

  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/cr')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.authLevel2Id.toLowerCase().indexOf(searchTerms.authLevel2Id) !== -1
    }
    return filterFunction;
  }
}