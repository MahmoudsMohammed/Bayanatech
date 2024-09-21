import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
})
export class WorkOrdersComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  title: any = {
    main: {
      name: {
        ar: 'ادارة المشاريع',
        en: 'Projects Management',
      },
      link: '/projects',
    },
    sub: {
      ar: ' متابعة المهام الإدارية',
      en: 'Follow-up to administrative functions',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  workOrdersDisplayedColumns: string[] = [
    'taskNo',
    'assignedTo',
    'from',
    'to',
    'customer',
    'implemented',
    'enginner',
    'excuting_officer',
    'projectNo',
    'status',
    'operations',
  ];

  workOrdersDataSource = new MatTableDataSource();

  workOrders: any;

  modalDetails: any = {
    taskNo: null,
    assignedTo: null,
    from: null,
    to: null,
    customer: null,
    implemented: null,
    notes: null,
    excuting_officer: null,
    projectNo: null,
    status: null,
    customerId: null,
  };

  startDate = new Date();
  endDate = new Date();

  filterType: any;
  filterByDate: any;

  linkProject: any;

  constructor(private modalService: NgbModal) {}

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

    this.workOrders = [
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
      {
        taskNo: 'fefwqf',
        assignedTo: 'fefwqf',
        from: 'fefwqf',
        to: 'fefwqf',
        customer: 'fefwqf',
        implemented: 'fefwqf',
        enginner: 'fefwqf',
        excuting_officer: 'fefwqf',
        projectNo: 'fefwqf',
        status: 'fefwqf',
      },
    ];

    this.workOrdersDataSource = new MatTableDataSource(this.workOrders);
  }

  open(content: any, data?: any, type?: any) {
    if (data && type == 'edit') {
      this.modalDetails = data;
      this.modalDetails['id'] = 1;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: type ? false : true,
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
      taskNo: null,
      assignedTo: null,
      from: null,
      to: null,
      customer: null,
      customerId: null,
      implemented: null,
      notes: null,
      excuting_officer: null,
      projectNo: null,
      status: null,
    };

    this.linkProject = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addWorkOrder() {}

  editWorkOrder() {}

  confirm() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.workOrdersDataSource.filter = filterValue.trim().toLowerCase();
  }
}
