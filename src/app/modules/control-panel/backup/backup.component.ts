import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss'],
})
export class BackupComponent {
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/controlpanel',
    },
    sub: {
      ar: 'النسخ الاحتياطي ',
      en: ' Create a backup',
    },
  };
  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'backupId',
    'date',
    'user',
    'size',
    'operations',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  backups: any;

  formGroup = this.fb.group({});

  today = new Date();

  backupDetails: any = false;

  remeberOptions = [
    { ar: 'يومين', en: '2 days' },
    { ar: 'اسبوع', en: 'week' },
    { ar: 'شهر', en: 'month' },
  ];
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
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

    this.backups = [
      {
        backupId: 1684684,
        date: new Date(),
        user: 'dvfrsf',
        size: '10mb',
      },
      {
        backupId: 1684684,
        date: new Date(),
        user: 'dvfrsf',
        size: '10mb',
      },
      {
        backupId: 1684684,
        date: new Date(),
        user: 'dvfrsf',
        size: '10mb',
      },
    ];

    this.dataSource = new MatTableDataSource(this.backups);
  }

  open(content: any, data?: any, type?: any, info?: any) {
    if (data && type == 'details') {
      this.backupDetails = true;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: true,
      })
      .result.then(
        (result) => {
          this.backupDetails = false;

          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.backupDetails = false;

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  employees: any = [];
  addEmployee(index: any) {
    // console.log(this.employees, index);

    this.employees?.push({
      name: '',
      email: '',
      phone: '',
      time: '',
    });
  }

  deleteEmployee(index: any) {
    this.employees?.splice(index, 1);
  }

  downloadBackup() {}
  doBackUp() {}
  confirm() {}
}
