import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-supervisions',
  templateUrl: './supervisions.component.html',
  styleUrls: ['./supervisions.component.scss'],
})
export class SupervisionsComponent {
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/customers',
    },
    sub: {
      ar: 'متابعة طلعات الإشراف',
      en: 'Supervision',
    },
  };

  displayedColumns: string[] = [
    'name',
    'projectNumber',
    'orderNumber',
    'stage',
    'assignedTo',
    'assignedDate',
    'status',
    'operations',
  ];
  data: any = {
    supervision: [],
    supervisionDetails: [],
    phaseDetails: [],
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


  checkedEmail: any;
  checkedPhone: any;

  checkedEmailAdmin: any;
  checkedPhoneAdmin: any;

  constructor(
    private modalService: BsModalService,
    private api: RestApiService
  ) {
    this.getData();
  }
  getData() {
    this.api.get('../../../../assets/projectManegment.json').subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.supervision);
        this.data.phaseDetails = data.phaseDetails;
        this.data.supervisionDetails = data.supervisionDetails;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  modalDetails: any = {
    type: '',
  };
  modal?: BsModalRef;
  addNewSupervision?: BsModalRef;
  // openModal(template: TemplateRef<any>, data?: any, modalType?: any) {
  //   this.resetModal();
  //   if (data) {
  //     // console.log('xxx');

  //     this.modalDetails = data;
  //   }
  //   if (modalType) {
  //     // console.log(modalType);

  //     this.modalDetails.type = modalType;
  //   }

  //   this.modal = this.modalService.show(
  //     template,
  //     Object.assign({}, { class: modalType })
  //   );
  // }

  // openModal2(template: TemplateRef<any>, data?: any, modalType?: any) {
  //   // this.resetModal();

  //   this.addNewSupervision = this.modalService.show(
  //     template,
  //     Object.assign({}, { class: modalType })
  //   );
  // }

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
}
