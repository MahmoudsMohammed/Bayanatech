import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SelectionModel } from '@angular/cdk/collections';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { RestApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { NodeItem, TreeCallbacks, TreeMode } from 'tree-ngx';

@Component({
  selector: 'app-cost-centres',
  templateUrl: './cost-centres.component.html',
  styleUrls: ['./cost-centres.component.scss']
})

export class CostCentresComponent implements OnInit {

  nodeItems: any;
  selectedTask1: any;
  type : any  ;

  options = {
    mode: TreeMode.SingleSelect,
    checkboxes: false,
    alwaysEmitSelected: false,
  };
  accountCode : any ;



  // data in runningTasksModal
  accountingEntries = [
    {
      date: '2023-07-01',
      bondNumber: '123',
      bondType: 'Type A',
      registrationNumber: '456',
      accountCode: '789',
      accountName: 'Account A',
      statement: 'Statement A',
      debtor: 100,
      creditor: 50,
    },
    {
      date: '2023-07-02',
      bondNumber: '456',
      bondType: 'Type B',
      registrationNumber: '789',
      accountCode: '012',
      accountName: 'Account B',
      statement: 'Statement B',
      debtor: 200,
      creditor: 150,
    },
  ];

  get totalDebtor() {
    return this.accountingEntries.reduce(
      (total, entry) => total + entry.debtor,
      0
    );
  }

  get totalCreditor() {
    return this.accountingEntries.reduce(
      (total, entry) => total + entry.creditor,
      0
    );
  }

  projects: any;
  @ViewChild('SmartFollower') smartModal: any;
  title: any = {
    main: {
      name: {
        ar: 'الحسابات',
        en: 'Projects Management',
      },
      link: '/accounts',
    },
    sub: {
      ar: ' مركز التكلفة',
      en: 'cost center',
    },
  };

  selectedUser: any;
  users: any;

  closeResult = '';

  showStats = false;
  showFilters = false;
  showTable = true;
  selectedItem :any ;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  columns: any = [];

  isEditable: any = {};

  openBox: any = false;
  boxId: any;
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
  // dataSource: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  delayedProjects: any;
  latedProjects: any;

  currentDate: any;

  selectedProject: any;
  selectedRow: any;

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
  projectDisplayedColumns: string[] = [
    'CostCenterCode',
    'nameAr',
    'NameLat',
    'Level',
    'mainCostCenter',
    'operations',
  ];

  projectUsersColumns: string[] = ['name', 'responsibility'];
  projectTasksColumns: string[] = ['taskName', 'name', 'duration'];

  userPermissionsDataSource = new MatTableDataSource();

  projectGoalsDataSource = new MatTableDataSource();

  projectUsersDataSource = new MatTableDataSource();
  projectTasksDataSource = new MatTableDataSource();

  projectsDataSource = new MatTableDataSource();

  modalDetails: any = {
    accountCode: null,
    projectDuration: null,
    branch: null,
    center: null,
    from: null,
    to: null,
    projectType: null,
    subProjectDetails: null,
    walk: null,
    customer: null,
    buildingType: null,
    service: null,
    user: null,
    region: null,
    projectDescription: null,
    offerPriceNumber: null,
    projectDepartment: null,
    projectPermissions: null,
    projectGoals: null,
  };

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

  projectGoals: any = [
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

  projectUsers: any = [
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      responsibility: 'adawd',
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      responsibility: 'adawd',
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      responsibility: 'adawd',
    },
  ];

  projectTasks: any = [
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      taskName: 'adawd',
      duration: 4,
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      taskName: 'adawd',
      duration: 4,
    },
    {
      name: 'adawd',
      image: '/assets/images/login-img.png',
      taskName: 'adawd',
      duration: 4,
    },
  ];

  startDate = new Date();
  endDate = new Date();
  constructor(
    private modalService: NgbModal,
    private api: RestApiService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([{}]);
    this.currentDate = new Date();
  }


  ngOnInit(): void {

    this.nodeItems = [
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
      {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman',
            },
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel',
            },
          },
        ],
      },
      {
        id: '3',
        name: 'Villains',
        children: [
          {
            id: '4',
            name: 'Joker',
            item: {
              phrase: 'Why so serius',
            },
          },
          {
            id: '5',
            name: 'Lex luthor',
            item: {
              phrase: 'I am the villain of this story',
            },
          },
        ],
      },
    ];

    this.users = [
      { id: 1, Name: 'محمود نافع' },
      { id: 2, Name: 'محمود نافع' },
    ];

    this.delayedProjects = [
      {
        user: 'adwawd',
        customerName: 'adawdv',
        projectStatus: 4,
        startDate: new Date(),
        endDate: new Date(),
      },
    ];
    this.latedProjects = [
      {
        user: 'adwawd',
        customerName: 'adawdv',
        projectStatus: 0,
        startDate: new Date(),
        endDate: new Date(),
      },
    ];

    this.projects = [
      {
        CostCenterCode: '1',
        nameAr: 'المركز الرئيسي',
        NameLat: 'Main Branch',
        Level: '1',
        mainCostCenter: '',
        progress: 50,
      },
      {
        CostCenterCode: '2',
        nameAr: ' المدينة المنورة',
        NameLat: 'med',
        Level: '0',
        mainCostCenter: '',
        progress: 50,
      },
      {
        CostCenterCode: '21',
        nameAr: 'المركز الرئيسي',
        NameLat: 'Main Branch',
        Level: '1',
        mainCostCenter: '',
        progress: 50,
      },
      {
        CostCenterCode: '5',
        nameAr: 'المركز الرئيسي',
        NameLat: 'Main Branch',
        Level: '1',
        mainCostCenter: '',
        progress: 50,
      },
      {
        CostCenterCode: '61',
        nameAr: 'المركز الرئيسي',
        NameLat: 'Main Branch',
        Level: '1',
        mainCostCenter: '',
        progress: 50,
      },
    ];

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

    this.projectsDataSource = new MatTableDataSource(this.projects);

    this.userPermissionsDataSource = new MatTableDataSource(
      this.userPermissions
    );

    this.projectGoalsDataSource = new MatTableDataSource(this.projectGoals);

    this.projectUsersDataSource = new MatTableDataSource(this.projectUsers);

    this.projectTasksDataSource = new MatTableDataSource(this.projectTasks);
  }

  CostCenterCode :any ;
  nameAr :any ;
  NameLat :any ;

  onAccountCodeClick(element: any) {
    this.CostCenterCode = element.CostCenterCode;
    this.nameAr = element.nameAr;
    this.NameLat = element.NameLat;
  }

  ngAfterViewInit() {
    // this.open(this.smartModal, null, 'smartModal');
  }

  open(content: any, data?: any, type?: any) {
    if (data && type == 'edit') {
      this.modalDetails = data;
      this.modalDetails['id'] = 1;
    }

    this.modalService
      // .open(content, {
      //   ariaLabelledBy: 'modal-basic-title',
      //   size: type == 'runningTasksModal' ? 'xxl' : 'xl' ,
      //   centered: type ? false : true
      // })

      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: type ? false : true,
      })

      .result.then(
        (result) => {
          if (type == 'edit') {
            this.modalDetails = {
              projectNo: null,
              accountCode: null,
              projectDuration: null,
              branch: null,
              center: null,
              from: null,
              to: null,
              projectType: null,
              subProjectDetails: null,
              walk: null,
              customer: null,
              buildingType: null,
              service: null,
              user: null,
              region: null,
              projectDescription: null,
              offerPriceNumber: null,
              projectDepartment: null,
              projectPermissions: null,
              projectGoals: null,
            };
          }
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addProject() {}

  extend() {}
  skip() {}
  confirm() {}
  endProject() {}
  flagProject() {}
  unSaveProjectInTop() {}

  stopProject() {}
  addNewUserPermissions() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userPermissionsDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyGoalsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectGoalsDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyUsersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectUsersDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyTasksFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectTasksDataSource.filter = filterValue.trim().toLowerCase();
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

  changeRequestStatus(event: any) {
    this.modalDetails.walk = event.target.checked;
  }

  saveOption(data: any) {}

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

  selectGoalForProject(index: any) {}

  addNewMission() {}

  onSort(event: any) {
    // console.log(event);
  }
  // ############### send sms

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
    files: [],
    clients: [],
    branches: [],
    cities: [],
    filesTypes: [],
  };
  modal?: BsModalRef;
  sendEMAIL(sms: any) {
    // console.log(sms);
    this.control.clear();
    this.modal?.hide();
  }

  public readonly control = new FileUploadControl(
    {
      listVisible: true,
      // accept: ['image/*'],
      discardInvalid: true,
      multiple: false,
    },
    [
      // FileUploadValidators.accept(['image/*']),
      FileUploadValidators.filesLimit(1),
    ]
  );
  public uploadedFiles: Array<File> = [];

  sendSMS(sms: any) {
    // console.log(sms);
    this.modal?.hide();
  }

  // selection in table

  selection = new SelectionModel<any>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.projectsDataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.projectsDataSource.data);
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

  existValue: any = false;

  selectedVoucher: any;
  sendToPrint(id?: any) {
    const printContents: any = window.document.getElementById(id)!.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
// ##################3



}
