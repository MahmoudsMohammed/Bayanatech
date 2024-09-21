import { Component } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-absentee-staff',
  templateUrl: './absentee-staff.component.html',
  styleUrls: ['./absentee-staff.component.scss'],
})
export class AbsenteeStaffComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: '  الموظفون الغائبون ',
      en: ' Absentee Staff ',
    },
  };

  data: any = {
    absence: [],
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
        this.data.absence = data.absence;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
