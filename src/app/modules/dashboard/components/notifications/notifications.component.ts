import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  @ViewChild(MatPaginator) notifications_paginator!: MatPaginator;
  @ViewChild(MatSort) notifications_sort!: MatSort;
  @ViewChild(MatPaginator) issued_paginator!: MatPaginator;
  @ViewChild(MatSort) issued_sort!: MatSort;
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/dash/notifications',
    },
    sub: {
      ar: 'الاشعارات',
      en: 'Notifications',
    },
  };

  NotificationOnProject: any = false;

  lang: any;
  projectDetails: any = {
    projectNo: 'zxvzxv',
    customer: 'fefwqf',
    projectType: 'fefwqf',
    projectName: 'fefwqf',
    subProjectType: 'fefwqf',
    stage: 'fefwqf',
    subStage: 'fefwqf',
    user: 'fefwqf',
    Region: 'fefwqf',
    contractNumber: 'fefwqf',
    projectDuration: 'fefwqf',
    status: 2,
    progress: 50,
  };
  data: any = {
    notifications: new MatTableDataSource([{}]),
    issued: new MatTableDataSource([{}]),
  };
  columns: any = {
    notifications: [
      'select',
      'SendUserName',
      'Description',
      'Date',
      'ProjectNo',
      'operations',
    ],
    issued: [
      'select',
      'Description',
      'ReceivedUserName',
      'Date',
      'IsRead',
      'ProjectNo',
      'operations',
    ],
  };
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
    api.lang.subscribe((res) => {
      if (res) {
        this.lang = res;
      } else {
        this.lang = 'ar';
      }
    });
  }
  getData() {
    this.api.get('../../../../../../assets/dropMenu.json').subscribe({
      next: (data: any) => {
        // assign notifications to table
        this.data.notifications = new MatTableDataSource(data.notifications);
        this.data.notifications.paginator = this.notifications_paginator;
        this.data.notifications.sort = this.notifications_sort;
        // assign notifications data to table
        this.data.issued = new MatTableDataSource(data.issued);
        this.data.issued.paginator = this.issued_paginator;
        this.data.issued.sort = this.issued_sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  open(content: any, data: any, size: any, positions?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: size,
        centered: !positions ? true : false,
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

  selection = {
    notifications: new SelectionModel<any>(true, []),
    issued: new SelectionModel<any>(true, []),
  };
  /** Whether the number of selected elements matches the total number of  */
  isAllSelected() {
    const numSelected = this.selection.notifications.selected.length;
    const numRows = this.data.notifications.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.notifications.clear();
      return;
    }

    this.selection.notifications.select(...this.data.notifications.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.notifications.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  //
  //
  //

  /** Whether the number of selected elements matches the total number of  */
  isAllSelectedPro() {
    const numSelected = this.selection.issued.selected.length;
    const numRows = this.data.issued.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRowsPro() {
    if (this.isAllSelectedPro()) {
      this.selection.issued.clear();
      return;
    }

    this.selection.issued.select(...this.data.issued.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabelPro(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedPro() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.issued.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  setNotificationOnProject(event: any) {
    this.NotificationOnProject = event?.checked;
  }

  showOptions: boolean = false;
  showAction(element: any) {
    let item: any = this.data?.notifications?.filteredData?.find(
      (not: any) => not?.NotificationId == element?.NotificationId
    );

    item['showOptions'] = true;

    this.showOptions = true;
  }
}
