import { BehaviorSubject } from 'rxjs';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';
import {
  trigger,
  state,
  style,
  AUTO_STYLE,
  transition,
  animate,
} from '@angular/animations';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-web-analysis',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild('userChart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  lang: any = 'ar';

  @ViewChild('tasksPaginator') tasksPaginator!: MatPaginator;
  @ViewChild('tasksSort') tasksSort!: MatSort;

  @ViewChild('acceptModal') acceptModal: any;
  @ViewChild('rejectModal') rejectModal: any;
  @ViewChild('reviewModal') reviewModal: any;
  @ViewChild('delayModal') delayModal: any;

  isRTL = true;

  page: any;
  ColumnMode = ColumnMode;
  pageNumber: any;
  size: any;
  totalElements: any;
  filters = [
    { name: 'الاسبوع الحالي', id: 1 },
    { name: 'الشهر الحالي', id: 2 },
    { name: 'العام الحالي', id: 3 },
  ];

  selectedOrderFilter: any = 1;
  selectedBillsFilter: any = 1;
  selectedQuestionsFilter: any = 1;

  date = new Date();
  elem: any;
  active = false;
  activeClient = false;
  index = 0;

  rows: any = {
    tasks: new MatTableDataSource([]),
  };

  selectedDate: any = 1;

  selectedDate2: any = 1;

  selectedDate3: any = 1;

  dates = [
    { id: 1, name: { ar: 'هذا اليوم', en: 'this Day' } },
    { id: 2, name: { ar: 'هذا الاسبوع', en: 'this Week' } },
    { id: 3, name: { ar: 'هذا الشهر', en: 'this Month' } },
  ];

  columns1: any = {
    tasks: [
      'taskName',
      'Customer',
      'Project',
      'Description',
      'status',
      'duration',
      'remaining',
      'requests',
      'operations',
    ],
    projects: [
      'CustomerName',
      'Description',
      'ProjectNumber',
      'ProjectType',
      'SubprojectType',
      'ProjectDuration',
      'ProjectStart',
      'ProjectEnd',
      'CompletionRate',
    ],
    Supervisor: [
      'CustomerName',
      'ProjectNumber',
      'SupervisionNo',
      'assignedEmployee',
      'receivingStatus',
      'stageName',
      'CommissioningDate',
      'projectManager',
    ],
    contracts: [
      'contractNumber',
      'contractDate',
      'ProjectNumber',
      'ProjectName',
      'CustomerName',
      'totalAmount',
      'paid',
      'remaining',
      'PaymentsDetails',
    ],
    tasksPerProjects: [
      'ProjectNumber',
      'CustomerName',
      'ProjectName',
      'ProjectType',
      'SubprojectType',
      'taskName',
      'assignedEmployee',
      'taskStart',
      'taskEnd',
    ],
    employeeTasks: [
      'CustomerName',
      'ProjectName',
      'taskName',
      'taskStatus',
      'taskDuration',
      'ProjectNumber',
      'ProjectType',
      'ProjectStart',
      'ProjectDuration',
    ],
    saleInvoices: [
      'invoiceNumber',
      'InvoiceDate',
      'InvoiceAmount',
      'PaymentType',
      'InvoiceStatus',
      'PostingDate',
      'customerName',
      'projectNumber',
      'InvoiceOptions',
    ],
    DeferredSalesInvoices: [
      'contractNumber',
      'invoiceNumber',
      'InvoiceDate',
      'InvoiceAmount',
      'PaymentType',
      'CustomerName',
      'ProjectNumber',
      'DataEntryName',
      'InvoiceOptions',
    ],
    InvoicesWithoutProjects: [
      'invoiceNumber',
      'InvoiceDate',
      'InvoiceAmount',
      'PaymentType',
      'InvoiceStatus',
      'PostingDate',
      'customerName',
      'DataEntryName',
      'InvoiceOptions',
    ],

    purchaseInvoices: [
      'invoiceNumber',
      'InvoiceDate',
      'InvoiceAmount',
      'PaymentType',
      'ResourceName',
      'InvoiceStatus',
      'PostingDate',
      'DataEntryName',
      'InvoiceOptions',
    ],
    DeferredPurchaseInvoices: [
      'invoiceNumber',
      'InvoiceDate',
      'InvoiceAmount',
      'PaymentType',
      'ResourceName',
      'InvoiceStatus',
      'DataEntryName',
      'InvoiceOptions',
    ],
    Bonds: [
      'BondNumber',
      'BondDate',
      'BondAmount',
      'PaymentType',
      'ClientName',
      'BondCondition',
      'DataEntryName',
      'operations',
    ],
    DeferredBonds: [
      'BondNumber',
      'BondDate',
      'BondAmount',
      'PaymentType',
      'SupplierEmployeeName',
      'PurchaseInvoiceNumber',
      'ExchangeItemName',
      'DataEntryName',
      'operations',
    ],
    ProjectRevenuesAndExpenses: [
      'projectLocation',
      'projectNumber',
      'ProjectDuration',
      'projectValue',
      'Revenues',
      'OperatingExpenses',
      'ProfitRatio',
      'net',
      'projectStatus',
    ],
    IdentitiesExpire: [
      'EmployeeName',
      'Nationality',
      'IDNumber',
      'department',
      'Branch',
      'JobName',
      'EndDate',
      'dateReminder',
      'ContractExpiryDate',
    ],
    IdentitiesIsExpired: [
      'EmployeeName',
      'Nationality',
      'IDNumber',
      'EndDate',
      'JobName',
      'department',
      'DirectManager',
      'Branch',
      'ContractExpiryDate',
    ],
    DocumentsNearComplete: [
      'DocumentName',
      'DocumentNumber',
      'Issuer',
      'EndDate',
      'AlertDate',
      'Branch',
      'reminderText',
    ],
    ExpiredDocuments: [
      'DocumentName',
      'DocumentNumber',
      'Issuer',
      'EndDate',
      'Branch',
      'Attachments',
      'reminderText',
    ],
    ContractsNearComplete: [
      'EmployeeName',
      'Nationality',
      'JobName',
      'department',
      'Branch',
      'serviceDuration',
      'Salary',
      'ContractExpiryDate',
    ],
    ExpiredContracts: [
      'contractNumber',
      'EmployeeName',
      'Nationality',
      'JobName',
      'department',
      'Branch',
      'serviceDuration',
      'ContractExpiryDate',
      'Salary',
    ],
    employeeWithoutContract: [
      'EmployeeName',
      'Nationality',
      'JobName',
      'department',
      'Branch',
      'MobileNumber',
      'Email',
      'IDNumber',
    ],
  };
  dataSourceWaitingVacation: MatTableDataSource<any> = new MatTableDataSource([
    {},
  ]);
  dataSourceAcceptingVacation: MatTableDataSource<any> = new MatTableDataSource(
    [{}]
  );
  dataSourceWaitingImprest: MatTableDataSource<any> = new MatTableDataSource([
    {},
  ]);
  dataSourceAcceptingImprest: MatTableDataSource<any> = new MatTableDataSource([
    {},
  ]);
  displayedColumnsWaitingVacation: string[] = [
    'date',
    'employeeName',
    'vacationType',
    'discoundType',
    'startDate',
    'duration',
    'dicesion',
  ];

  displayedColumnsAcceptingVacation: string[] = [
    'date',
    'employeeName',
    'vacationType',
    'discoundType',
    'duration',
    'endDate',
  ];
  columns: any = {
    tasks: [
      'taskNo',
      'assignedTo',
      'from',
      'to',
      'customer',
      'implemented',
      'enginner',
      'excuting_officer',
      'projectNo',
      'status',
      'operations',
    ],
  };
  info: any = [
    {
      title: {
        ar: 'التعاميم',
        en: 'Circulars',
      },
      img: 'Group 40202@2x',
      color: '#0f75bc',
    },
    {
      title: {
        ar: 'الاشعارات',
        en: 'Notifications',
      },
      img: 'Group 40200@2x',
      color: '#333333',
    },
    {
      title: {
        ar: 'مشاريعي',
        en: 'My Projects',
      },
      img: 'Group 40199@2x',
      color: '#f1854e',
    },
    {
      title: {
        ar: 'مهامى',
        en: 'My Tasks',
      },
      img: 'Path 33991@2x',
      color: '#f1854e',
    },
    {
      title: {
        ar: 'عهد',
        en: 'Tools',
      },
      img: 'coin-bag-line@2x',
      color: '#4fb793',
    },
  ];
  employeeType: number = 1;

  years: any = [2022, 2023, 2024, 2025];

  selectedYear: any = new Date().getFullYear();

  TimeframeTab = true;
  ProjectFlowTab = true;
  FinancialTab = true;
  AdministrativeTab = true;
  preformanceTab = true;
  progressTab = true;
  waitingVacation: any;
  acceptingVacation: any;
  waitingImprests: any;
  acceptingImprests: any;
  displayedColumnsWaitingImprest: string[] = [
    'date',
    'employeeName',
    'branch',
    'amount',
    'installmentNumber',
    'startDate',
    'dicesion',
  ];

  displayedColumnsAcceptingImprest: string[] = [
    'imprestNo',
    'date',
    'imprestStatus',
    'employeeName',
    'amount',
  ];

  selectedTask: any;

  selectedUser: any;
  users: any;

  items = [
    {
      assignedTo: 'محمد هلهل	',
      ProjectNumber: '2022-63	',
      CustomerName: 'احمد',
      taskStatus: 'منخفض',
    },
  ];

  stratDate = new Date();
  endDate = new Date();

  public readonly uploadedFile: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );

  public readonly control = new FileUploadControl(
    {
      listVisible: true,
      // accept: ['image/*'],
      discardInvalid: true,
      multiple: false,
    },
    [
      // FileUploadValidators.accept(['image/*']),
      FileUploadValidators.filesLimit(1),
    ]
  );

  value: number = 10;
  thick: number = 10;

  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: '  الموظفون الغائبون ',
      en: ' Absentee Staff ',
    },
  };

  data: any = {
    absence: [],
    filter: {
      enable: false,
      date: null,
    },
  };

  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
    this.waitingImprests = [
      {
        date: new Date(),
        employeeName: 'addvkmam',
        branch: 'cacmaca',
        amount: 'vamvkma',
        installmentNumber: 'ackas',
        startDate: new Date(),
        dicesion: 'cascasmc',
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        branch: 'cacmaca',
        amount: 'vamvkma',
        installmentNumber: 'ackas',
        startDate: new Date(),
        dicesion: 'cascasmc',
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        branch: 'cacmaca',
        amount: 'vamvkma',
        installmentNumber: 'ackas',
        startDate: new Date(),
        dicesion: 'cascasmc',
      },
    ];
    this.dataSourceWaitingImprest = new MatTableDataSource(
      this.waitingImprests
    );

    this.acceptingImprests = [
      {
        imprestNo: 'addvkmam',
        date: new Date(),
        imprestStatus: 'cacmaca',
        employeeName: 'vamvkma',
        amount: 'ackas',
      },
      {
        imprestNo: 'addvkmam',
        date: new Date(),
        imprestStatus: null,
        employeeName: 'vamvkma',
        amount: 'ackas',
      },
      {
        imprestNo: 'addvkmam',
        date: new Date(),
        imprestStatus: 'cacmaca',
        employeeName: 'vamvkma',
        amount: 'ackas',
      },
    ];
    this.dataSourceAcceptingImprest = new MatTableDataSource(
      this.acceptingImprests
    );
    this.waitingVacation = [
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: true,
        discoundType: 'vamvkma',
        startDate: new Date(),
        duration: 'ackas',
        dicesion: 'cascasmc',
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: false,
        discoundType: 'vamvkma',
        startDate: new Date(),
        duration: 'ackas',
        dicesion: 'cascasmc',
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: true,
        discoundType: 'vamvkma',
        startDate: new Date(),
        duration: 'ackas',
        dicesion: 'cascasmc',
      },
    ];
    this.dataSourceWaitingVacation = new MatTableDataSource(
      this.waitingVacation
    );

    this.acceptingVacation = [
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: true,
        discoundType: 'vamvkma',
        duration: 'ackas',
        endDate: new Date(),
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: true,
        discoundType: 'vamvkma',
        duration: 'ackas',
        endDate: new Date(),
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: true,
        discoundType: 'vamvkma',
        duration: 'ackas',
        endDate: new Date(),
      },
    ];
    this.dataSourceAcceptingVacation = new MatTableDataSource(
      this.acceptingVacation
    );
    this.api.lang.subscribe((res) => {
      this.lang = res;
    });
  }
  getData() {
    this.api.get('../../../../../../assets/home.json').subscribe({
      next: (data: any) => {
        // assign tasks to table
        this.rows.tasks = new MatTableDataSource(data.tasks?.slice(0,1));
        // this.rows.tasks.paginator = this.tasksPaginator;
        // this.rows.tasks.sort = this.tasksSort;
        // assign notifications data to table
      },
      error: (error) => {
        // console.log(error);
      },
    });
    this.api.get('../../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.absence = data.absence;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  ngOnInit(): void {
    this.users = [
      { id: 1, Name: 'محمود نافع' },
      { id: 2, Name: 'محمود نافع' },
      { id: 3, Name: 'محمود نافع' },
      { id: 4, Name: 'محمود نافع' },
      { id: 5, Name: 'محمود نافع' },
      { id: 6, Name: 'محمود نافع' },
      { id: 7, Name: 'محمود نافع' },
      { id: 8, Name: 'محمود نافع' },
      { id: 9, Name: 'محمود نافع' },
      { id: 10, Name: 'محمود نافع' },
      { id: 11, Name: 'محمود نافع' },
    ];

    // this.elem = document.documentElement;
    this.chartOptions = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    if (this.isRTL) {
      this.chartOptions.xaxis['categories'].reverse();
    }
  }

  role: any;

  open(content: any, size?: any, data?: any, positions?: any, role?: any) {
    if (role) {
      this.role = role;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: size ? size : 'xl',
        centered: size == 'infoAction' ? true : false,
      })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  public generateData(baseval: any, count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  confirm() {}

  openModal(event: any, type: any) {
    // type = اجازة / سلف

    let value = event?.target?.value;

    switch (value) {
      case '1':
        this.modalService.open(this.acceptModal, {
          size: 'md',
          centered: true,
        });
        break;
      case '2':
        this.modalService.open(this.rejectModal, {
          size: 'md',
          centered: true,
        });
        break;
      case '3':
        this.modalService.open(this.reviewModal, {
          size: 'md',
          centered: true,
        });
        break;
      case '4':
        this.modalService.open(this.delayModal, { size: 'md', centered: true });
        break;

      default:
        break;
    }
  }

  latitude: any = 24.72030293127678;
  longitude: any = 46.698462762671475;
  mapReady: boolean = false;
  zoom!: number;
  address!: string;
  private geoCoder: any;

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  onMapReady(map?: google.maps.Map) {
    if (map) {
      map.setOptions({
        streetViewControl: false,
        fullscreenControl: false,
      });
      google.maps.event.addListener(map, 'click', (event) => {
        this.setLocation(event.latLng.lat(), event.latLng.lng());
      });
    }
  }
  setLocation(lat: any, lng: any) {
    this.latitude = lat;
    this.longitude = lng;

    // console.log(this.latitude, this.longitude);

    this.getAddress(lat, lng);
  }

  markerDragEnd(event: any) {
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();

    // console.log(this.latitude, this.longitude);

    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.geoCoder?.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 16;
            this.address = results[1].formatted_address;
            // console.log(this.address);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
}
