import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offers-price',
  templateUrl: './offers-price.component.html',
  styleUrls: ['./offers-price.component.scss'],
})
export class OffersPriceComponent implements OnInit {
  title: any = {
    main: {
      name: {
        ar: 'ادارة المشاريع',
        en: 'Projects Management',
      },
      link: '/projects',
    },
    sub: {
      ar: 'عروض الأسعار',
      en: 'Offres Prices',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  displayedColumns: string[] = [
    'offer_id',
    'date',
    'customer',
    'price',
    'user',
    'project_id',
    'project-duration',
    'operations',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedRow: any;
  offersPrices: any;

  modalDetails: any = {
    id: null,
    date: null,
    customer: null,
    customerEn: null,
    price: null,
    user: null,
    userEmail: null,
    project_id: null,
    projectDuration: null,
    customerEmail: null,
    customerPhone: null,
    title: null,
    description: null,
    salesEngineer: null,
    department: null,
    offer_id: null,
    offer_intro: null,
    status: null,
    default: null,
    followDate: null,
    remeberMe: null,
    PrintEn: null,
    showNotification: null,
    showSignatures: null,
    showAccount: null,
  };

  uploadedFiles: any;

  durations: any;
  selectedDuration: any;
  selectedDuration2: any;

  generalRequests: any;
  designRequests: any;

  existValue: any = false;

  offerTerms: any = [];
  offerServices: any = [];
  offerPayments: any = [
    {
      id: 1,
      statement: '',
      statementEn: '',
      status: false,
      ratio: 0,
      amount: 0,
    },
  ];

  serviceDetails: any;

  servicesList: any;

  selectedServiceRow: any;

  showOfferValue: any = false;

  servicesListdisplayedColumns: string[] = ['name', 'price'];
  serviceListDataSource = new MatTableDataSource();
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

    this.durations = [
      { id: 1, name: { ar: 'هذا اليوم', en: 'this Day' } },
      { id: 2, name: { ar: 'هذا الاسبوع', en: 'this Week' } },
      { id: 3, name: { ar: 'هذا الشهر', en: 'this Month' } },
    ];

    this.offersPrices = [
      {
        id: 1,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 1,
      },
      {
        id: 2,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 2,
      },
      {
        id: 3,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 3,
      },
      {
        id: 4,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 0,
      },
      {
        id: 5,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 5,
      },
      {
        id: 6,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 1,
      },
      {
        id: 7,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 3,
      },
      {
        id: 8,
        date: new Date(),
        offer_id: 4245,
        customer: 'محمود احمد',
        price: 236,
        user: 'ياسر القحطاني',
        userEmail: 'asdawd@asdad.ca',
        project_id: 125,
        projectDuration: 123,
        customerEmail: 'addw@adawd.cawd',
        status: 1,
      },
    ];

    this.dataSource = new MatTableDataSource(this.offersPrices);

    this.generalRequests = [
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 1,
      },
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 2,
      },
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 2,
      },
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 1,
      },
    ];
    this.designRequests = [
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 1,
      },
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 2,
      },
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 2,
      },
      {
        date: new Date(),
        user_name: 'Abdelrhman',
        email: 'asddfawd@add.awd',
        phone: '01128479489',
        status: 1,
      },
    ];

    this.servicesList = [
      {
        id: 10,
        name: 'awdawd',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 11,
        name: 'bsdvsv',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 12,
        name: 'gergerg',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 13,
        name: 'awdawd',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 14,
        name: 'dfbdfbf',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
      {
        id: 15,
        name: 'zccszscz',
        unit: '12',
        amount: 451,
        price: 35200,
        vatTax: 10,
        taxes: 20,
      },
    ];

    this.serviceListDataSource = new MatTableDataSource(this.servicesList);
  }

  open(content: any, data?: any, type?: any, index?: any) {
    if (index != null) {
      this.selectedServiceRow = index;
    }

    if (data && (type == 'add' || type == 'edit')) {
      this.modalDetails = data;
    }

    if (type == 'serviceDetails' && data) {
      this.serviceDetails = data;
      this.serviceDetails['items'] = [
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
        { name: 'adwdawd' },
      ];
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type == 'add' || type == 'edit' ? 'xl' : 'lg',
        centered:
          type == 'serviceDetails' || type == 'servicesList' ? false : true,
      })
      .result.then(
        (result) => {
          if (type == 'add' || type == 'edit') {
            this.existValue = false;

            this.offerTerms = [];

            this.offerPayments = [];

            this.offerServices = [];
          }

          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.uploadedFiles = null;
    this.modalDetails = {
      id: null,
      date: null,
      customer: null,
      customerEn: null,
      price: null,
      user: null,
      userEmail: null,
      project_id: null,
      projectDuration: null,
      customerEmail: null,
      customerPhone: null,
      title: null,
      description: null,
      salesEngineer: null,
      department: null,
      offer_id: null,
      offer_intro: null,
      status: null,
      default: null,
      followDate: null,
      remeberMe: null,
      PrintEn: null,
      showNotification: null,
      showSignatures: null,
      showAccount: null,
    };

    // console.log(type);

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  exportExcel() {}

  printProject() {}

  printRequest() {}

  setOfferData(data: any) {
    this.selectedRow = data;
  }

  // delete
  confirm() {}
  decline() {}

  //sendMail
  sendEMAIL(sms: any) {
    // console.log(sms, this.uploadedFiles);
  }

  changeRequestStatus(index: any, type: any) {
    if (type == 'general') {
      // console.log(index, this.generalRequests[index].status, type);

      if (this.generalRequests[index].status == 1) {
        this.generalRequests[index].status = 2;
      } else {
        this.generalRequests[index].status = 1;
      }
    } else {
      // console.log(index, this.generalRequests[index].status, type);

      if (this.designRequests[index].status == 1) {
        this.designRequests[index].status = 2;
      } else {
        this.designRequests[index].status = 1;
      }
    }
  }

  AddOfferPrice() {
    // console.log(this.modalDetails, this.offerTerms);
  }

  EditOfferPrice() {
    // console.log(this.modalDetails, this.offerTerms);
  }

  addTerm(index: any) {
    // console.log(this.offerTerms, index);

    this.offerTerms?.push({
      id: index + 1,
      statement: '',
      statementEn: '',
      status: false,
    });
  }

  deleteTerm(index: any) {
    this.offerTerms?.splice(index, 1);
  }

  addPayments(index: any) {
    // console.log(this.offerPayments, index);

    this.offerPayments?.push({
      id: index + 1,
      statement: '',
      statementEn: '',
      status: false,
      ratio: 0,
      amount: 0,
    });
  }

  deletePayments(index: any) {
    if (this.offerPayments?.length > 1) {
      this.offerPayments?.splice(index, 1);
    }
  }

  addService(index: any) {
    // console.log(this.offerServices, index);

    this.offerServices?.push({
      id: index + 1,
      name: '',
      unit: '',
      amount: 0,
      price: 0,
      vatTax: 0,
      taxes: 0,
    });
  }

  deleteService(index: any) {
    this.offerServices?.splice(index, 1);
  }

  setServiceRowValue(index: any) {
    this.offerServices[this.selectedServiceRow] = this.servicesList[index];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.serviceListDataSource.filter = filterValue.trim().toLowerCase();
  }
}
