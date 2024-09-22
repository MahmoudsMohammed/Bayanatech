import { MatDialog } from '@angular/material/dialog';
import { attendanceDataService } from './../../../../services/adttendace.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { EmployeesDataComponent } from '../employeesData/employeesData.component';

@Component({
  selector: 'app-attendaceCard',
  templateUrl: './attendaceCard.component.html',
  styleUrls: ['./attendaceCard.component.scss'],
})
export class AttendaceCardComponent implements OnInit {
  @Input() taskName: string = 'Mahmoud';
  deleted!: boolean;
  attendanceDataService = inject(attendanceDataService);
  dialog = inject(MatDialog);
  openDialog() {
    this.dialog.open(EmployeesDataComponent);
  }
  ngOnInit() {
    this.deleted = false;
  }
}
