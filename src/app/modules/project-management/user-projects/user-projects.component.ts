import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
})
export class UserProjectsComponent {
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
      ar: 'مشاريع المستخدم',
      en: 'User Projects',
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
    userProjects: new MatTableDataSource([{}]),
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

        this.data.userProjects = new MatTableDataSource(data.userProjects);
        this.data.userProjects.paginator = this.paginator;
        this.data.userProjects.sort = this.sort;
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
