import { Component } from '@angular/core';
import { IReadingReportGISReq, IReadingReportGISResponse } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent extends FactoryONE {
  gisResponse: IReadingReportGISResponse[] = [];
  readingReportGISReq: IReadingReportGISReq = {
    zoneId: 0,
    isCounterState: true,
    counterStateId: 0,
    isKarbariChange: false,
    isAhadChange: false,
    isForbidden: false,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400,
    isCluster: true
  }
  searchInOrderTo: IDictionaryManager[] = [
    {
      id: 'isCounterState',
      title: 'وضعیت کنتور',
      isSelected: false
    },
    {
      id: 'isForbidden',
      title: 'غیر مجاز',
      isSelected: false
    },
    {
      id: 'isAhadChange',
      title: 'تغییر آحاد',
      isSelected: false
    },
    {
      id: 'isKarbariChange',
      title: 'تغییر کاربری',
      isSelected: false
    }
  ]
  dateEvaluate: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    },

  ]
  _isOrderByDate: boolean = true;
  _orderBy: string = '';
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];


  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    public interactionService: InteractionService
  ) {
    super(interactionService);
  }

  getCounterStateByZoneId = async () => {
    this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneIdDictionary(this.readingReportGISReq.zoneId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportGISReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportGISReq.toDate = $event;
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }

  changeRadio = (event: any) => {
    this.searchInOrderTo.forEach(item => {
      if (item.id !== event.value)
        this.readingReportGISReq[item.id] = false;
      else
        this.readingReportGISReq[item.id] = true;
    })
    console.log(event.value);

    event.value === 'isForbidden' ? this._isOrderByDate = true : ''
    event.value === 'isCounterState' ? this.readingReportGISReq.isCounterState = true : ''
  }
  makeObject = () => {
    this._isOrderByDate ? (this.readingReportGISReq.readingPeriodId = null, this.readingReportGISReq.year = 0) : (this.readingReportGISReq.fromDate = '', this.readingReportGISReq.toDate = '');
  }
  verification = async () => {
    this.makeObject();
    const temp = this.readingReportManagerService.verificationRRGIS(this.readingReportGISReq, this._isOrderByDate);
    if (temp)
      this.readingReportManagerService.routeToMapGIS();
  }

}
