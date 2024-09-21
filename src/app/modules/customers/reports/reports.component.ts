import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  constructor(private api: RestApiService) {
    this.getData();
  }
  title: any = {
    main: {
      name: {
        ar: 'العملاء',
        en: 'Customers',
      },
      link: '/customers',
    },
    sub: {
      ar: 'تقارير العملاء',
      en: 'Reports and statistics',
    },
  };
  data: any = {
    selected: null,
    filter: {
      enable: false,
      date: null,
    },
    // mobileSelect: [],
    customers: [],
  };
  displayedColumns: any[] = [
    'name',
    'type',
    'idNo',
    'email',
    'phone',
    'mobile',
    'accountNo',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('MatSort1') sort!: MatSort;

  getData() {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        // get data
        this.dataSource = new MatTableDataSource(data.customersReports);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        // console.log(this.data.customers);
      },
    });
  }
  getCustomersAccount(event: any) {}
}
