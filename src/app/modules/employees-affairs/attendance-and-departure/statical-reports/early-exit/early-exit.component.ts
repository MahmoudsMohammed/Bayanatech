import { Component } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-early-exit',
  templateUrl: './early-exit.component.html',
  styleUrls: ['./early-exit.component.scss'],
})
export class EarlyExitComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'الخروج المبكر',
      en: 'Early exit',
    },
  };

  data: any = {
    earlyExite: [],
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
        this.data.earlyExite = data.earlyExite;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
