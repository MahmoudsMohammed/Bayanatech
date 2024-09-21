import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fade } from 'src/app/shared/animations/toggleBtn.animation';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-project-cost',
  templateUrl: './project-cost.component.html',
  styleUrls: ['./project-cost.component.scss'],
  animations: [fade],
})
export class ProjectCostComponent {
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/customers',
    },
    sub: {
      ar: 'تكلفة المشروع',
      en: 'Project Cost',
    },
  };
  searchBox: any = {
    open: false,
    searchType: null,
    searchTypes: [
      {
        name: {
          ar: 'اسم العميل',
          en: 'Customer Name',
        },
        id: 1,
      },
      {
        name: {
          ar: 'رقم المشروع',
          en: 'Project Number',
        },
        id: 2,
      },
      {
        name: {
          ar: 'نوع المشروع',
          en: 'Project Type',
        },
        id: 3,
      },
    ],
  };
  displayedColumns: string[] = [
    'projectNumber',
    'name',
    'projectType',
    'subProjectType',
    'projectName',
    'income',
    'cost',
  ];
  data: any = {
    projects: new MatTableDataSource([{}]),
    filter: {
      enable: false,
      date: null,
    },
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: RestApiService) {
    this.getData();
  }
  getData() {
    this.api.get('../../../../assets/projectManegment.json').subscribe({
      next: (data: any) => {
        // assign data to table

        this.data.projects = new MatTableDataSource(data.projects);
        this.data.projects.paginator = this.paginator;
        this.data.projects.sort = this.sort;
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
