import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { ITracking } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

@Component({
  selector: 'app-loaded',
  templateUrl: './loaded.component.html',
  styleUrls: ['./loaded.component.scss']
})
export class LoadedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  filterZoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  selectedFuckingTest: any[] = [];

  visibility: boolean = true;
  _firstPage: number = 0;
  _rowsNumberPage: number = 10;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService
  ) {
  }

  removeRow = (rowData: ITracking) => {
    this.trackingManagerService.removeTrackingId(rowData.id);
    this.updateVisibility();
  }
  getZoneDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.trackingManagerService.getAllZoneTitles().subscribe(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(e => e);
    }
  }
  getDataSource = (): Promise<ITracking[]> => {
    try {
      return new Promise((resolve) => {
        this.trackingManagerService.getLoadedDataSource().subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  rowToImported = (row: ITracking) => {
    this.trackingManagerService.migrateDataRowToImported(row.id);
    this.updateVisibility();
  }
  nullSavedSource = () => this.closeTabService.saveDataForTrackLoaded = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackLoaded) {
      this.dataSource = this.closeTabService.saveDataForTrackLoaded;
    }
    else {
      this.dataSource = await this.getDataSource();
      this.filterZoneDictionary = await this.getZoneDictionary();
      console.log(this.dataSource);

      this.closeTabService.saveDataForTrackLoaded = this.dataSource;
    }
  }
  next = () => this._firstPage = this._firstPage + this._rowsNumberPage;
  prev = () => this._firstPage = this._firstPage - this._rowsNumberPage;
  reset = () => this._firstPage = 0;
  isLastPage = (): boolean => { return this.dataSource ? this._firstPage === (this.dataSource.length - this._rowsNumberPage) : true; }
  isFirstPage = (): boolean => { return this.dataSource ? this._firstPage === 0 : true; }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
    this.insertSelectedColumns();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/track/loaded')
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
  refreshTable = () => {
    this.classWrapper(true);
  }
  updateVisibility = () => {
    this.visibility = false;
    setTimeout(() => this.visibility = true, 0);
  }

}