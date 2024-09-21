import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-projects-archive',
  templateUrl: './projects-archive.component.html',
  styleUrls: ['./projects-archive.component.scss'],
})
export class ProjectsArchiveComponent {
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/projects',
    },
    sub: {
      ar: '  أرشيف المشاريع',
      en: ' Projects archive',
    },
  };
  searchBox: any = {
    open: false,
    searchType: null,
    searchTypes: [
      {
        name: {
          ar: 'اسم العميل',
          en: 'Customer Name',
        },
        id: 1,
      },
      {
        name: {
          ar: 'رقم الهوية',
          en: 'National Id',
        },
        id: 2,
      },
      {
        name: {
          ar: 'رقم الجوال',
          en: 'Mobile Number',
        },
        id: 3,
      },
    ],
  };

  displayedColumns: string[] = [
    'Archivedate',
    'status',
    'projectNumber',
    'Client',
    'ProjectType',
    'contractnumber',
    'area',
    'Projectmanager',
    'user',
    'operations',
  ];
  data: any = {
    filter: {
      enable: false,
      date: null,
    },
    clause: {
      NameAr: '',
      NameEn: '',
      id: 0,
    },
    supplier: {
      NameAr: '',
      NameEn: '',
      id: 0,
    },
    clauses: [],
    suppliers: [],
  };

  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private modalService: BsModalService,
    private api: RestApiService
  ) {
    this.getData();
  }

  getData() {
    this.api.get('../../../../assets/projectManegment.json').subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.archievProjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.data.clauses = data.clauses;
        this.data.suppliers = data.suppliers;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  selection = new SelectionModel<any>(true, []);
  modalDetails: any;
  addNewSupervision?: BsModalRef;
  employees: any[] = [
    {
      name: '',
      duration: '',
      durationType: '',
      ratio: '',
      salary: '',
      cost: '',
    },
  ];
  addEmployee() {
    let newEmployee = {
      name: '',
      duration: '',
      ratio: '',
      salary: '',
      cost: '',
    };
    this.employees.push(newEmployee);
  }

  log(asd: any) {
    // console.log(asd);
    // console.log(asd);
  }
  applyFilter(event: Event) {}
  availableSupervision() {}
  decline() {}
  confirmDelete() {}
}
