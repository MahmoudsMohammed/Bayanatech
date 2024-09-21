import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DateType } from 'ngx-hijri-gregorian-datepicker';

@Component({
  selector: 'app-car-movement',
  templateUrl: './car-movement.component.html',
  styleUrls: ['./car-movement.component.scss'],
})
export class CarMovementComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  selectedDate: any;
  selectedDateType = DateType.Hijri;

  showSearch = true;
  rows = [
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
  ];
  temp: any = [
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
    { id: 1, reason: 'اسم النشاط 1', Resolutiontext: 'test test' },
  ];

  isEditable: any = {};

  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'حركة السيارات',
      en: 'cars movement',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'car',
    'movementType',
    'driver',
    'date',
    'driverCost',
    'managerCost',
    'operations',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalDetails: any = {
    id: null,
    car: null,
    movementType: null,
    date: null,
    hijriDate: null,
    driverAmount: null,
    employerAmount: null,
    driver: null,
    details: null,
  };

  carsMovement: any;

  formGroup = this.fb.group({});
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource([{}]);
  }

  ngOnInit(): void {
    this.users = [
      { id: 1, Name: 'محمود نافع' },
      { id: 2, Name: 'محمود نافع' },
      { id: 3, Name: 'محمود نافع' },
      { id: 4, Name: 'محمود نافع' },
      { id: 5, Name: 'محمود نافع' },
      { id: 6, Name: 'محمود نافع' },
      { id: 7, Name: 'محمود نافع' },
      { id: 8, Name: 'محمود نافع' },
      { id: 9, Name: 'محمود نافع' },
      { id: 10, Name: 'محمود نافع' },
      { id: 11, Name: 'محمود نافع' },
    ];

    this.carsMovement = [
      {
        car: 'dvfrsf',
        date: new Date(),
        driver: 'bhjbjhb',
        movementType: 'dvfrsf',
        driverCost: 'dvfrsf',
        managerCost: 'asdad',
      },
      {
        car: 'dvfrsf',
        date: new Date(),
        driver: 'bhjbjhb',
        movementType: 'dvfrsf',
        driverCost: 'dvfrsf',
        managerCost: 'asdad',
      },
      {
        car: 'dvfrsf',
        date: new Date(),
        driver: 'bhjbjhb',
        movementType: 'dvfrsf',
        driverCost: 'dvfrsf',
        managerCost: 'asdad',
      },
      {
        car: 'dvfrsf',
        date: new Date(),
        driver: 'bhjbjhb',
        movementType: 'dvfrsf',
        driverCost: 'dvfrsf',
        managerCost: 'asdad',
      },
    ];
    this.dataSource = new MatTableDataSource(this.carsMovement);
  }

  open(content: any, data?: any, type?: any, info?: any) {
    if (data && type == 'edit') {
      this.modalDetails = {
        id: '1',
        car: '1',
        movementType: '1',
        date: new Date(),
        hijriDate: new Date(),
        driverAmount: 4654,
        employerAmount: 1684,
        driver: '2',
        details: 'asdasd45asd ads asdafsasf',
      };
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.modalDetails = {
      id: null,
      car: null,
      movementType: null,
      date: null,
      hijriDate: null,
      driverAmount: null,
      employerAmount: null,
      driver: null,
      details: null,
    };

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // delete
  confirm() {}

  EditCarMovement() {
    // console.log(this.modalDetails);
  }
  AddCarMovement() {
    // console.log(this.modalDetails);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
