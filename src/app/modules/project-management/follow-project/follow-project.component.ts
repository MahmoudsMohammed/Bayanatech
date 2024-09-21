import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestApiService } from 'src/app/shared/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { fade } from 'src/app/shared/animations/toggleBtn.animation';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexGrid,
  ApexTooltip,
} from 'ng-apexcharts';

@Component({
  selector: 'app-follow-project',
  templateUrl: './follow-project.component.html',
  styleUrls: ['./follow-project.component.scss'],
  animations: [fade],
})
export class FollowProjectComponent {
  // @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: any;
  public calculatorChartOptions: any;

  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/projects',
    },
    sub: {
      ar: ' متابعة إيرادات ومصروفات المشاريع',
      en: ' Monitor project revenues and expenses',
    },
  };
  searchBox: any = {
    open: false,
    searchType: null,
    searchTypes: [
      {
        name: {
          ar: 'اسم العميل',
          en: 'Customer Name',
        },
        id: 1,
      },
      {
        name: {
          ar: 'رقم الهوية',
          en: 'National Id',
        },
        id: 2,
      },
      {
        name: {
          ar: 'رقم الجوال',
          en: 'Mobile Number',
        },
        id: 3,
      },
    ],
  };

  displayedColumns: string[] = [
    'projectNumber',
    'ProjectTime',
    'ProjectPrice',
    'index',
    'profitability',
    'Net',
    'operations',
  ];
  data: any = {
    filter: {
      enable: false,
      date: null,
    },
    stage: {
      NameAr: '',
      NameEn: '',
    },
    clause: {
      NameAr: '',
      NameEn: '',
    },
    stages: [],
    clauses: [],
  };

  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private modalService: BsModalService,
    private api: RestApiService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Servings',
          data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35],
        },
      ],
      annotations: {
        points: [
          {
            x: 'Bananas',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Bananas are good',
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          // endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [
          '9-2022',
          '1-2022',
          '2-2022',
          '5-2022',
          '3-2022',
          '5-2022',
          '33-2022',
          '24-2022',
          '21-2022',
        ],
        tickPlacement: 'on',
      },
      yaxis: {
        title: {
          text: 'Servings',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    };
    this.calculatorChartOptions = {
      series: [
        {
          name: 'Net Profit',
          data: [44],
        },
        {
          name: 'Revenue',
          data: [76],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '100%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
    };

    this.getData();
  }
  getData() {
    this.api.get('../../../../assets/projectManegment.json').subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.projectFlow);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  selection = new SelectionModel<any>(true, []);
  modalDetails: any;
  addNewSupervision?: BsModalRef;
  employees: any[] = [
    {
      name: '',
      duration: '',
      durationType: '',
      ratio: '',
      salary: '',
      cost: '',
    },
  ];
  addEmployee() {
    let newEmployee = {
      name: '',
      duration: '',
      ratio: '',
      salary: '',
      cost: '',
    };
    this.employees.push(newEmployee);
  }

  log(asd: any) {
    // console.log(asd);
    // console.log(asd);
  }
  applyFilter(event: Event) {}
  availableSupervision() {}
  decline() {}
  confirmDelete() {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
