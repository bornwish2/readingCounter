import { CloseTabService } from 'services/close-tab.service';
import { Component, OnInit } from '@angular/core';
import { FactoryONE } from 'src/app/classes/factory';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { IUserManager } from 'interfaces/iuser-manager';
import { UsersAllService } from 'services/users-all.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-load-agent-data',
  templateUrl: './load-agent-data.component.html',
  styleUrls: ['./load-agent-data.component.scss']
})
export class LoadAgentDataComponent extends FactoryONE {

  agentId: string;
  users: IUserManager[] = [];
  searchTerm: string='';

  constructor(
    private outputManagerService: OutputManagerService,
    private trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    public usersAllService: UsersAllService
  ) {
    super();
   }

   connectToServer = async () => {
     if (this.agentId==null)
      return
    const res = await this.trackingManagerService.downloadAgentData(this.agentId);
    this.outputManagerService.downloadFile(res, '.txt');
  }

  nullSavedSource = () => this.closeTabService.saveDataForAgentLoad = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
      this.users = await this.usersAllService.connectToServer(ENInterfaces.userGET);
  }
}
