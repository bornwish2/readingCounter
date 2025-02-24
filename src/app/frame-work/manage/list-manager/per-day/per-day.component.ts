import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IListManagerPDHistory, IOffLoadPerDay } from 'interfaces/itrackings';
import { filter } from 'rxjs/internal/operators/filter';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { UtilsService } from 'services/utils.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-per-day',
  templateUrl: './per-day.component.html',
  styleUrls: ['./per-day.component.scss']
})
export class PerDayComponent extends FactoryONE {
  trackNumber: string;

  dataSource: IOffLoadPerDay;
  offLoadPerDayHistory: IListManagerPDHistory[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectMainDatas: any[];

  constructor(
    private closeTabService: CloseTabService,
    private listManagerService: ListManagerService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private dateJalaliService: DateJalaliService
  ) {
    super();
    this.getRouteParams();
  }

  routeToLMPDXY = (day: string) => {
    this.utilsService.routeToByParams('wr', { trackNumber: this.dataSource.trackNumber, day: day, distance: this.dataSource.overalDistance });
  }
  private insertSelectedColumns = () => {
    this._selectMainDatas = this.listManagerService.columnSelectedLMPerDayPositions();
    this._selectCols = this.listManagerService.columnSelectedLMPerDay();
    this._selectedColumns = this.listManagerService.customizeSelectedColumns(this._selectCols);
    this.dateJalaliService.sortByDate(this.offLoadPerDayHistory, 'day');
  }
  private setGetRanges = () => {
    this.dataSource.overalDuration = parseFloat(MathS.getRange(this.dataSource.overalDuration));
    this.dataSource.overalDistance = parseFloat(MathS.getRange(this.dataSource.overalDistance));
  }
  private setDynamicPartRanges = () => {
    this.offLoadPerDayHistory.forEach(item => {
      if (item.duration > 0)
        item.duration = parseFloat(MathS.getRange(item.duration))
      if (item.distance > 0)
        item.distance = parseFloat(MathS.getRange(item.distance))
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForLMPD = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.listManagerService.getLM(ENInterfaces.ListOffloadedPERDAY, parseInt(this.trackNumber));
    this.offLoadPerDayHistory = this.dataSource.offLoadPerDayHistory;

    this.setGetRanges();
    this.setDynamicPartRanges();

    if (this.dataSource)
      this.insertSelectedColumns();
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
        this.classWrapper();
      })
    )
  }
  toPrePage = () => this.router.navigate(['wr/m/track/reading']);
  refreshTable = () => {
    return;
  }
  ngOnInit(): void { return; }
}