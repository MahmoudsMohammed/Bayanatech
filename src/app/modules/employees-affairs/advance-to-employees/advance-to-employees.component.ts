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
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-advance-to-employees',
  templateUrl: './advance-to-employees.component.html',
  styleUrls: ['./advance-to-employees.component.scss'],
})
export class AdvanceToEmployeesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  showBranches: any = false;

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
      ar: ' عُهَد الموظفين',
      en: 'Employees Covenant',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'employeName',
    'branche',
    'covenant',
    'Quantity',
    'price',
    'receiptCustody',
    'operations',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalDetails: any = {
    employeName: null,
    covenant: null,
    Quantity: null,
    price: null,
    receiptCustody: null,
    category: null,
    date: null,
  };

  convenants: any;

  constructor(private modalService: NgbModal) {
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

    this.convenants = [
      {
        employeName: 'dvfrsf',
        branche: 'asdasd',
        covenant: 10,
        Quantity: 0,
        price: 10,
        receiptCustody: 10,
      },
      {
        employeName: 'dvfrsf',
        branche: 'asdasd',
        covenant: 10,
        Quantity: 0,
        price: 10,
        receiptCustody: 10,
      },
      {
        employeName: 'dvfrsf',
        branche: 'asdasd',
        covenant: 10,
        Quantity: 0,
        price: 10,
        receiptCustody: 10,
      },
      {
        employeName: 'dvfrsf',
        branche: 'asdasd',
        covenant: 10,
        Quantity: 0,
        price: 10,
        receiptCustody: 10,
      },
    ];
    this.dataSource = new MatTableDataSource(this.convenants);
  }

  withReason = false;
  open(content: any, data?: any, type?: any, info?: any) {
    if (data && type == 'edit') {
      // console.log('asdd');

      this.modalDetails = data;
      this.modalDetails['id'] = '1';
    }

    if (info) {
      this.withReason = true;
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
    this.modalDetails = {};

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.name_ar.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;

    if (this.table) {
      this.table!.offset = 0;
    }
  }

  // Save row
  save(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    // console.log('Row saved: ' + rowIndex);
    // console.log(row);
  }

  // Delete row
  delete(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    this.rows.splice(rowIndex, 1);
    // console.log('Row deleted: ' + rowIndex);
  }

  saveOption(data: any) {}

  addCovenant(data: any) {}
}
