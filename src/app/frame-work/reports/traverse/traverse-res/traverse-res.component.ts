import { Component, Input, OnInit } from '@angular/core';
import { IReadingReportTraverse } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';


@Component({
  selector: 'app-traverse-res',
  templateUrl: './traverse-res.component.html',
  styleUrls: ['./traverse-res.component.scss']
})
export class TraverseResComponent implements OnInit {
  @Input() dataSource: IReadingReportTraverse[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private readingReportManagerService: ReadingReportManagerService
  ) {
  }

  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRTraverse();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRTraverseManager();
    if (!this.dataSource.length) {
      this.readingReportManagerService.emptyMessage();
      return;
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
  }
  ngOnInit(): void {
    this.connectToServer();
    this.insertSelectedColumns();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  refreshTable = () => {
    this.ngOnInit();
  }
}