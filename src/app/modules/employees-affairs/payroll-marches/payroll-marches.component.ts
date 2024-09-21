import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-payroll-marches',
  templateUrl: './payroll-marches.component.html',
  styleUrls: ['./payroll-marches.component.scss'],
})
export class PayrollMarchesComponent implements OnInit {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: ' مسيرات الرواتب',
      en: 'Salary marches',
    },
  };

  showBranches = false;

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'employeName',
    'salary',
    'housingAllowance',
    'monthlyAllowance',
    'additionalAllowance',
    'bonuses',
    'rewards',
    'imprest',
    'discounts',
    'insurances',
    'absenceDays',
    'net',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  salaries: any;
  constructor() {
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

    this.salaries = [
      {
        employeName: 'dvfrsf',
        salary: 'asdadsd',
        housingAllowance: 0,
        monthlyAllowance: 'dvfrsf',
        additionalAllowance: 'dvfrsf',
        bonuses: 'asdad',
        rewards: 'dvfrsf',
        imprest: 'asdadsd',
        discounts: 0,
        insurances: 'dvfrsf',
        absenceDays: 'dvfrsf',
        net: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        salary: 'asdadsd',
        housingAllowance: 0,
        monthlyAllowance: 'dvfrsf',
        additionalAllowance: 'dvfrsf',
        bonuses: 'asdad',
        rewards: 'dvfrsf',
        imprest: 'asdadsd',
        discounts: 0,
        insurances: 'dvfrsf',
        absenceDays: 'dvfrsf',
        net: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        salary: 'asdadsd',
        housingAllowance: 0,
        monthlyAllowance: 'dvfrsf',
        additionalAllowance: 'dvfrsf',
        bonuses: 'asdad',
        rewards: 'dvfrsf',
        imprest: 'asdadsd',
        discounts: 0,
        insurances: 'dvfrsf',
        absenceDays: 'dvfrsf',
        net: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        salary: 'asdadsd',
        housingAllowance: 0,
        monthlyAllowance: 'dvfrsf',
        additionalAllowance: 'dvfrsf',
        bonuses: 'asdad',
        rewards: 'dvfrsf',
        imprest: 'asdadsd',
        discounts: 0,
        insurances: 'dvfrsf',
        absenceDays: 'dvfrsf',
        net: 'asdad',
      },
      {
        employeName: 'dvfrsf',
        salary: 'asdadsd',
        housingAllowance: 0,
        monthlyAllowance: 'dvfrsf',
        additionalAllowance: 'dvfrsf',
        bonuses: 'asdad',
        rewards: 'dvfrsf',
        imprest: 'asdadsd',
        discounts: 0,
        insurances: 'dvfrsf',
        absenceDays: 'dvfrsf',
        net: 'asdad',
      },
    ];
    this.dataSource = new MatTableDataSource(this.salaries);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
