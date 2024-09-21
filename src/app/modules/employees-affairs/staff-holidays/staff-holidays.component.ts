import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-staff-holidays',
  templateUrl: './staff-holidays.component.html',
  styleUrls: ['./staff-holidays.component.scss'],
})
export class StaffHolidaysComponent implements OnInit {
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
      ar: 'الإجازات',
      en: 'Vacations',
    },
  };

  showDate = false;

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'employeName',
    'vacationType',
    'vacationStatus',
    'manager',
    'Reasons for the decision',
    'from',
    'to',
    'deductionFromSalary',
    'amount',
    'operations',
  ];

  dataSource: MatTableDataSource<any>;
  dataSourceWaitingVacation: MatTableDataSource<any>;
  dataSourceAcceptingVacation: MatTableDataSource<any>;

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalDetails: any = {
    id: null,
    employeeName: null,
    vacationType: null,
    date: null,
    from: null,
    to: null,
    discound: null,
    file: null,
  };

  vacations: any;
  waitingVacation: any;
  acceptingVacation: any;

  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource([{}]);
    this.dataSourceWaitingVacation = new MatTableDataSource([{}]);
    this.dataSourceAcceptingVacation = new MatTableDataSource([{}]);

    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
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

    this.vacations = [
      {
        employeName: 'dvfrsf',
        vacationType: 'dvfrsf',
        vacationStatus: 'dvfrsf',
        manager: 'dvfrsf',
        reason: 'adawd awdawd',
        from: new Date(),
        to: new Date(),
        deductionFromSalary: 'sadnasd',
        amount: 200,
      },
      {
        employeName: 'dvfrsf',
        vacationType: 'dvfrsf',
        vacationStatus: 'dvfrsf',
        manager: 'dvfrsf',
        reason: 'adawd awdawd',
        from: new Date(),
        to: new Date(),
        deductionFromSalary: 'sadnasd',
        amount: 200,
      },
      {
        employeName: 'dvfrsf',
        vacationType: 'dvfrsf',
        vacationStatus: 'dvfrsf',
        manager: 'dvfrsf',
        reason: 'adawd awdawd',
        from: new Date(),
        to: new Date(),
        deductionFromSalary: 'sadnasd',
        amount: 200,
      },
      {
        employeName: 'dvfrsf',
        vacationType: 'dvfrsf',
        vacationStatus: 'dvfrsf',
        manager: 'dvfrsf',
        reason: 'adawd awdawd',
        from: new Date(),
        to: new Date(),
        deductionFromSalary: 'sadnasd',
        amount: 200,
      },
    ];
    this.dataSource = new MatTableDataSource(this.vacations);

    this.waitingVacation = [
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: 'cacmaca',
        discoundType: 'vamvkma',
        startDate: new Date(),
        duration: 'ackas',
        dicesion: 'cascasmc',
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: 'cacmaca',
        discoundType: 'vamvkma',
        startDate: new Date(),
        duration: 'ackas',
        dicesion: 'cascasmc',
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: 'cacmaca',
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
        vacationType: 'cacmaca',
        discoundType: 'vamvkma',
        duration: 'ackas',
        endDate: new Date(),
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: 'cacmaca',
        discoundType: 'vamvkma',
        duration: 'ackas',
        endDate: new Date(),
      },
      {
        date: new Date(),
        employeeName: 'addvkmam',
        vacationType: 'cacmaca',
        discoundType: 'vamvkma',
        duration: 'ackas',
        endDate: new Date(),
      },
    ];
    this.dataSourceAcceptingVacation = new MatTableDataSource(
      this.acceptingVacation
    );
  }

  withReason = false;
  open(content: any, data?: any, type?: any, info?: any) {
    if (data && type == 'edit') {
      this.modalDetails = data;
      this.modalDetails['id'] = '1';
    }

    if (info) {
      this.withReason = true;
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
      employeeName: null,
      vacationType: null,
      date: null,
      from: null,
      to: null,
      discound: null,
      file: null,
    };

    this.control.clear();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // delete
  confirm() {}

  EditVacationRequest() {
    // console.log(this.modalDetails);
  }
  AddVacationRequest() {
    // console.log(this.modalDetails);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // upload img ]
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
      FileUploadValidators.accept(['image/*']),
      FileUploadValidators.filesLimit(1),
    ]
  );
  private subscription?: Subscription;

  private getImage(file: File): void {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e: any) => this.uploadedFile.next(e.target.result);
      fr.readAsDataURL(file);
    } else {
      this.uploadedFile.next('');
    }
  }
}
