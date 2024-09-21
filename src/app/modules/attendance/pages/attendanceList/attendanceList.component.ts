import { attendanceDataService } from './../../services/adttendace.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendanceList',
  templateUrl: './attendanceList.component.html',
  styleUrls: ['./attendanceList.component.scss'],
})
export class AttendanceListComponent implements OnInit {
  attendanceDataService = inject(attendanceDataService);
  attendanceData!: {
    name: string;
    coordinates: {
      xmin: number;
      ymin: number;
      xmax: number;
      ymax: number;
    };
    center: {
      lng: number;
      lat: number;
    };
  }[];

  ngOnInit() {
    this.attendanceData = this.attendanceDataService.attendanceData;
  }
}
