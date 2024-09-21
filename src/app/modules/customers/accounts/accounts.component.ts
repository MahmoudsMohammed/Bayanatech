import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: any = {
    main: {
      name: {
        ar: 'العملاء',
        en: 'Customers',
      },
      link: '/customers',
    },
    sub: {
      ar: 'كشف حساب عميل',
      en: 'Account statement',
    },
  };
  select: any = {
    selected: null,
    mobileSelect: [],
    mailSelect: [],
  };
  data: any = {
    selected: null,
    filter: {
      enable: false,
      date: new MatTableDataSource([{}]),
    },
    // mobileSelect: [],
    data: [],
  };
  displayedColumns: string[] = [
    'date',
    'statement',
    'due_date',
    'Debit',
    'Credit',
    'Balance',
    'Type',
    'Constraint_No',
    'Cost_Center',
  ];
  constructor(private api: RestApiService) {
    this.getSelect();
    this.getData();
  }
  getSelect() {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        // get select
        this.select = {
          selected: null,

          mobileSelect: data.customersSelect1,
          mailSelect: data.customersSelect2,
        };
      },
    });
  }
  getData() {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        // get select
        this.data.data = new MatTableDataSource(data.statments);
        this.data.data.paginator = this.paginator; // this.data.data = data.statments;
      },
    });
  }
  getCustomersAccount(data: any) {}
}
