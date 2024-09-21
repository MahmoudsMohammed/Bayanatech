import { attendanceDataService } from './../../../../services/adttendace.service';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendaceCard',
  templateUrl: './attendaceCard.component.html',
  styleUrls: ['./attendaceCard.component.scss'],
})
export class AttendaceCardComponent implements OnInit {
  @Input() taskName: string = 'Mahmoud';
  deleted!: boolean;
  attendanceDataService = inject(attendanceDataService);
  constructor() {}

  ngOnInit() {
    this.deleted = false;
  }
 
}
