import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { BehaviorSubject, Subscription } from 'rxjs';
import { fade } from 'src/app/shared/animations/toggleBtn.animation';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.scss'],
  animations: [fade],
})
export class AddSearchComponent implements OnInit {
  title: any = {
    main: {
      name: {
        ar: 'العملاء',
        en: 'Customers',
      },
      link: '/customers',
    },
    sub: {
      ar: 'الإضافة والبحث',
      en: 'Search and inquire',
    },
  };

  data: any = {
    type: '0',
    orgEmail: 'asdwd@dwa',
    numbers: {
      all: 0,
      citizens: 0,
      investor: 0,
      government: 0,
    },
    fileType: {
      NameAr: '',
      Id: '',
      NameEn: '',
    },
    files: [
      {
        description: 'awdawd awdawd',
        type: { Name: 'adawdwd' },
        name: 'awdawdawd',
      },
    ],
    clients: [],
    branches: [],
    cities: [],
    filesTypes: [],
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

  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  columns: any = [];

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

  displayedColumns: string[] = [
    'name',
    'nationalId',
    'customerType',
    'email',
    'phone',
    'mobile',
    'operations',
  ];

  public uploadedFiles: Array<File> = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  modal?: BsModalRef;
  modalDetails: any;

  @ViewChild('dataModal') dataModal!: any;

  @ViewChild('optionsModal') optionsModal!: any;

  @ViewChild('noticModal') noticModal!: any;

  //
  //
  users: any;
  showPrice: any = false;
  existValue: any = false;
  showOfferValue: any = false;
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

  servicesListdisplayedColumns: string[] = ['name', 'price'];
  serviceListDataSource = new MatTableDataSource();

  selectAllValue = false;

  selectedUserPermissions: any = {
    userName: '',
    watch: null,
    add: null,
    edit: null,
    delete: null,
  };
  userPermissions: any = [];

  userPermissionsColumns: string[] = [
    'userName',
    'watch',
    'add',
    'edit',
    'delete',
    'operations',
  ];
  projectGoalsColumns: string[] = [
    'serial',
    'requirements',
    'name',
    'duration',
    'choose',
  ];

  userPermissionsDataSource = new MatTableDataSource();

  projectGoalsDataSource = new MatTableDataSource();

  projectGoals: any;

  checkedEmail: any;
  checkedPhone: any;

  clientAddedCheckedEmail: any;

  clientAddedCheckedPhone: any;

  invoiceData: any = [
    {
      id: 12,
      name: 'awdawd',
      unit: 'km',
      amount: 12,
      price: 1251,
      discound: 250,
      discountPercent: '10%',
      total: 2450,
      tax: 250,
      netWithVat: 2700,
    },
    {
      id: 12,
      name: 'awdawd',
      unit: 'km',
      amount: 12,
      price: 1251,
      discound: 250,
      discountPercent: '10%',
      total: 2450,
      tax: 250,
      netWithVat: 2700,
    },
    {
      id: 12,
      name: 'awdawd',
      unit: 'km',
      amount: 12,
      price: 1251,
      discound: 250,
      discountPercent: '10%',
      total: 2450,
      tax: 250,
      netWithVat: 2700,
    },
  ];

  constructor(private api: RestApiService, private ngbModalService: NgbModal) {
    this.resetModal();
    this.getData();
    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
    this.users = [
      { id: 1, Name: 'محمود نافع' },
      { id: 2, Name: 'محمود نافع' },
      { id: 3, Name: 'محمود نافع' },
      { id: 4, Name: 'محمود نافع' },
      { id: 5, Name: 'محمود نافع' },
      { id: 6, Name: 'محمود نافع' },
    ];
  }

  ngOnInit(): void {
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

    this.userPermissions = [
      {
        userName: 'adawdawd',
        watch: false,
        add: true,
        edit: true,
        delete: false,
      },
      {
        userName: 'adawdawd',
        watch: false,
        add: true,
        edit: true,
        delete: false,
      },
      {
        userName: 'adawdawd',
        watch: false,
        add: true,
        edit: true,
        delete: true,
      },
      {
        userName: 'adawdawd',
        watch: false,
        add: false,
        edit: true,
        delete: false,
      },
      {
        userName: 'adawdawd',
        watch: false,
        add: true,
        edit: true,
        delete: false,
      },
      {
        userName: 'adawdawd',
        watch: true,
        add: true,
        edit: true,
        delete: false,
      },
      {
        userName: 'adawdawd',
        watch: true,
        add: true,
        edit: true,
        delete: true,
      },
    ];
    this.userPermissionsDataSource = new MatTableDataSource(
      this.userPermissions
    );
    this.projectGoals = [
      {
        serial: 'adawd',
        requirements: 'adawd',
        name: 'adawd',
        duration: 'adawd',
        choose: true,
      },
      {
        serial: 'adawd',
        requirements: 'adawd',
        name: 'adawd',
        duration: 'adawd',
        choose: false,
      },
      {
        serial: 'adawd',
        requirements: 'adawd',
        name: 'adawd',
        duration: 'adawd',
        choose: false,
      },
    ];

    this.projectGoalsDataSource = new MatTableDataSource(this.projectGoals);
  }

  filterData(array: any[], type?: any) {
    if (!type) {
      return array;
    }
    return array.filter((ele) => {
      return ele.CustomerTypeId == type;
    });
  }

  getData() {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.dataSource = new MatTableDataSource(data.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.data.cities = data.cities;
        this.data.clients = data.users;
        this.data.branches = data.branches;
        this.data.filesTypes = data.filesTypes;

        this.data.numbers = {
          all: data.users.length,
          citizens: this.filterData(data.users, 1).length,
          investor: this.filterData(data.users, 2).length,
          government: this.filterData(data.users, 3).length,
        };
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  getBranchAccount(BranchId: any) {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        this.modalDetails.CustMainAccByBranchId = data.custMainAccByBranchId;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  setCustomersType(type: any) {
    // change table cells
    if (type == '0' || type == '1') {
      this.displayedColumns = [
        'name',
        'nationalId',
        'customerType',
        'email',
        'phone',
        'mobile',
        'operations',
      ];
    } else {
      this.displayedColumns = [
        'name',
        // 'nationalId',
        'customerType',
        'email',
        'phone',
        'mobile',
        'operations',
      ];
    }
    // assign data
    const filteredData = this.filterData(this.data.clients, type);
    this.dataSource = new MatTableDataSource(filteredData);
  }

  closeResult: any;
  open(content: any, data?: any, type?: any, index?: any) {
    if (data) {
      this.modalDetails = data;
      this.modalDetails['id'] = 1;
    }

    this.ngbModalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: !type ? true : false,
      })
      .result.then(
        (result) => {
          this.resetModal();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.resetModal();
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetModal() {
    this.control.clear();
    this.modalDetails = {
      CustMainAccByBranchId: {
        Code: '',
        AccountName: null,
        NameAr: '',
        NameEn: '',
      },
      type: 'addClient',
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
      id: null,
    };
  }

  confirm(): void {
    // console.log('yes', this.modalDetails);
  }
  decline(): void {
    // console.log('no', this.modalDetails);
  }

  edit() {
    // console.log(this.modalDetails);
  }

  addNewUser() {
    // console.log(this.modalDetails);
    this.ngbModalService.dismissAll();
    this.ngbModalService.open(this.optionsModal, { size: 'xl' });
  }

  addNewIssuer() {}
  addFilePost() {}

  getDate(str: any) {
    let millsec = str.match(/\d+/g).join();
    let date = new Date(+millsec);
    return date;
  }

  addNewFile(addFileForm: NgForm) {
    let file = {
      description: addFileForm.controls['FileDescription'].value,
      type: addFileForm.controls['FileType'].value,
      name: this.control?.value[0]?.name,
    };
    this.data.files.push(file);
    this.control.clear();
    addFileForm.resetForm();
  }
  sendSMS(sms: any) {
    // console.log(sms);
    this.modal?.hide();
  }
  sendEMAIL(sms: any) {
    // console.log(sms);
    this.control.clear();
  }

  log(asd: any) {
    // console.log(asd);
  }

  // upload img ]
  public readonly uploadedFile: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public readonly control = new FileUploadControl(
    {
      listVisible: true,
      // accept: ['image/*'],
      discardInvalid: true,
      multiple: false,
    },
    [
      FileUploadValidators.accept(['image/*']),
      FileUploadValidators.filesLimit(1),
    ]
  );
  private subscription?: Subscription;

  private getImage(file: File): void {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e: any) => this.uploadedFile.next(e.target.result);
      fr.readAsDataURL(file);
    } else {
      this.uploadedFile.next('');
    }
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

  AddOfferPrice() {}

  addProject() {
    this.ngbModalService.dismissAll();
    this.ngbModalService.open(this.noticModal);
  }

  saveOption(data: any) {}

  withWalk: any;
  changeRequestStatus(event: any) {
    this.withWalk = event.target.checked;
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

  setSelectedUserPermissions(index: any) {
    let data = this.userPermissions[index];
    this.selectedUserPermissions = data;
  }

  setValues(event: any) {
    this.selectedUserPermissions['watch'] = event.target.checked;
    this.selectedUserPermissions['add'] = event.target.checked;
    this.selectedUserPermissions['edit'] = event.target.checked;
    this.selectedUserPermissions['delete'] = event.target.checked;
  }

  addNewUserPermissions() {}

  applyUserPermissionsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userPermissionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyGoalsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectGoalsDataSource.filter = filterValue.trim().toLowerCase();
  }

  selectGoalForProject(index: any) {}

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
