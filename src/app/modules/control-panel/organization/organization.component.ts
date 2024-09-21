import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RestApiService } from 'src/app/shared/services/api.service';
import { TreeMode } from 'tree-ngx';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/controlpanel',
    },
    sub: {
      ar: 'تجهيز بيانات المنشأة',
      en: 'Building Data',
    },
  };

  closeResult: any;

  selectedUser: any;
  users: any;

  isEditable: any = {};

  rows = [
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
  private subscription?: Subscription;

  displayedColumns: string[] = [
    'Name',
    'CommercialRegister',
    'CommerialRegistration',
    'city/region',
    'coins',
    'operations',
  ];
  staffTimeDisplayedColumns: string[] = [
    'NameAr',
    'NameEn',
    'notes',
    'operations',
  ];
  vacationDisplayedColumns: string[] = ['name', 'from', 'to', 'operations'];

  shifftsDisplayedColumns: string[] = [
    'day',
    'from',
    'to',
    'secondFrom',
    'secondTo',
    'operations',
  ];

  contentDisplayedColumns: string[] = [
    'name',
    'address',
    'mobile',
    'customerService',
    'email',
    'operations',
  ];

  newsDisplayedColumns: string[] = ['nameAr', 'nameEn', 'operations'];

  dataSource: MatTableDataSource<any>;

  staffTimeDataSource: MatTableDataSource<any>;

  vacationsDataSource: MatTableDataSource<any>;
  shifftsDataSource: MatTableDataSource<any>;
  contentDataSource: MatTableDataSource<any>;
  newsDataSource: MatTableDataSource<any>;

  staffTimes: any = [];

  staffts: any = [];

  vacations: any = [];

  contents: any = [];

  news: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('optToggleActivationModal') optToggleActivationModal: any;

  branches: any;
  nodeItems: any = [];
  selectedTask1: any;
  options = {
    mode: TreeMode.MultiSelect,
    checkboxes: true,
    alwaysEmitSelected: false,
  };
  today = new Date();
  constructor(
    private modalService: NgbModal,
    private api: RestApiService,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource([{}]);
    this.staffTimeDataSource = new MatTableDataSource([{}]);
    this.vacationsDataSource = new MatTableDataSource([{}]);
    this.shifftsDataSource = new MatTableDataSource([{}]);
    this.contentDataSource = new MatTableDataSource([{}]);
    this.newsDataSource = new MatTableDataSource([{}]);

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

    this.branches = [
      {
        Name: 'awdawd',
        CommercialRegister: 46486468,
        CommerialRegistration: 46486468,
        location: 'awdawdwd',
        coins: 'awdawd',
      },
      {
        Name: 'awdawd',
        CommercialRegister: 46486468,
        CommerialRegistration: 46486468,
        location: 'awdawdwd',
        coins: 'awdawd',
      },
      {
        Name: 'awdawd',
        CommercialRegister: 46486468,
        CommerialRegistration: 46486468,
        location: 'awdawdwd',
        coins: 'awdawd',
      },
    ];

    this.dataSource = new MatTableDataSource(this.branches);
    this.getData();

    this.staffTimes = [
      { NameAr: 'awdwadwdw', NameEn: 'awdwadwdw', notes: 'awdwadwdw' },
      { NameAr: 'awdwadwdw', NameEn: 'awdwadwdw', notes: 'awdwadwdw' },
      { NameAr: 'awdwadwdw', NameEn: 'awdwadwdw', notes: 'awdwadwdw' },
      { NameAr: 'awdwadwdw', NameEn: 'awdwadwdw', notes: 'awdwadwdw' },
    ];
    this.staffTimeDataSource = new MatTableDataSource(this.staffTimes);

    this.vacations = [
      {
        name: 'adwdawd',
        from: new Date(),
        to: new Date(),
      },
      {
        name: 'adwdawd',
        from: new Date(),
        to: new Date(),
      },
      {
        name: 'adwdawd',
        from: new Date(),
        to: new Date(),
      },
      {
        name: 'adwdawd',
        from: new Date(),
        to: new Date(),
      },
      {
        name: 'adwdawd',
        from: new Date(),
        to: new Date(),
      },
    ];
    this.vacationsDataSource = new MatTableDataSource(this.vacations);

    this.staffts = [
      {
        day: 'adwawd',
        from: new Date(),
        to: new Date(),
        secondFrom: new Date(),
        secondTo: new Date(),
      },
      {
        day: 'adwawd',
        from: new Date(),
        to: new Date(),
        secondFrom: new Date(),
        secondTo: new Date(),
      },
      {
        day: 'adwawd',
        from: new Date(),
        to: new Date(),
        secondFrom: new Date(),
        secondTo: new Date(),
      },
      {
        day: 'adwawd',
        from: new Date(),
        to: new Date(),
        secondFrom: new Date(),
        secondTo: new Date(),
      },
    ];
    this.shifftsDataSource = new MatTableDataSource(this.staffts);

    this.contents = [
      {
        name: 'adawdawd',
        address: 'adawdawd',
        mobile: 'adawdawd',
        customerService: 'adawdawd',
        email: 'adawdawd',
      },
      {
        name: 'adawdawd',
        address: 'adawdawd',
        mobile: 'adawdawd',
        customerService: 'adawdawd',
        email: 'adawdawd',
      },
      {
        name: 'adawdawd',
        address: 'adawdawd',
        mobile: 'adawdawd',
        customerService: 'adawdawd',
        email: 'adawdawd',
      },
    ];
    this.contentDataSource = new MatTableDataSource(this.contents);

    this.news = [
      { nameAr: 'asdadwd', nameEn: 'asdadwd' },
      { nameAr: 'asdadwd', nameEn: 'asdadwd' },
      { nameAr: 'asdadwd', nameEn: 'asdadwd' },
      { nameAr: 'asdadwd', nameEn: 'asdadwd' },
      { nameAr: 'asdadwd', nameEn: 'asdadwd' },
    ];
    this.newsDataSource = new MatTableDataSource(this.news);
  }

  getData() {
    this.api.get('../../../../../../assets/cpanel.json').subscribe({
      next: (data: any) => {
        this.nodeItems = data.tree;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  open(content: any, data?: any, type?: any, info?: any) {
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
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.name_ar.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;

    if (this.table) {
      this.table!.offset = 0;
    }
  }

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

  private getImage(file: File): void {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e: any) => this.uploadedFile.next(e.target.result);
      fr.readAsDataURL(file);
    } else {
      this.uploadedFile.next('');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterStaffTime(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.staffTimeDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterShiffts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.shifftsDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyContentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contentDataSource.filter = filterValue.trim().toLowerCase();
  }

  setEmailSetting(data: any) {}

  saveOption(data: any) {}

  saveMainInfo(data: any) {}

  setSetting(data: any) {}

  saveVacation(data: any) {}

  addStaffTime(data: any) {}

  saveSetting(data: any) {}

  otp = this.fb.control('');

  openModal(Value: any) {
    if (Value) {
      this.modalService.open(this.optToggleActivationModal);
    }
  }

  confiremOtp() {
    // console.log(this.otp?.value);
  }

  addBranch(Data: any) {}

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
