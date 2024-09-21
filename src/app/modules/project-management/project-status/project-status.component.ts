import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestApiService } from 'src/app/shared/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { fade } from 'src/app/shared/animations/toggleBtn.animation';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss'],
  animations: [fade],
})
export class ProjectStatusComponent {
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/projects',
    },
    sub: {
      ar: 'حالة المشاريع',
      en: 'Project Status',
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
  day = new Date();
  displayedColumns: string[] = [
    'select',
    'ProjectNumber',
    'ProjectDescription',
    'ProjectManeger',
    'Customer',
    'Task',
    'Invoice',
    'operations',
  ];
  data: any = {
    filter: {
      enable: false,
      date: null,
    },
    stage: {
      NameAr: '',
      NameEn: '',
    },
    stages: [],
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
        this.dataSource = new MatTableDataSource(data.projectStatus);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  selection = new SelectionModel<any>(true, []);

  modalDetails: any;

  addNewSupervision?: BsModalRef;

  resetModal() {
    this.modalDetails = {
      AgencData: null,
      CustomerNameAr: null,
      CustomerNameEn: null,
      Id: null,
      ResponsiblePerson: null,
      Name: null,
      CustomerId: null,
      BranchId: null,
      CustomerCode: null,
      CustomerName: null,
      CustomerNationalId: null,
      NationalIdSource: null,
      CustomerAddress: null,
      CustomerEmail: null,
      CustomerPhone: null,
      CustomerMobile: null,
      CustomerTypeId: '1',
      Notes: null,
      LogoUrl: null,
      AttachmentUrl: null,
      CommercialActivity: null,
      CommercialRegister: null,
      CommercialRegDate: null,
      CommercialRegHijriDate: null,
      AccountId: null,
      ProjectNo: null,
      GeneralManager: null,
      AgentName: null,
      AgentType: null,
      AgentNumber: null,
      AgentAttachmentUrl: null,
      AccountName: null,
      AddDate: null,
      CustomerTypeName: null,
      AddUser: null,
      CompAddress: null,
      PostalCodeFinal: null,
      ExternalPhone: null,
      Country: null,
      Neighborhood: null,
      StreetName: null,
      BuildingNumber: null,
      CommercialRegInvoice: null,
      CityId: null,
      CityName: null,
      NoOfCustProj: null,
      NoOfCustProjMark: null,
      AddedcustomerImg: null,
      Projects: null,
      AccountCodee: null,
      TotalRevenue: null,
      TotalExpenses: null,
      Invoices: null,
      Transactions: null,
    };
  }
  log(asd: any) {
    // console.log(asd);
  }
  applyFilter(event: Event) {}
  availableSupervision() {}
  decline() {}
  confirmDelete() {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
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
