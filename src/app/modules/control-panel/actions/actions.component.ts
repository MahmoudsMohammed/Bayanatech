import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/controlpanel',
    },
    sub: {
      ar: 'سجل احداث النظام ',
      en: ' System event log',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'movementHistory',
    'processStatus',
    'userName',
    'branch',
    'comments',
    'message',
    'functionName',
    'serviceName',
    'OperationSuccess',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  systemActions: any;

  today = new Date();

  backupDetails: any = false;

  movementTypes = [
    { en: 'all', ar: 'الكل' },
    { en: 'add', ar: 'اضافة' },
    { en: 'edit', ar: 'تعديل' },
    { en: 'delete', ar: 'حذف' },
  ];

  dateFilter: any = false;
  constructor() {
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

    this.systemActions = [
      {
        movementHistory: new Date(),
        processStatus: 'adawddw',
        userName: 'adawddw',
        branch: 'adawddw',
        comments: 'adawddw',
        message: 'adawddw',
        functionName: 'adawddw',
        serviceName: 'adawddw',
        OperationSuccess: true,
      },
      {
        movementHistory: new Date(),
        processStatus: 'adawddw',
        userName: 'adawddw',
        branch: 'adawddw',
        comments: 'adawddw',
        message: 'adawddw',
        functionName: 'adawddw',
        serviceName: 'adawddw',
        OperationSuccess: true,
      },
      {
        movementHistory: new Date(),
        processStatus: 'adawddw',
        userName: 'adawddw',
        branch: 'adawddw',
        comments: 'adawddw',
        message: 'adawddw',
        functionName: 'adawddw',
        serviceName: 'adawddw',
        OperationSuccess: true,
      },
      {
        movementHistory: new Date(),
        processStatus: 'adawddw',
        userName: 'adawddw',
        branch: 'adawddw',
        comments: 'adawddw',
        message: 'adawddw',
        functionName: 'adawddw',
        serviceName: 'adawddw',
        OperationSuccess: false,
      },
    ];

    this.dataSource = new MatTableDataSource(this.systemActions);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
