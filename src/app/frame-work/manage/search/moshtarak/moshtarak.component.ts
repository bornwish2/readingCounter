import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { Search } from 'src/app/classes/search';

@Component({
  selector: 'app-moshtarak',
  templateUrl: './moshtarak.component.html',
  styleUrls: ['./moshtarak.component.scss']
})

export class MoshtarakComponent extends FactoryONE {
  dataSource: IOnOffLoadFlat[] = [];
  searchType: Search[];
  searchByText: string = '';
  _empty_message: string = '';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(

    private closeTabService: CloseTabService,
    public searchService: SearchService
  ) {
    super();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.searchService.columnSearchMoshtarakin();
    this._selectedColumns = this.searchService.customizeSelectedColumns(this._selectCols);
  }
  converts = async () => {
    this._empty_message = EN_messages.notFound;

    if (this.searchService.searchReqMosh.zoneId) {
      this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.searchService.searchReqMosh.zoneId);
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    this.counterStateDictionary = await this.searchService.getCounterStateDictionary();
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');

    this.insertSelectedColumns();
    this.searchService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    if (!this.searchService.verificationMosh(this.searchService.searchReqMosh))
      return;
    this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchMoshtarak, this.searchService.searchReqMosh);
    this.converts();
    this.searchService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForSearchMoshtarakin = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchMoshtarakin = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!MathS.isNull(this.closeTabService.saveDataForSearchMoshtarakin)) {
      this.dataSource = this.closeTabService.saveDataForSearchMoshtarakin;
      this.converts();
    }
    else
      this.toDefaultVals();

    this.searchType = this.searchService.getSearchTypes();
    this.zoneDictionary = await this.searchService.getZoneDictionary();
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
  toDefaultVals = () => {
    this.dataSource = [];
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.searchService.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.searchService.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.searchService.snackEmptyValue();
  }

}
