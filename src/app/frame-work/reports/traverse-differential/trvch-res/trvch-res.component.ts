import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportTraverseDifferentialRes } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';


@Component({
  selector: 'app-trvch-res',
  templateUrl: './trvch-res.component.html',
  styleUrls: ['./trvch-res.component.scss']
})
export class TrvchResComponent implements OnInit, OnDestroy {
  dataSource: IReadingReportTraverseDifferentialRes[] = [];

  subscription: Subscription[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRTraverseDifferential();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRManager('wr/rpts/mam/trvch', ENInterfaces.ListTraverseDifferential, 'rRTraverseDiffrential');
    if (this.utilsService.isNull(this.dataSource))
      return;
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
