import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
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
      ar: 'متابعة التحصيل',
      en: 'Collection Follow-up',
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
      date: null,
    },
    // mobileSelect: [],
    data: new MatTableDataSource([{}]),
  };
  displayedColumns: string[] = ['name', 'mobile', 'total', 'paid', 'remain'];
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

        this.data.data = new MatTableDataSource(data.collections);
        this.data.data.paginator = this.paginator;
        this.data.data.sort = this.sort;
      },
    });
  }
  getCustomersAccount(data: any) {}
}
