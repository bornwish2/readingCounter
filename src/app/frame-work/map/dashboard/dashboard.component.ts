import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {
  BaseChartDirective,
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import {
  IDashboardForbiddenTimed,
  IDashboardKarkardTimed,
  IDashboardMediaTimed,
  IDashboardReadDaily,
} from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  forbidden: IDashboardForbiddenTimed;
  media: IDashboardMediaTimed;
  karkard: IDashboardKarkardTimed[] = [];
  readDaily: IDashboardReadDaily[] = [];

  _col_forbidden: IObjectIteratation[] = [];
  _col_Media: IObjectIteratation[] = [];

  /* PIE CHART*/
  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
    tooltips: {
      footerFontFamily: 'Blotus',
      bodyFontFamily: 'Blotus',
      titleFontFamily: 'Blotus',
      bodyFontSize: 18,
      titleFontSize: 18,
      footerFontSize: 18,
      bodyFontStyle: 'bold',
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          let allData: any = data.datasets[tooltipItem.datasetIndex].data;
          let tooltipLabel = data.labels[tooltipItem.index];
          let tooltipData = allData[tooltipItem.index];
          let total = 0;
          for (let i in allData) {
            total += parseFloat(allData[i]);
          }
          let tooltipPercentage = Math.round((tooltipData / total) * 100);
          return ' (  %' + tooltipPercentage + '  ) ' + tooltipData + ' :  ' + tooltipLabel;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [['عادی'], ['فاقد'], ['مانع'], ['خراب'], ['تعویض'], ['سایر']];
  public pieChartData: SingleDataSet = [];
  public pieChartDataOne: SingleDataSet = [];
  public pieChartDataTwo: SingleDataSet = [];
  public pieChartDataThree: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: [
        'rgb(0, 69, 203)',
        'rgb(117, 188, 84)',
        'rgba(139, 136, 136, 0.9)',
        'rgb(246, 62, 56)',
        'rgb(246, 128, 56)',
        'rgb(125, 131, 255)'
      ]
    }
  ]
  public pieChartLegend = true;
  public pieChartPlugins = [];

  /* END PIE CHART CONFIGS*/

  /* LINE CHART */
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  /* END LINE CHART*/
  constructor(
    private dashboardService: DashboardService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  private insertSelectedColumns = () => {
    this._col_Media = this.dashboardService.columnDashboardMedia();
    this._col_forbidden = this.dashboardService.columnDashboardForbidden();
  }

  classWrapper = async () => {
    this.readDaily = await this.dashboardService.getDashboardReadDaily();
    this.addToLineChart();

    this.forbidden = await this.dashboardService.getDashboardForbidden();
    this.media = await this.dashboardService.getDashboardMedia();
    this.karkard = await this.dashboardService.getDashboardKarkard();
    this.insertSelectedColumns();
    this.getPieChartData();
  }
  addToLineChart = () => {
    const temp = this.dashboardService.getElementOfArrOfObjects(this.readDaily);
    this.lineChartData = [{ data: temp }];
  }

  ngOnInit(): void {
    this.classWrapper();
  }
  getPieChartData = () => {
    this.pieChartData = this.dashboardService.getObjectParameters(this.karkard[0]);
    this.pieChartDataOne = this.dashboardService.getObjectParameters(this.karkard[1]);
    this.pieChartDataTwo = this.dashboardService.getObjectParameters(this.karkard[2]);
    this.pieChartDataThree = this.dashboardService.getObjectParameters(this.karkard[3]);
  }

}
