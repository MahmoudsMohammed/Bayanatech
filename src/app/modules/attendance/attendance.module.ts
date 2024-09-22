import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AddAttendanceComponent } from './pages/addAttendance/addAttendance.component';
import { AttendanceListComponent } from './pages/attendanceList/attendanceList.component';
import { AttendaceCardComponent } from './pages/attendanceList/components/attendaceCard/attendaceCard.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmployeesDataComponent } from './pages/attendanceList/components/employeesData/employeesData.component';

@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AttendanceComponent,
        children: [
          { path: 'addAttendance/:name', component: AddAttendanceComponent },
          { path: 'attendanceList', component: AttendanceListComponent },
        ],
      },
    ]),
  ],
  declarations: [
    EmployeesDataComponent,
    AttendanceComponent,
    AddAttendanceComponent,
    AttendanceListComponent,
    AttendaceCardComponent,
  ],
})
export class AttendanceModule {}
