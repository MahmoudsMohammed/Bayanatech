import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent {
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
      ar: 'جميع المهام',
      en: 'All Tasks',
    },
  };

  displayedColumns: string[] = [
    'name',
    'projectName',
    'projectNumber',
    'projectType',
    // 'subProjectType',
    // 'userName',
    'taskStart',
    'taskEnd',
    'taskStatus',
    'taskTime',
  ];
  data: any = {
    userTasks: new MatTableDataSource([{}]),
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

        this.data.userTasks = new MatTableDataSource(data.userTasks);
        this.data.userTasks.paginator = this.paginator;
        this.data.userTasks.sort = this.sort;
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
