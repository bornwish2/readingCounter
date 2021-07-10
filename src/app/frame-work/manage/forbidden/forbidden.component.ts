import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReadingReportWithZoneIDsReq } from 'interfaces/imanage';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { InteractionService } from 'services/interaction.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  readingReportReq: IReadingReportWithZoneIDsReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400,
    zoneIds: [0]
  }

  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];


  constructor(
    private interactionService: InteractionService,
    private forbiddenService: ForbiddenService,
    public route: ActivatedRoute,
    private closeTabService: CloseTabService
  ) { }

  classWrapper = async () => {
    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    this._years = this.forbiddenService.getYears();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/fbn') {
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
  routeToChild = () => {
    this.forbiddenService.routeToChild();
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportReq.toDate = $event;
  }
  verification = async () => {
    const temp = this.forbiddenService.verificationForbidden(this.readingReportReq);
    if (temp)
      this.routeToChild();
  }

}