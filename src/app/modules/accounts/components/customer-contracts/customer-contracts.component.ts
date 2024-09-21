import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SelectionModel } from '@angular/cdk/collections';

import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DateType } from 'ngx-hijri-gregorian-datepicker';

@Component({
  selector: 'app-customer-contracts',
  templateUrl: './customer-contracts.component.html',
  styleUrls: ['./customer-contracts.component.scss'],
})
export class CustomerContractsComponent implements OnInit {
  // data in runningTasksModal
  accountingEntries = [
    {
      date: '2023-07-01',
      bondNumber: '123',
      bondType: 'Type A',
      registrationNumber: '456',
      accountCode: '789',
      accountName: 'Account A',
      statement: 'Statement A',
      debtor: 100,
      creditor: 50,
    },
    {
      date: '2023-07-02',
      bondNumber: '456',
      bondType: 'Type B',
      registrationNumber: '789',
      accountCode: '012',
      accountName: 'Account B',
      statement: 'Statement B',
      debtor: 200,
      creditor: 150,
    },
  ];

  get totalDebtor() {
    return this.accountingEntries.reduce(
      (total, entry) => total + entry.debtor,
      0
    );
  }

  get totalCreditor() {
    return this.accountingEntries.reduce(
      (total, entry) => total + entry.creditor,
      0
    );
  }

  projects: any;
  services: any;
  @ViewChild('SmartFollower') smartModal: any;
  title: any = {
    main: {
      name: {
        ar: 'الحسابات',
        en: 'Projects Management',
      },
      link: '/accounts',
    },
    sub: {
      ar: 'عقود العملاء ',
      en: 'customer contracts',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  showStats = false;
  showFilters = false;
  showPrice = false;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  columns: any = [];

  isEditable: any = {};

  openBox: any = false;
  boxId: any;

  // revision
  displayedColumns: string[] = [
    'offer_id',
    'date',
    'customer',
    'price',
    'user',
    'project_id',
    'project-duration',
    'operations',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  delayedProjects: any;
  latedProjects: any;

  currentDate: any;

  selectedProject: any;
  selectedRow: any;

  selectAllValue = false;

  selectedUserPermissions: any = {
    userName: '',
    watch: null,
    add: null,
    edit: null,
    delete: null,
  };
  userPermissions: any = [];

  userPermissionsColumns: string[] = [
    'userName',
    'watch',
    'add',
    'edit',
    'delete',
    'operations',
  ];
  projectGoalsColumns: string[] = [
    'serial',
    'requirements',
    'name',
    'duration',
    'choose',
  ];
  projectDisplayedColumns: string[] = [
    'contractNumber',
    'ContractDate',
    'totalAfterTax',
    'customerName',
    'ProjectNameDes',
    'ProjectNumber',
    'PaidAmount',
    'RemainingAmount',
    'operations',
  ];
  serviceDisplayedColumns: string[] = [
    'M',
    'TeamWorkCategories',
    'Specialization',
    'Number',
    'Notes',
  ];

  projectUsersColumns: string[] = ['name', 'responsibility'];
  projectTasksColumns: string[] = ['taskName', 'name', 'duration'];

  userPermissionsDataSource = new MatTableDataSource();

  projectGoalsDataSource = new MatTableDataSource();

  projectUsersDataSource = new MatTableDataSource();

  projectTasksDataSource = new MatTableDataSource();

  projectsDataSource = new MatTableDataSource();

  servicesDataSource = new MatTableDataSource();

  modalDetails: any = {
    InvoiceNumber: null,
    projectDuration: null,
    branch: null,
    center: null,
    from: null,
    to: null,
    projectType: null,
    subProjectDetails: null,
    walk: null,
    customer: null,
    buildingType: null,
    service: null,
    user: null,
    region: null,
    projectDescription: null,
    offerPriceNumber: null,
    projectDepartment: null,
    projectPermissions: null,
    projectGoals: null,
  };

  temp: any = [
    { id: 1, name_ar: 'اسم النشاط 1', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط 2', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط 3', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
  ];

  projectGoals: any = [
    {
      serial: 'adawd',
      requirements: 'adawd',
      name: 'adawd',
      duration: 'adawd',
      choose: true,
    },
    {
      serial: 'adawd',
      requirements: 'adawd',
      name: 'adawd',
      duration: 'adawd',
      choose: false,
    },
    {
      serial: 'adawd',
      requirements: 'adawd',
      name: 'adawd',
      duration: 'adawd',
      choose: false,
    },
  ];

  projectUsers: any = [
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      responsibility: 'adawd',
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      responsibility: 'adawd',
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      responsibility: 'adawd',
    },
  ];

  projectTasks: any = [
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      taskName: 'adawd',
      duration: 4,
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      taskName: 'adawd',
      duration: 4,
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      taskName: 'adawd',
      duration: 4,
    },
  ];

  startDate = new Date();
  endDate = new Date();
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource([{}]);
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.users = [
      { id: 1, Name: 'محمود نافع' },
      { id: 2, Name: 'محمود نافع' },
      { id: 3, Name: 'محمود نافع' },
      { id: 4, Name: 'محمود نافع' },
      { id: 5, Name: 'محمود نافع' },
      { id: 6, Name: 'محمود نافع' },
    ];

    this.projects = [
      {
        contractNumber: '000056',
        ContractDate: '2023-06-13',
        totalAfterTax: '2,300',
        customerName: 'أجل',
        ProjectNameDes: '2022-3',
        ProjectNumber: 'يوسف(VIP)',
        PaidAmount: 'تم الترحيل',
        RemainingAmount: '2023-06-13',
        progress: 50,
      },
      {
        contractNumber: '000056',
        ContractDate: '2023-06-13',
        totalAfterTax: '2,300',
        customerName: 'أجل',
        ProjectNameDes: '2022-3',
        ProjectNumber: 'يوسف(VIP)',
        PaidAmount: 'تم الترحيل',
        RemainingAmount: '2023-06-13',
        progress: 50,
      },
      {
        contractNumber: '000056',
        ContractDate: '2023-06-13',
        totalAfterTax: '2,300',
        customerName: 'أجل',
        ProjectNameDes: '2022-3',
        ProjectNumber: 'يوسف(VIP)',
        PaidAmount: 'تم الترحيل',
        RemainingAmount: '2023-06-13',
        progress: 50,
      },
      {
        contractNumber: '000056',
        ContractDate: '2023-06-13',
        totalAfterTax: '2,300',
        customerName: 'أجل',
        ProjectNameDes: '2022-3',
        ProjectNumber: 'يوسف(VIP)',
        PaidAmount: 'تم الترحيل',
        RemainingAmount: '2023-06-13',
        progress: 50,
      },
      {
        contractNumber: '000056',
        ContractDate: '2023-06-13',
        totalAfterTax: '2,300',
        customerName: 'أجل',
        ProjectNameDes: '2022-3',
        ProjectNumber: 'يوسف(VIP)',
        PaidAmount: 'تم الترحيل',
        RemainingAmount: '2023-06-13',
        progress: 50,
      },
    ];

    this.services = [
      {
        M: '000056',
        TeamWorkCategories: '2023-06-13',
        Specialization: '2,300',
        Number: '2022-3',
        Notes: 'يوسف(VIP)',
      },
      {
        M: '000056',
        TeamWorkCategories: '2023-06-13',
        Specialization: '2,300',
        Number: '2022-3',
        Notes: 'يوسف(VIP)',
      },
      {
        M: '000056',
        TeamWorkCategories: '2023-06-13',
        Specialization: '2,300',
        Number: '2022-3',
        Notes: 'يوسف(VIP)',
      },
      {
        M: '000056',
        TeamWorkCategories: '2023-06-13',
        Specialization: '2,300',
        Number: '2022-3',
        Notes: 'يوسف(VIP)',
      },
      {
        M: '000056',
        TeamWorkCategories: '2023-06-13',
        Specialization: '2,300',
        Number: '2022-3',
        Notes: 'يوسف(VIP)',
      },
    ];
    this.projectsDataSource = new MatTableDataSource(this.projects);
    this.servicesDataSource = new MatTableDataSource(this.services);

    this.userPermissionsDataSource = new MatTableDataSource(
      this.userPermissions
    );

    this.projectGoalsDataSource = new MatTableDataSource(this.projectGoals);

    this.projectUsersDataSource = new MatTableDataSource(this.projectUsers);

    this.projectTasksDataSource = new MatTableDataSource(this.projectTasks);

    this.servicesList = [
      {
        id: 10,
        name: 'awdawd',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 11,
        name: 'bsdvsv',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 12,
        name: 'gergerg',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 13,
        name: 'awdawd',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 14,
        name: 'dfbdfbf',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 15,
        name: 'zccszscz',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
    ];
  }

  ngAfterViewInit() {
    // this.open(this.smartModal, null, 'smartModal');
  }

  offerPriceChecked: any;

  offerServices: any = [];
  serviceListDataSource = new MatTableDataSource();

  servicesList: any;
  servicesListdisplayedColumns: string[] = ['name', 'price'];

  selectedServiceRow: any;

  serviceDetails: any;

  bands: any = [];
  participants: any = [];

  selectedDate: any;
  selectedDateType = DateType.Hijri;

  addProjectType = false;

  contractWithInstallments = false;

  installments: any = [
    {
      batchNumber: 'asdasd',
      BatchDate: 'asdasd',
      BatchDateHijri: 'asdasd',
      amount: 'asdasd',
      Tax: 'asdasd',
      total: 'asdasd',
    },
  ];

  open(content: any, data?: any, type?: any, index?: any) {
    if (data && type == 'contract') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'contract';
    }
    if (data && type == 'file') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'file';
    }
    if (data && type == 'newContract') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'newContract';
    }
    if (data && type == 'Installments') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'Installments';
    }

    if (data && type == 'ConsultantContract') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'ConsultantContract';
    }

    if (data && type == 'supervisionContract') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'supervisionContract';
    }

    if (data && type == 'designContract') {
      this.modalDetails = data;
      this.modalDetails['type'] = 'designContract';
    }

    if (type == 'serviceDetails' && data) {
      this.serviceDetails = data;
      this.serviceDetails['items'] = [
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
      ];
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type
          ? type == 'contract' || type == 'file' || type == 'contracts'
            ? 'md'
            : 'xl'
          : 'lg',
        centered: type ? (type == 'contracts' ? true : false) : true,
      })

      .result.then(
        (result) => {
          if (type == 'edit') {
            this.modalDetails = {
              projectNo: null,
              type: null,
              projectDuration: null,
              branch: null,
              center: null,
              from: null,
              to: null,
              projectType: null,
              subProjectDetails: null,
              walk: null,
              customer: null,
              buildingType: null,
              service: null,
              user: null,
              region: null,
              projectDescription: null,
              offerPriceNumber: null,
              projectDepartment: null,
              projectPermissions: null,
              projectGoals: null,
            };
            this.addProjectType = false;
            this.contractWithInstallments = false;
            this.participants = [];
            this.installments = [];
            this.bands = [];
            this.offerServices = [];
          }
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.addProjectType = false;
    this.contractWithInstallments = false;
    this.participants = [];
    this.installments = [];
    this.bands = [];
    this.offerServices = [];
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addProject() {}

  extend() {}
  skip() {}
  confirm() {}
  endProject() {}
  flagProject() {}
  unSaveProjectInTop() {}

  stopProject() {}
  addNewUserPermissions() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userPermissionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelectedUserPermissions(index: any) {
    // when click on row display data in row
    let data = this.userPermissions[index];
    this.selectedUserPermissions = data;
  }

  saveOption(data: any) {}

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.name_ar.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (this.table) {
      this.table!.offset = 0;
    }
  }

  selectGoalForProject(index: any) {}

  addNewMission() {}

  onSort(event: any) {
    // console.log(event);
  }
  // ############### send sms

  data: any = {
    type: '0',
    orgEmail: 'asdwd@dwa',
    numbers: {
      all: 0,
      citizens: 0,
      investor: 0,
      government: 0,
    },
    fileType: {
      NameAr: '',
      Id: '',
      NameEn: '',
    },
    files: [],
    clients: [],
    branches: [],
    cities: [],
    filesTypes: [],
  };
  modal?: BsModalRef;
  sendEMAIL(sms: any) {
    // console.log(sms);
    this.control.clear();
    this.modal?.hide();
  }

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
  public uploadedFiles: Array<File> = [];

  sendSMS(sms: any) {
    // console.log(sms);
    this.modal?.hide();
  }

  // selection in table

  selection = new SelectionModel<any>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.projectsDataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.projectsDataSource.data);
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

  existValue: any = false;

  // ###### contract

  public readonly uploadedFile: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );

  selectedItem: any;
  // +++++++++

  stage: any = [];

  addStage(index: any) {
    // console.log(index);

    this.stage?.push({
      Massage: index + 1,
      stage: '',
      description: '',
      BeginningPeriod: '',
      periodEnd: '',
    });
  }

  deleteEmployee(index: any) {
    this.stage?.splice(index, 1);
  }

  remeberOptions = [
    { ar: 'يومين', en: '2 days' },
    { ar: 'اسبوع', en: 'week' },
    { ar: 'شهر', en: 'month' },
  ];
  // 3 contracts

  FormGroup01 = this._formBuilder.group({
    contractNo: [''],
    // contractNo: ['', Validators.required],
    date: [''],
    dateHijri: [''],
    office: [''],
    represents: [''],
    as: [''],
    engineeringLicence: [''],
    IssuedOn: [''],
    customer: [''],
    project: [''],
    iDNumber: [''],
  });
  FormGroup02 = this._formBuilder.group({
    invoiceRegistered: [''],
    include_tax: [''],
    total_amount: [''],
    total_amount_text: [''],
  });

  FormGroup03 = this._formBuilder.group({
    DateLetter: [''],
    serviceDate: [''],
  });

  FormGroup04 = this._formBuilder.group({
    ProjectName: [''],
    // ProjectName: ['', Validators.required],
    projectLocation: [''],
    BriefNatureProject: [''],
    DurationContract: [''],
    ContractorName: [''],
    ContractDate: [''],
    maxCompensation: [''],
    periodCommitment: [''],
    consultantRepresent: [''],
    RepresentOwner: [''],
  });

  FormGroup07 = this._formBuilder.group({
    totalFees: [''],
  });

  ////
  firstFormGroup = this._formBuilder.group({
    contractNo: ['', Validators.required],
    date: [''],
    dateHijri: [''],
    office: [''],
    represents: [''],
    as: [''],
    customer: [''],
    project: [''],
    iDNumber: [''],
    check: [''],
    offerPrice: [''],
  });
  secondFormGroup = this._formBuilder.group({
    include_tax: [''],
  });
  thredFormGroup = this._formBuilder.group({
    DateLetter: ['', Validators.required],
    serviceDate: ['', Validators.required],
  });

  setOfferPriceChecked(event: any) {
    this.offerPriceChecked = event.target.checked;
  }

  addService(index: any) {
    // console.log(index);

    this.offerServices?.push({
      id: index + 1,
      name: '',
      unit: '',
      amount: 0,
      price: 0,
      vatTax: 0,
      taxes: 0,
    });
  }

  deleteService(index: any) {
    this.offerServices?.splice(index, 1);
  }

  addBand(index: any) {
    // console.log(index);

    this.bands?.push({
      clauseId: index + 1,
      clause: '',
    });
  }

  deleteBand(index: any) {
    this.bands?.splice(index, 1);
  }

  addParticipant(index: any) {
    // console.log(index);

    this.participants?.push({
      id: index + 1,
      employeeName: '',
      duration: '',
      percentage: '',
      salary: '',
      cost: '',
    });
  }

  deleteParticipant(index: any) {
    this.participants?.splice(index, 1);
  }

  addInstallments(data: any) {}

  addContract() {}

  applyFilterServiceList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.serviceListDataSource.filter = filterValue.trim().toLowerCase();
  }

  setServiceRowValue(index: any) {
    this.offerServices[this.selectedServiceRow] = this.servicesList[index];
  }
}
