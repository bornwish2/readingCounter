import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { ITextOutput } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadManagerService } from 'src/app/services/read-manager.service';

@Component({
  selector: 'app-txt-output',
  templateUrl: './txt-output.component.html',
  styleUrls: ['./txt-output.component.scss']
})
export class TxtOutputComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource: ITextOutput[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: ITextOutput; } = {};

  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
    public outputManagerService: OutputManagerService
  ) {
  }

  nullSavedSource = () => this.closeTabService.saveDataForTextOutput = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTextOutput) {
      this.dataSource = this.closeTabService.saveDataForTextOutput;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.textOutputGET);
      this.closeTabService.saveDataForTextOutput = this.dataSource;
    }
    this.zoneDictionary = await this.readManagerService.getZoneDictionary();
    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnTextOutput();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/txt/out')
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
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: ITextOutput, rowIndex: number) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.postTextOutputDATA(ENInterfaces.textOutputRemove, rowData);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: ITextOutput, rowIndex: number) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  async onRowEditSave(dataSource: ITextOutput, rowIndex: number) {
    if (!this.readManagerService.verificationTextOutputEditedRow(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource.zoneId)
          dataSource.zoneId = item.id
      })
    } else {
      dataSource.zoneId = dataSource.zoneId['id'];
    }
    await this.readManagerService.postTextOutputDATA(ENInterfaces.textOutputEdit, dataSource);
    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
