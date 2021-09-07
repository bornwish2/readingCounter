import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/imanage';
import { IImportDataResponse, IImportSimafaSingleReq, IReadingProgramRes } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-single',
  templateUrl: './simafa-single.component.html',
  styleUrls: ['./simafa-single.component.scss']
})
export class SimafaSingleComponent extends FactoryONE {

  _readingProgramRes: IReadingProgramRes;
  simafaSingleReq: IImportSimafaSingleReq = {
    zoneId: 0,
    alalHesabPercent: null,
    imagePercent: null,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    counterReaderId: '',
    readingPeriodId: null,
    year: 1400,
    readingProgramId: ''
  }
  _showAlalHesabPercent: boolean = false;

  readingConfigDefault: IReadingConfigDefault;
  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IImportDataResponse;
  subscription: Subscription[] = [];

  constructor(
    public interactionService: InteractionService,
    public importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private route: ActivatedRoute
  ) {
    super(interactionService);
  }

  getRouteParams = () => {
    this.simafaSingleReq.readingProgramId = this.route.snapshot.paramMap.get('id');
    this.simafaSingleReq.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
    this.simafaSingleReq.year = parseInt(this.route.snapshot.paramMap.get('year'));
    this.simafaSingleReq.readingPeriodId = parseInt(this.route.snapshot.paramMap.get('readingPeriodId'));
  }
  connectToServer = async (canRefresh?: boolean) => {
    const validation = this.importDynamicService.checkSimafaSingleVertification(this.simafaSingleReq);
    if (!validation)
      return;
    this.importDynamicService.showResDialog(await this.importDynamicService.postImportSimafa(ENInterfaces.postSimafaSingle, this.simafaSingleReq), false, EN_messages.importDynamic_created)
  }
  // nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      // this.nullSavedSource();
    }
    this._readingProgramRes = this.importDynamicService.columnSimafaSingle();
    this.getRouteParams();
    this.selectedZoneId();

    this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.simafaSingleReq.zoneId);
    this.insertReadingConfigDefaults(this.readingConfigDefault);
  }
  selectedZoneId = async () => {
    this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.simafaSingleReq.zoneId);
  }
  private insertReadingConfigDefaults = (rcd: IReadingConfigDefault) => {
    this.simafaSingleReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.simafaSingleReq.displayBillId = rcd.displayBillId;
    this.simafaSingleReq.displayRadif = rcd.displayRadif;
    this.simafaSingleReq.imagePercent = rcd.defaultImagePercent;
    this.simafaSingleReq.alalHesabPercent = rcd.defaultAlalHesab;
    console.log(this.simafaSingleReq);

  }
}
