import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-not-logged-out',
  templateUrl: './not-logged-out.component.html',
  styleUrls: ['./not-logged-out.component.scss'],
})
export class NotLoggedOutComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'لم يسجلوا الخروج',
      en: 'Not logged out',
    },
  };

  data: any = {
    notLoggedOut: [],
    filter: {
      enable: false,
      date: null,
    },
  };
  constructor(private api: RestApiService) {
    this.getData();
  }

  getData() {
    this.api.get('../../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.notLoggedOut = data.notLoggedOut;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
