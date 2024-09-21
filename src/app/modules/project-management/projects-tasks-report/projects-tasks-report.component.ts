import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-projects-tasks-report',
  templateUrl: './projects-tasks-report.component.html',
  styleUrls: ['./projects-tasks-report.component.scss'],
})
export class ProjectsTasksReportComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/customers',
    },
    sub: {
      ar: 'مهام المشروع',
      en: 'Project Task',
    },
  };

  displayedColumns: string[] = [
    'name',
    'projectNumber',
    'projectType',
    'subProjectType',
    'projectName',
    'userName',
    'taskStart',
    'taskEnd',
  ];
  data: any = {
    tasks: new MatTableDataSource([{}]),
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
        this.data.tasks = new MatTableDataSource(data.tasks);
        this.data.tasks.paginator = this.paginator;
        this.data.tasks.sort = this.sort;
        // this.data.cities = data.cities;
        // this.data.clients = data.users;
        // this.data.branches = data.branches;
        // this.data.filesTypes = data.filesTypes;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
