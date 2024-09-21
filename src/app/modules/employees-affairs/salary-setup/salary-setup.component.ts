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
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-salary-setup',
  templateUrl: './salary-setup.component.html',
  styleUrls: ['./salary-setup.component.scss'],
})
export class SalarySetupComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  showBranches: any = false;

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
      ar: 'اعداد المسير الشهري',
      en: 'Salary Setup',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'select',
    'employeName',
    'salary',
    'Allowances',
    'bounes',
    'rewards',
    'imprest',
    'discounts',
    'Insurances',
    'absence',
    'deductedSalary',
    'net',
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
    AllowancesNumber: null,
    from: null,
    details: null,
  };

  salaries: any;
  waitingImprests: any;
  acceptingImprests: any;

  employeeAllowances: any;

  employeeDisscount: any;

  employeeAlloans: any;

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

    this.salaries = [
      {
        employeName: 'dvfrsf',
        salary: 10,
        Allowances: 0,
        bounes: 10,
        rewards: 10,
        imprest: 15,
        discounts: 15,
        Insurances: 15,
        absence: 15,
        deductedSalary: 2,
        net: 15,
        status: 1,
      },
      {
        employeName: 'dvfrsf',
        salary: 10,
        Allowances: 0,
        bounes: 10,
        rewards: 10,
        imprest: 15,
        discounts: 15,
        Insurances: 15,
        absence: 15,
        deductedSalary: 2,
        net: 15,
        status: 0,
      },
      {
        employeName: 'dvfrsf',
        salary: 10,
        Allowances: 0,
        bounes: 10,
        rewards: 10,
        imprest: 15,
        discounts: 15,
        Insurances: 15,
        absence: 15,
        deductedSalary: 2,
        net: 15,
        status: 1,
      },
      {
        employeName: 'dvfrsf',
        salary: 10,
        Allowances: 0,
        bounes: 10,
        rewards: 10,
        imprest: 15,
        discounts: 15,
        Insurances: 15,
        absence: 15,
        deductedSalary: 2,
        net: 15,
        status: 0,
      },
      {
        employeName: 'dvfrsf',
        salary: 10,
        Allowances: 0,
        bounes: 10,
        rewards: 10,
        imprest: 15,
        discounts: 15,
        Insurances: 15,
        absence: 15,
        deductedSalary: 2,
        net: 15,
        status: 1,
      },
    ];
    this.dataSource = new MatTableDataSource(this.salaries);

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

    this.employeeAllowances = [
      {
        AllowanceAmount: 16451,
        AllowanceMonthNo: 'adwaw',
        AllowanceTypeName: 'awdawd',
      },
    ];
    this.employeeDisscount = [
      { DiscountRewardName: 'sadda', MonthNo: 'sadda', Amount: 5151 },
    ];
    this.employeeAlloans = [
      { Date: new Date(), MonthNo: 'awfdawf', Amount: 5574 },
    ];
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
      AllowancesNumber: null,
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

  selection = new SelectionModel<any>(true, []);
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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
