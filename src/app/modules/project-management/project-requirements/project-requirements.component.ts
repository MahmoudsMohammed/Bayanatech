import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.scss'],
})
export class ProjectRequirementsComponent implements OnInit {
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
      ar: '   متطلبات المشروع      ',
      en: '  project requirments',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  projectRequirmentsDisplayedColumns: string[] = [
    'projectType',
    'subProjectType',
    'fileName',
    'cost',
    'operations',
  ];

  projectRequirmentsDataSource = new MatTableDataSource();

  projectRequirments: any;

  modalDetails: any = {
    id: null,
    projectType: null,
    subProjectType: null,
    fileName: null,
    cost: null,
  };

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

    this.projectRequirments = [
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
      {
        projectType: 'fefwqf',
        subProjectType: 'fefwqf',
        fileName: 'fefwqf',
        cost: 100,
      },
    ];

    this.projectRequirmentsDataSource = new MatTableDataSource(
      this.projectRequirments
    );
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
      id: null,
      projectType: null,
      subProjectType: null,
      fileName: null,
      cost: null,
    };
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  confirm() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectRequirmentsDataSource.filter = filterValue.trim().toLowerCase();
  }

  addprojectRequirment() {}

  editprojectRequirment() {}
}
