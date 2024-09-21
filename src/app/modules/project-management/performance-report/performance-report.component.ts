import { Component } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.scss'],
})
export class PerformanceReportComponent {
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/customers',
    },
    sub: {
      ar: 'تقرير الاداء الشامل',
      en: 'Comprehensive Performance Report',
    },
  };

  displayedColumns: string[] = [
    'projectNumber',
    'projectStart',
    'projectEnd',
    'projectType',
    'subProjectType',
    'percentage',
    'projectPeriod',
    'projectDescription',
  ];
  data: any = {
    reports: [],
    filter: {
      enable: false,
      date: null,
    },
  };
  constructor(private api: RestApiService) {
    this.getData();
  }
  getData() {
    this.api.get('../../../../assets/projectManegment.json').subscribe({
      next: (data: any) => {
        // assign data to table
        // console.log(data);
        this.data.reports = data.reports;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
