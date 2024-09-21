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
  selector: 'app-employee-loan',
  templateUrl: './employee-loan.component.html',
  styleUrls: ['./employee-loan.component.scss'],
})
export class EmployeeLoanComponent implements OnInit {
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
      ar: 'السلف',
      en: 'Imprest',
    },
  };

  showDate = false;

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'employeName',
    'imprestDate',
    'imprestStatus',
    'manager',
    'Reasons for the decision',
    'installmentMonths',
    'startingMonth',
    'operations',
  ];

  dataSource: MatTableDataSource<any>;
  dataSourceWaitingImprest: MatTableDataSource<any>;
  dataSourceAcceptingImprest: MatTableDataSource<any>;

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalDetails: any = {
    id: null,
    date: null,
    amound: null,
    installmentsNumber: null,
    from: null,
    details: null,
  };

  imprests: any;
  waitingImprests: any;
  acceptingImprests: any;

  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource([{}]);
    this.dataSourceWaitingImprest = new MatTableDataSource([{}]);
    this.dataSourceAcceptingImprest = new MatTableDataSource([{}]);

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

    this.imprests = [
      {
        employeName: 'dvfrsf',
        imprestDate: new Date(),
        imprestStatus: 0,
        reason:'awdaw awdawd',
        manager: 'dvfrsf',
        installmentMonths: 'dvfrsf',
        startingMonth: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        imprestDate: new Date(),
        imprestStatus: 1,
        reason:'awdaw awdawd',
        manager: 'dvfrsf',
        installmentMonths: 'dvfrsf',
        startingMonth: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        imprestDate: new Date(),
        imprestStatus: 1,
        reason:'awdaw awdawd',
        manager: 'dvfrsf',
        installmentMonths: 'dvfrsf',
        startingMonth: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        imprestDate: new Date(),
        imprestStatus: 0,
        reason:'awdaw awdawd',
        manager: 'dvfrsf',
        installmentMonths: 'dvfrsf',
        startingMonth: 'asdad',
      },
    ];
    this.dataSource = new MatTableDataSource(this.imprests);

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
        imprestStatus: 'cacmaca',
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
  }

  withReason = false;
  open(content: any, data?: any, type?: any, info?: any) {
    if (data && type == 'edit') {
      // console.log('asdd');

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
      date: null,
      amound: null,
      installmentsNumber: null,
      from: null,
      details: null,
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

  EditImprestRequest() {
    // console.log(this.modalDetails);
  }
  AddImprestRequest() {
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
