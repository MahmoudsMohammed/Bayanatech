import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-general-alert',
  templateUrl: './general-alert.component.html',
  styleUrls: ['./general-alert.component.scss'],
})
export class GeneralAlertComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'التنبيهات والتعاميم',
      en: 'General Alerts',
    },
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any = {
    alerts: new MatTableDataSource([{}]),
  };

  displayedColumns: string[] = [
    'Name',
    'Date',
    'SendUserName',
    'Description',
    'operations',
    'IsRead',
  ];
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
  }

  getData() {
    this.api.get('../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.alerts = new MatTableDataSource(data.alerts);
        this.data.alerts.paginator = this.paginator;
        this.data.alerts.sort = this.sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  open(content: any, data?: any, type?: any) {
    if (data && type == 'edit') {
      // this.modalDetails = data;
      // this.modalDetails['id'] = 1;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: type ? false : true,
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
  applyFilter(event: Event) {}
}
