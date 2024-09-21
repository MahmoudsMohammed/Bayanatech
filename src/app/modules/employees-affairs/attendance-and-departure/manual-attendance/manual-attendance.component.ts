import { Component } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-manual-attendance',
  templateUrl: './manual-attendance.component.html',
  styleUrls: ['./manual-attendance.component.scss'],
})
export class ManualAttendanceComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'الحضور اليدوي',
      en: 'Maniual attendance',
    },
  };

  data: any = {
    fingerAttendence: [],
    filter: {
      show: 1,
    },
    day: new Date(),
    days: [],
    week: this.selectWeek(),
  };
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
    this.getDaysInMonthUTC();
  }

  getData() {
    this.api.get('../../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.fingerAttendence = data.fingerAttendence;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  applyFilter(event: Event) {}
  getDaysInMonthUTC() {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    this.data.days = days;
    return days;
  }
  selectWeek() {
    return Array(7)
      .fill(new Date(new Date()))
      .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)));
  }

  toLocalString(date: any) {
    let lang = localStorage.getItem('lang') || 'ar';
    return date.toLocaleString(lang, { weekday: 'long' });
  }
  open(content: any, data?: any, type?: any) {
    if (data && type == 'edit') {
      // this.modalDetails = data;
      // this.modalDetails['id'] = 1;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: type ? false : true,
      })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
}
