import { Component } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-attendance-and-departure-of-employees',
  templateUrl: './attendance-and-departure-of-employees.component.html',
  styleUrls: ['./attendance-and-departure-of-employees.component.scss'],
})
export class AttendanceAndDepartureOfEmployeesComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'الحضور بالبصمة',
      en: 'Attendance and departure of employees',
    },
  };
  data: any = {
    fingerAttendence: [],
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
        this.data.fingerAttendence = data.fingerAttendence;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
