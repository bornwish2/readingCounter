import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IProvinceManager } from 'src/app/Interfaces/iprovince-manager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { IAuthLevel2 } from './../../../../Interfaces/iauth-levels';
import { SnackWrapperService } from './../../../../services/snack-wrapper.service';
import { Auth2AddDgComponent } from './auth2-add-dg/auth2-add-dg.component';
import { Auth2EditDgComponent } from './auth2-edit-dg/auth2-edit-dg.component';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrls: ['./auth2.component.scss']
})
export class Auth2Component implements OnInit {
  titleFilter = new FormControl('');
  authLevel1IdFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  auth1Dictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'authLevel1Id', 'actions'];
  filterValues = {
    title: '',
    authLevel1Id: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog, private snackWrapperService: SnackWrapperService) { }

  // add auth 2 not working
  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth2AddDgComponent, {
        minWidth: '30rem',
        data: {
          di: this.auth1Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel2Manager(result).subscribe((res: IResponses) => {
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
      const dialogRef = this.dialog.open(Auth2EditDgComponent, {
        width: '30rem',
        data: { row, di: this.auth1Dictionary }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editAuthLevel2Manager(result).subscribe((res: IResponses) => {
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
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteAuthLevel2Manager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  convertIdToTitle = (dataSource: IAuthLevel2[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.id)
          dataSource.authLevel1Id = zoneDic.title;
      })
    });
  }
  getAuthLevel1Id = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel1DictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel1Manager().subscribe(res => {
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
    this.authLevel1IdFilter.valueChanges
      .subscribe(
        authLevel1Id => {
          this.filterValues.authLevel1Id = authLevel1Id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();
    this.dataSource.data = rolesData;
    this.auth1Dictionary = await this.getAuthLevel1Id();

    this.convertIdToTitle(rolesData, this.auth1Dictionary);
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.authLevel1Id.toLowerCase().indexOf(searchTerms.authLevel1Id) !== -1
    }
    return filterFunction;
  }
}