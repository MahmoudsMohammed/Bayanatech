import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-staffcontracts',
  templateUrl: './staffcontracts.component.html',
  styleUrls: ['./staffcontracts.component.scss'],
})
export class StaffcontractsComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  rows = [
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
  ];
  temp: any = [
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
  ];

  isEditable: any = {};

  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'عقود الموظفين',
      en: 'employee contracts',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'contractNo',
    'employeeNo',
    'employeName',
    'nationality',
    'branch',
    'startDate',
    'endDate',
    'liveDate',
    'operations',
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalDetails: any = {
    id: null,
    contractNo: null,
    officeName: null,
    officeUser: null,
    userJob: null,
    employeeName: null,
    employeeJob: null,
    contractType: null,
    duration: null,
    from: null,
    to: null,
    testDays: null,
    hoursInWeek: null,
    hoursInDay: null,
    daysInWeek: null,
    holidays: null,
    salaryType: null,
    basicSalary: null,
    housingAllowance: null,
    dailySalary: null,
    contractBands: null,
    limitCompetition: null,
    nonDisclosureSecrets: null,
    locating: null,
    regardingWork: null,
    noticeContractTermination: null,
    contractCompensation: null,
    compensation: null,
    firstCompensation: null,
    secondCompensation: null,
  };

  contracts: any;

  contractType: any;
  testDuration: any;

  officeEmployeeInfo = this._formBuilder.group({
    contractNo: ['', [Validators.required]],
    officeName: ['', [Validators.required]],
    officeUser: ['', [Validators.required]],
    userJob: ['', [Validators.required]],
    employeeName: ['', [Validators.required]],
    employeeJob: ['', [Validators.required]],
  });

  contractSubject = this._formBuilder.group({
    contractType: ['', [Validators.required]],
    duration: [''],
    from: [''],
    to: [''],
    testDays: [''],
  });

  workDaysHours = this._formBuilder.group({
    hoursInWeek: ['', [Validators.required]],
    hoursInDay: ['', [Validators.required]],
    daysInWeek: ['', [Validators.required]],
  });

  firstObligations = this._formBuilder.group({
    holidays: [''],
    salaryType: [''],
    basicSalary: [''],
    housingAllowance: [''],
    dailySalary: [''],
    contractBands: [''],
  });

  bands: any = [];

  compatationValue: any;
  nonDisclosureSecretsValue: any;
  secondObligations = this._formBuilder.group({
    limitCompetition: [''],
    nonDisclosureSecrets: [''],
    locating: [''],
    duration: [''],
    regardingWork: [''],
  });

  terminateContract = this._formBuilder.group({
    noticeContractTermination: [''],
    contractCompensation: [''],
    compensation: [''],
    firstCompensation: [''],
    secondCompensation: [''],
  });

  isEditableStepper = true;

  comationType: any;
  terminateValues = [
    { title: { ar: '٣٠ يوم', en: '30 days' }, value: '30 days' },
    { title: { ar: '٦٠ يوم', en: '60 days' }, value: '60 days' },
    { title: { ar: '٩٠ يوم', en: '90 days' }, value: '90 days' },
    { title: { ar: '١٢٠ يوم', en: '120 days' }, value: '120 days' },
  ];
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource([{}]);
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

    this.contracts = [
      {
        contractNo: 'dvfrsf',
        employeeNo: 'dvfrsf',
        employeName: 'dvfrsf',
        nationality: 'dvfrsf',
        branch: 'dvfrsf',
        startDate: new Date(),
        endDate: new Date(),
        liveDate: new Date(),
      },
      {
        contractNo: 'dvfrsf',
        employeeNo: 'dvfrsf',
        employeName: 'dvfrsf',
        nationality: 'dvfrsf',
        branch: 'dvfrsf',
        startDate: new Date(),
        endDate: new Date(),
        liveDate: new Date(),
      },
      {
        contractNo: 'dvfrsf',
        employeeNo: 'dvfrsf',
        employeName: 'dvfrsf',
        nationality: 'dvfrsf',
        branch: 'dvfrsf',
        startDate: new Date(),
        endDate: new Date(),
        liveDate: new Date(),
      },
      {
        contractNo: 'dvfrsf',
        employeeNo: 'dvfrsf',
        employeName: 'dvfrsf',
        nationality: 'dvfrsf',
        branch: 'dvfrsf',
        startDate: new Date(),
        endDate: new Date(),
        liveDate: new Date(),
      },
    ];
    this.dataSource = new MatTableDataSource(this.contracts);
  }

  // fullscreen: type == 'add' || type == 'edit' ? true : false,

  open(content: any, data?: any, type?: any, index?: any) {
    if (data && type == 'edit') {
      this.modalDetails = data;
      this.modalDetails['id'] = '1';
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.modalDetails = {
      id: null,
      contractNo: null,
      officeName: null,
      officeUser: null,
      userJob: null,
      employeeName: null,
      employeeJob: null,
      contractType: null,
      duration: null,
      from: null,
      to: null,
      testDays: null,
      hoursInWeek: null,
      hoursInDay: null,
      daysInWeek: null,
      holidays: null,
      salaryType: null,
      basicSalary: null,
      housingAllowance: null,
      dailySalary: null,
      contractBands: null,
      limitCompetition: null,
      nonDisclosureSecrets: null,
      locating: null,
      regardingWork: null,
      noticeContractTermination: null,
      contractCompensation: null,
      compensation: null,
      firstCompensation: null,
      secondCompensation: null,
    };

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  print() {}

  // delete
  confirm() {}
  EditContract() {
    // console.log(
    //   this.officeEmployeeInfo,
    //   this.contractSubject,
    //   this.workDaysHours,
    //   this.firstObligations,
    //   this.bands,
    //   this.secondObligations,
    //   this.terminateContract
    // );
  }
  AddContract() {
    // console.log(
    //   this.officeEmployeeInfo,
    //   this.contractSubject,
    //   this.workDaysHours,
    //   this.firstObligations,
    //   this.bands,
    //   this.secondObligations,
    //   this.terminateContract
    // );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  startJob(data: any) {
    // console.log(data);
  }

  endEmployeeServices(data: any) {
    // console.log(data);
  }

  saveOption(data: any) {}

  // Save row
  save(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    // console.log('Row saved: ' + rowIndex);
    // console.log(row);
  }

  // Delete row
  delete(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    this.rows.splice(rowIndex, 1);
    // console.log('Row deleted: ' + rowIndex);
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.reason.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;

    if (this.table) {
      this.table!.offset = 0;
    }
  }
}
