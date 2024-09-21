import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss'],
})
export class ProjectSettingComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  currentPage = 'view';

  title: any = {
    main: {
      name: {
        ar: 'ادارة المشاريع',
        en: 'Projects Management',
      },
      link: '/projects',
    },
    sub: {
      ar: ' سير عمل المشروع      ',
      en: 'track projects',
    },
  };

  titleAdd: any = {
    main: {
      name: {
        ar: 'ادارة المشاريع',
        en: 'Projects Management',
      },
      link: '/projects',
    },
    sub: {
      ar: ' سير عمل المشروع      ',
      en: 'track projects',
    },
    child: {
      ar: 'اضافة سير عمل جديد',
      en: 'add project workflow',
    },
  };

  titleEdit: any = {
    main: {
      name: {
        ar: 'ادارة المشاريع',
        en: 'Projects Management',
      },
      link: '/projects',
    },
    sub: {
      ar: ' سير عمل المشروع      ',
      en: 'track projects',
    },
    child: {
      en: 'Edit project workflow',
      ar: 'تعديل سير عمل المشروع',
    },
  };

  missionsDisplayedColumns: string[] = [
    'select',
    'name',
    'duration',
    'assigned',
    'desc',
    'operations',
  ];

  selectedUser: any;
  users: any;

  closeResult = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  workOrdersDisplayedColumns: string[] = [
    'projectWorkflowNo',
    'projectWorkflowDesc',
    'projectType',
    'subProjectType',
    'duration',
    'total_duration',
    'added_date',
    'user',
    'operations',
  ];

  projectWorkflowsDataSource = new MatTableDataSource();

  missionsDataSource = new MatTableDataSource();

  workFlows: any;

  modalDetails: any = {
    id: null,
    projectWorkflowNo: null,
    projectWorkflowDesc: null,
    projectType: null,
    subProjectType: null,
    duration: null,
    total_duration: null,
    added_date: null,
    user: null,
    mainStage: null,
    subStage: null,
  };

  startDate = new Date();
  endDate = new Date();

  filterType: any;
  filterByDate: any;

  linkProject: any;

  isEditable: any = {};

  rows = [
    { id: 1, name_ar: 'اسم النشاط 1', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط 2', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط 3', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
  ];
  temp: any = [
    { id: 1, name_ar: 'اسم النشاط 1', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط 2', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط 3', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 1, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 2, name_ar: 'اسم النشاط', name_en: 'test test' },
    { id: 3, name_ar: 'اسم النشاط', name_en: 'test test' },
  ];

  missions: any;

  constructor(private modalService: NgbModal, private ar: ActivatedRoute) {
    // console.log(window.history.state);

    if (window.history.state?.type) {
      this.currentPage = window.history.state?.type;
      this.modalDetails = {};
      this.modalDetails['id'] = 1;
    } else {
      this.currentPage = 'view';
    }
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

    this.workFlows = [
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
      {
        projectWorkflowNo: 'fefwqf',
        projectWorkflowDesc: 'fefwqf',
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        duration: 'fefwqf',
        total_duration: 'fefwqf',
        added_date: new Date(),
        user: 'fefwqf',
        mainStage: 'fefwqf',
        subStage: 'fefwqf',
      },
    ];

    this.projectWorkflowsDataSource = new MatTableDataSource(this.workFlows);

    this.missions = [
      {
        name: 'adawdw',
        duration: 'adwawd',
        assigned: 'adawc',
        desc: 'acaqwwad',
      },
    ];
    this.missionsDataSource = new MatTableDataSource(this.missions);
  }

  open(content: any, data?: any, type?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? (type == 'delete' ? 'md' : 'xl') : 'lg',
        centered: type ? (type == 'delete' ? true : false) : false,
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
    this.linkProject = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setModalDetails(data: any) {
    this.modalDetails = data;
    this.modalDetails['id'] = 1;
  }
  resetModalDetails() {
    this.modalDetails = {
      id: null,
      projectWorkflowNo: null,
      projectWorkflowDesc: null,
      projectType: null,
      subProjectType: null,
      duration: null,
      total_duration: null,
      added_date: null,
      user: null,
      mainStage: null,
      subStage: null,
    };
  }

  addWorkOrder() {}

  editWorkOrder() {}

  confirm() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectWorkflowsDataSource.filter = filterValue.trim().toLowerCase();
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

  copyprojectWorkflow() {}

  merge() {}

  selection = new SelectionModel<any>(true, []);
  select: any = {
    selected: null,
  };
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.missions?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    let data = this.missions;
    this.selection.select(...data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
