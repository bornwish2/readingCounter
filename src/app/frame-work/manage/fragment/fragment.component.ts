import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFragmentMaster } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { FragmentManagerService } from 'src/app/services/fragment-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: IFragmentMaster[] = [];
  table: Table;
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IFragmentMaster; } = {};

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService
  ) {
  }

  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForFragmentNOB = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForFragmentNOB) {
      this.dataSource = this.closeTabService.saveDataForFragmentNOB;
    }
    else {
      this.dataSource = await this.fragmentManagerService.getDataSource();
      this.zoneDictionary = await this.fragmentManagerService.getZoneDictionary();
      console.log(this.zoneDictionary);

      this.convertIdToTitle(this.dataSource, this.zoneDictionary);
      this.closeTabService.saveDataForFragmentNOB = this.dataSource;
    }
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnSelectedFragmentMaster();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
    this.insertSelectedColumns();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/nob')
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
  reFetchTable = () => {
    this.classWrapper(true);
  }
  refreshTable = () => {
    this.table.initRowEdit(this.dataSource);
  }
  newRow() {
    return { zoneId: null, routeTitle: '', fromEshterak: '', toEshterak: '', isValidated: false };
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave(dataSource: IFragmentMaster) {
    dataSource.zoneId = dataSource.zoneId['id'];
    if (!this.fragmentManagerService.verificationMaster(dataSource))
      return;
    if (!dataSource.id) {
      this.onRowAdd(dataSource);
    }
    else {
      this.fragmentManagerService.editFragmentMaster(dataSource);
    }
    this.refreshTable();
  }
  onRowAdd(dataSource: IFragmentMaster) {
    if (!this.fragmentManagerService.verificationMaster(dataSource))
      return;
    this.fragmentManagerService.addFragmentMaster(dataSource);
  }
  onRowEditCancel(dataSource: any, index: number) {
    console.log('edit cancel' + dataSource);

    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
  }
  removeFragmentMaster = async (dataSource: IFragmentMaster) => {
    if (!this.fragmentManagerService.verificationMaster(dataSource))
      return;
    const a = await this.fragmentManagerService.removeFragmentMaster(dataSource);
    if (a)
      this.refreshTable();
  }
}
