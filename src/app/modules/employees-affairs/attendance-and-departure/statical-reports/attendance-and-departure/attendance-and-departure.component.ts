import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-attendance-and-departure',
  templateUrl: './attendance-and-departure.component.html',
  styleUrls: ['./attendance-and-departure.component.scss'],
})
export class AttendanceAndDepartureComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'الحضور والانصراف',
      en: 'Attendance and Departure',
    },
  };

  data: any = {
    attendence: new MatTableDataSource([{}]),
    filter: {
      enable: false,
      date: null,
    },
  };
  // dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'EmployeeName',
    'BranchName',
    'CheckIn',
    'ShiftTime',
    'CheckType',
    'CheckTime',
  ];
  constructor(private api: RestApiService) {
    this.getData();
  }

  getData() {
    this.api.get('../../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.attendence = new MatTableDataSource(data.attendence);
        this.data.attendence.paginator = this.paginator;
        this.data.attendence.sort = this.sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  applyFilter(event: Event) {}
}
