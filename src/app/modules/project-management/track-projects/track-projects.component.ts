import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BehaviorSubject } from 'rxjs';
import { DateType } from 'ngx-hijri-gregorian-datepicker';

@Component({
  selector: 'app-track-projects',
  templateUrl: './track-projects.component.html',
  styleUrls: ['./track-projects.component.scss'],
})
export class TrackProjectsComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  columns: any = [];

  isEditable: any = {};

  info: any = [
    {
      title: {
        ar: 'مهام مسندة لقسم',
        en: '  Assigned tasks to a department',
      },
      img: 'Path 33991@2x',
      color: '#f1854e',
    },
  ];

  checkedEmail: any;
  checkedPhone: any;
  stopCheckedEmail: any;
  stopCheckedPhone: any;

  projects: any;
  openBox: any = false;
  boxId: any;
  @ViewChild('SmartFollower') smartModal: any;
  title: any = {
    main: {
      name: {
        ar: 'ادارة المشاريع',
        en: 'Projects Management',
      },
      link: '/projects',
    },
    sub: {
      ar: 'حركة المشاريع',
      en: 'track projects',
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

  showStats = false;
  showFilters = false;

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
    'projectNo',
    'customer',
    'projectType',
    'projectName',
    'subProjectType',
    'stage',
    'subStage',
    'user',
    'Region',
    'contractNumber',
    'projectDuration',
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
    projectNo: null,
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

  projectDetails: any;
  date = new Date();
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
      // FileUploadValidators.accept(['image/*']),
      FileUploadValidators.filesLimit(1),
    ]
  );

  expected_project_duration = new Date();

  expected_end_date = new Date();

  // steps
  firstFormGroup = this._formBuilder.group({
    contractNo: ['', Validators.required],
    date: [''],
    dateHijri: [''],
    office: [''],
    represents: [''],
    as: [''],
    customer: [''],
    project: [''],
    iDNumber: [''],
    check: [''],
    offerPrice: [''],
  });
  secondFormGroup = this._formBuilder.group({
    include_tax: [''],
  });
  thredFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });

  offerPriceChecked: any;

  offerServices: any = [];
  serviceListDataSource = new MatTableDataSource();

  assignedTasks: any = [];
  AssignedTasksDataSource = new MatTableDataSource();

  servicesList: any;
  servicesListdisplayedColumns: string[] = ['name', 'price'];

  assignedTasksDisplayedColumns: string[] = [
    'name',
    'duration',
    'remind',
    'stepName',
    'projectNo',
    'clientName',
    'operations',
  ];

  selectedServiceRow: any;

  serviceDetails: any;

  bands: any = [];
  participants: any = [];

  selectedDate: any;
  selectedDateType = DateType.Hijri;

  addProjectType = false;

  contractWithInstallments = false;

  installments: any = [
    {
      batchNumber: 'asdasd',
      BatchDate: 'asdasd',
      BatchDateHijri: 'asdasd',
      amount: 'asdasd',
      Tax: 'asdasd',
      total: 'asdasd',
    },
  ];

  @ViewChild('noticModal') noticModal!: any;

  showPrice: any;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource([{}]);
    this.currentDate = new Date();
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
        projectNo: 'fefwqf',
        customer: 'fefwqf',
        projectType: 'fefwqf',
        projectName: 'fefwqf',
        subProjectType: 'fefwqf',
        stage: 'fefwqf',
        subStage: 'fefwqf',
        user: 'fefwqf',
        Region: 'fefwqf',
        contractNumber: 0,
        projectDuration: 'fefwqf',
        status: 2,
        progress: 50,
      },
      {
        projectNo: 'zxvzxv',
        customer: 'fefwqf',
        projectType: 'fefwqf',
        projectName: 'fefwqf',
        subProjectType: 'fefwqf',
        stage: 'fefwqf',
        subStage: 'fefwqf',
        user: 'fefwqf',
        Region: 'fefwqf',
        contractNumber: 'fefwqf',
        projectDuration: 'fefwqf',
        status: 2,
        progress: 50,
      },
      {
        projectNo: 'bfddg',
        customer: 'fefwqf',
        projectType: 'fefwqf',
        projectName: 'fefwqf',
        subProjectType: 'fefwqf',
        stage: 'fefwqf',
        subStage: 'fefwqf',
        user: 'fefwqf',
        Region: 'fefwqf',
        contractNumber: 'fefwqf',
        projectDuration: 'fefwqf',
        status: 0,
        progress: 10,
      },
      {
        projectNo: 'qweqe',
        customer: 'fefwqf',
        projectType: 'fefwqf',
        projectName: 'fefwqf',
        subProjectType: 'fefwqf',
        stage: 'fefwqf',
        subStage: 'fefwqf',
        user: 'fefwqf',
        Region: 'fefwqf',
        contractNumber: 'fefwqf',
        projectDuration: 'fefwqf',
        status: 2,
        progress: 50,
      },
      {
        projectNo: 'gtjrtjrt',
        customer: 'fefwqf',
        projectType: 'fefwqf',
        projectName: 'fefwqf',
        subProjectType: 'fefwqf',
        stage: 'fefwqf',
        subStage: 'fefwqf',
        user: 'fefwqf',
        Region: 'fefwqf',
        contractNumber: 'fefwqf',
        projectDuration: 'fefwqf',
        status: 5,
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

    this.assignedTasks = [
      {
        name: 'awdawd',
        duration: 'awdawd',
        remind: 'awdawd',
        stepName: 'adawdwd',
        projectNo: 44564,
        clientName: 'awdad',
      },
      {
        name: 'awdawd',
        duration: 'awdawd',
        remind: 'awdawd',
        stepName: 'adawdwd',
        projectNo: 44564,
        clientName: 'awdad',
      },
      {
        name: 'awdawd',
        duration: 'awdawd',
        remind: 'awdawd',
        stepName: 'adawdwd',
        projectNo: 44564,
        clientName: 'awdad',
      },
      {
        name: 'awdawd',
        duration: 'awdawd',
        remind: 'awdawd',
        stepName: 'adawdwd',
        projectNo: 44564,
        clientName: 'awdad',
      },
      {
        name: 'awdawd',
        duration: 'awdawd',
        remind: 'awdawd',
        stepName: 'adawdwd',
        projectNo: 44564,
        clientName: 'awdad',
      },
      {
        name: 'awdawd',
        duration: 'awdawd',
        remind: 'awdawd',
        stepName: 'adawdwd',
        projectNo: 44564,
        clientName: 'awdad',
      },
    ];
    this.AssignedTasksDataSource = new MatTableDataSource(this.assignedTasks);
  }

  ngAfterViewInit() {
    this.open(this.smartModal, null, 'smartModal');
  }

  open(content: any, data?: any, type?: any, index?: any) {
    if (index != null) {
      this.selectedServiceRow = index;
    }

    if (data && type == 'edit') {
      this.modalDetails = data;
      this.modalDetails['id'] = 1;
    }

    if (data && type == 'details') {
      this.projectDetails = data;
      this.projectDetails['id'] = 1;
    }

    if (type == 'Project Type') {
      this.addProjectType = true;
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

    if (type == 'Installments') {
      this.contractWithInstallments = true;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? (type == 'contract' ? 'xxl' : 'xl') : 'lg',
        centered: type ? (type == 'contract' ? true : false) : true,
      })
      .result.then(
        (result) => {
          if (type == 'edit') {
            this.modalDetails = {
              projectNo: null,
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
          this.contractWithInstallments = false;
          this.participants = [];
          this.installments = [];
          this.bands = [];
          this.offerServices = [];
          this.addProjectType = false;
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    this.addProjectType = false;
    this.contractWithInstallments = false;
    this.participants = [];
    this.installments = [];
    this.bands = [];
    this.offerServices = [];
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addProject() {
    this.modalService.dismissAll();
    this.modalService.open(this.noticModal, { size: 'xl' });
  }

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

  addNewTask() {}

  addService(index: any) {
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

  applyFilterServiceList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.serviceListDataSource.filter = filterValue.trim().toLowerCase();
  }

  setServiceRowValue(index: any) {
    this.offerServices[this.selectedServiceRow] = this.servicesList[index];
  }

  addBand(index: any) {
    // console.log(index);

    this.bands?.push({
      clauseId: index + 1,
      clause: '',
    });
  }

  deleteBand(index: any) {
    this.bands?.splice(index, 1);
  }

  addParticipant(index: any) {
    // console.log(index);

    this.participants?.push({
      id: index + 1,
      employeeName: '',
      duration: '',
      percentage: '',
      salary: '',
      cost: '',
    });
  }

  deleteParticipant(index: any) {
    this.participants?.splice(index, 1);
  }

  setOfferPriceChecked(event: any) {
    this.offerPriceChecked = event.target.checked;
  }

  addInstallments(data: any) {}

  addContract() {}

  latitude: any = 24.72030293127678;
  longitude: any = 46.698462762671475;
  mapReady: boolean = false;
  zoom!: number;
  address!: string;
  private geoCoder: any;

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  onMapReady(map?: google.maps.Map) {
    if (map) {
      map.setOptions({
        streetViewControl: false,
        fullscreenControl: false,
      });
      google.maps.event.addListener(map, 'click', (event) => {
        this.setLocation(event.latLng.lat(), event.latLng.lng());
      });
    }
  }
  setLocation(lat: any, lng: any) {
    this.latitude = lat;
    this.longitude = lng;

    // console.log(this.latitude, this.longitude);

    this.getAddress(lat, lng);
  }

  markerDragEnd(event: any) {
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();

    // console.log(this.latitude, this.longitude);

    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.geoCoder?.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 16;
            this.address = results[1].formatted_address;
            // console.log(this.address);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  uploadFile(data: any) {}
}
