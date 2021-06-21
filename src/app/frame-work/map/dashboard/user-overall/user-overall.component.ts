import { Component, OnInit } from '@angular/core';
import { IDashboardUsersInfo } from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-user-overall',
  templateUrl: './user-overall.component.html',
  styleUrls: ['./user-overall.component.scss']
})
export class UserOverallComponent implements OnInit {
  _colUsersInfo: IObjectIteratation[] = [];
  usersInfo: IDashboardUsersInfo;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.usersInfo = await this.dashboardService.getDashboardUsersInfo();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colUsersInfo = this.dashboardService.columnDashboardUserOverall();
  }
}
