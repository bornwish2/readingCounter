import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportReq } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';


@Component({
  selector: 'app-disposal-hours',
  templateUrl: './disposal-hours.component.html',
  styleUrls: ['./disposal-hours.component.scss']
})
export class DisposalHoursComponent implements OnInit {
  readingReportReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  _isOrderByDate: boolean = false;
  _selectedKindId: string = '';
  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    private interactionService: InteractionService,
    public route: ActivatedRoute
  ) { }

  classWrapper = async () => {
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
  }
  ngOnInit() {
    this.classWrapper();
  }
  routeToChild = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/dh/res');
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/rpts/mam/dh') {
          this.classWrapper();
        }
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
  receiveFromDateJalali = ($event: string) => {
    this.readingReportReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportReq.toDate = $event;
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRDisposalHours(this.readingReportReq);
    if (temp)
      this.routeToChild();
  }
}