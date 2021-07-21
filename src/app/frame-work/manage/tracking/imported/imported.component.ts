import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IEditTracking, ITracking } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';
import { ImportListDgComponent } from './import-list-dg/import-list-dg.component';


@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrls: ['./imported.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class ImportedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  filterZoneDictionary: IDictionaryManager[] = [];

  selectedFuckingTest: any[] = []
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectedInnerColumns: any[];

  ref: DynamicDialogRef;

  _outputFileName: string = 'imported';
  _numberOfExtraColumns = [1, 2];
  _sessionName = 'imported-session';

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    public outputManagerService: OutputManagerService
  ) {
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackImported = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackImported) {
      this.dataSource = this.closeTabService.saveDataForTrackImported;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingIMPORTED);
      this.filterZoneDictionary = await this.trackingManagerService.getZoneDictionary();
      this.closeTabService.saveDataForTrackImported = this.dataSource;
    }

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  onRowEditInit(product: any) {
    console.log(product);
  }
  private onRowEditSave(rowData: IEditTracking) {
    this.trackingManagerService.postEditingTrack(rowData);
    this.refreshTable();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    this._selectedColumns = this.trackingManagerService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/track/imported')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  showMoreDetails = (data: ITracking) => {
    this.ref = this.dialogService.open(ImportListDgComponent, {
      data: data,
      rtl: true,
      width: '70%'
    })
    this.ref.onClose.subscribe((res: ITracking) => {
      if (res)
        this.onRowEditSave(res);
    });
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: ITracking, desc: string, rowIndex: number) => {
    await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingREMOVE, rowData.id, desc)
    this.refetchTable(rowIndex);
  }
  firstConfirmDialog = (rowData: ITracking, rowIndex: number) => {
    const title = EN_messages.reason_deleteRoute;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: true,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.removeRow(rowData, desc, rowIndex)
        }
      })
    })
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}