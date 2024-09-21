import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AddAttendanceComponent } from './pages/addAttendance/addAttendance.component';
import { AttendanceListComponent } from './pages/attendanceList/attendanceList.component';
import { AttendaceCardComponent } from './pages/attendanceList/components/attendaceCard/attendaceCard.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
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
    AttendanceComponent,
    AddAttendanceComponent,
    AttendanceListComponent,
    AttendaceCardComponent,
  ],
})
export class AttendanceModule {}
