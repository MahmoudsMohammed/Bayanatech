import { Component } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-late-today',
  templateUrl: './late-today.component.html',
  styleUrls: ['./late-today.component.scss'],
})
export class LateTodayComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'المتأخرون اليوم',
      en: 'Late today',
    },
  };

  data: any = {
    lateEmployee: [],
  };
  constructor(private api: RestApiService) {
    this.getData();
  }

  getData() {
    this.api.get('../../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.lateEmployee = data.lateEmployee;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
