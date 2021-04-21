import { Component, Input, OnInit } from '@angular/core';
import { IAnalyzeRes } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-prfm-res',
  templateUrl: './prfm-res.component.html',
  styleUrls: ['./prfm-res.component.scss']
})
export class PrfmResComponent implements OnInit {
  dataSource: IAnalyzeRes[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }

  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (dataSource.zoneId == zoneDic.id) {
          dataSource.zoneId = zoneDic.title;
        }
      })
    });
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRAnalyzeByParam();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRAnalyzeByParamManager();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    console.log(this.dataSource);
    this.setGetRanges();
    this.insertSelectedColumns();
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
  }
  ngOnInit(): void {
    this.connectToServer();
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
  private setGetRanges = () => {
    this.dataSource.forEach(item => {
      item.average = parseFloat(this.utilsService.getRange(item.average));
      item.max = parseFloat(this.utilsService.getRange(item.max));
      item.median = parseFloat(this.utilsService.getRange(item.median));
      item.min = parseFloat(this.utilsService.getRange(item.min));
      item.mode = parseFloat(this.utilsService.getRange(item.mode));
      item.variance = parseFloat(this.utilsService.getRange(item.variance));
      item.standardDeviation = parseFloat(this.utilsService.getRange(item.standardDeviation));
    })
  }

}