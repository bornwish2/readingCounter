import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { ISearchSimpleOutput } from 'interfaces/search';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit, OnDestroy {
  dataSource: ISearchSimpleOutput[] = [];
  _years: ITitleValue[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  subscription: Subscription[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  _selectedKindId: string = '';

  constructor(
    private closeTabService: CloseTabService,
    public searchService: SearchService
  ) {
  }

  insertSelectedColumns = () => {
    this._selectCols = this.searchService.columnSearchSimple();
    this._selectedColumns = this.searchService.customizeSelectedColumns(this._selectCols);
  }
  converts = async () => {
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.insertSelectedColumns();
  }
  connectToServer = async () => {
    this.dataSource = [];
    if (!this.searchService.verificationSimpleSearch(this.searchService._searchSimpleReq))
      return;
    this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchSimple, this.searchService._searchSimpleReq);
    if (this.dataSource.length) {
      this.converts();
      this.closeTabService.saveDataForSearchSimple = this.dataSource;
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchSimple = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!MathS.isNull(this.closeTabService.saveDataForSearchSimple)) {
      this.dataSource = this.closeTabService.saveDataForSearchSimple;
      this.converts();
    }

    this.receiveYear();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.searchService.getZoneDictionary();
  }
  ngOnInit() {
    this.classWrapper();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    this.connectToServer();
  }
  receiveYear = () => {
    this._years = this.searchService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
}
