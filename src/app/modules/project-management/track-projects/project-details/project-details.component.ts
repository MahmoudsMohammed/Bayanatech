import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any;

  @Input() projectDetails: any;

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

  users: any;
  dateNow = new Date();
  closeResult: any;

  isEditable: any = {};

  TasksDisplayedColumns: string[] = [
    'taskName',
    'taskStatus',
    'assigned',
    'duration',
    'start_date',
    'end_date',
    'operations',
  ];

  projectFilesDisplayedColumns: string[] = [
    'uploadDate',
    'fileName',
    'user',
    'notes',
    'operations',
  ];

  noticesDisplayedColumns: string[] = ['title', 'date', 'from', 'to'];

  documentsDisplayedColumns: string[] = [
    'name',
    'type',
    'comment',
    'operations',
  ];

  projectOutgoingDisplayedColumns: string[] = [
    'id',
    'important',
    'type',
    'date',
    'archive',
    'entity',
    'to',
  ];

  projectOutgoingFilesDisplayedColumns: string[] = [
    'FileName',
    'uploadDate',
    'operations',
  ];

  projectWardDisplayedColumns: string[] = [
    'id',
    'important',
    'type',
    'date',
    'archive',
    'entity',
    'to',
  ];

  projectWardFilesDisplayedColumns: string[] = [
    'FileName',
    'uploadDate',
    'operations',
  ];

  workOrdersDisplayedColumns: string[] = [
    'name',
    'type',
    'assigned',
    'duration',
    'start',
    'end',
  ];

  supervisionDisplayedColumns: string[] = [
    'id',
    'stage',
    'assigned',
    'Commissioning_date',
    'status',
    'operations',
  ];

  projectTasksDataSource = new MatTableDataSource();
  projectNoticesDataSource = new MatTableDataSource();
  projectFilesDataSource = new MatTableDataSource();
  projectDocumentsDataSource = new MatTableDataSource();

  projectOutgoingDataSource = new MatTableDataSource();
  projectOutgoingFilesDataSource = new MatTableDataSource();

  projectWardDataSource = new MatTableDataSource();
  projectWardFilesDataSource = new MatTableDataSource();

  workOrdersDataSource = new MatTableDataSource();
  projectSupervisionDataSource = new MatTableDataSource();

  projectTasks: any;
  projectNotics: any;
  projectFiles: any;
  projectDocuments: any;

  projectOutgoing: any;
  projectOutgoingFiles: any;
  projectWard: any;
  projectWardFiles: any;
  projectWorkOrders: any;
  projectSupervisions: any;

  filterByDate: any;

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

    this.projectTasks = [
      {
        taskName: 'adawdawd',
        taskStatus: 'erverv',
        assigned: 'wdad',
        duration: '100',
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        taskName: 'adawdawd',
        taskStatus: 'erverv',
        assigned: 'wdad',
        duration: '100',
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        taskName: 'adawdawd',
        taskStatus: 'erverv',
        assigned: 'wdad',
        duration: '100',
        start_date: new Date(),
        end_date: new Date(),
      },
    ];
    this.projectTasksDataSource = new MatTableDataSource(this.projectTasks);

    this.projectNotics = [
      {
        title: 'awdawdawd',
        date: new Date(),
        from: 'awdawdawd',
        to: 'awdawdawd',
      },
      {
        title: 'awdawdawd',
        date: new Date(),
        from: 'awdawdawd',
        to: 'awdawdawd',
      },
      {
        title: 'awdawdawd',
        date: new Date(),
        from: 'awdawdawd',
        to: 'awdawdawd',
      },
      {
        title: 'awdawdawd',
        date: new Date(),
        from: 'awdawdawd',
        to: 'awdawdawd',
      },
      {
        title: 'awdawdawd',
        date: new Date(),
        from: 'awdawdawd',
        to: 'awdawdawd',
      },
    ];
    this.projectNoticesDataSource = new MatTableDataSource(this.projectNotics);

    this.projectFiles = [
      {
        uploadDate: new Date(),
        fileName: 'awdawd',
        user: 'awdawd',
        notes: 'awdawd',
        status: 1,
      },
      {
        uploadDate: new Date(),
        fileName: 'awdawd',
        user: 'awdawd',
        notes: 'awdawd',
        status: 5,
      },
      {
        uploadDate: new Date(),
        fileName: 'awdawd',
        user: 'awdawd',
        notes: 'awdawd',
        status: 2,
      },
      {
        uploadDate: new Date(),
        fileName: 'awdawd',
        user: 'awdawd',
        notes: 'awdawd',
        status: 0,
      },
    ];
    this.projectFilesDataSource = new MatTableDataSource(this.projectFiles);

    this.projectDocuments = [
      { name: 'awdawdawd', type: 'awdawdawd', comment: 'awdawdawd' },
      { name: 'awdawdawd', type: 'awdawdawd', comment: 'awdawdawd' },
      { name: 'awdawdawd', type: 'awdawdawd', comment: 'awdawdawd' },
    ];
    this.projectDocumentsDataSource = new MatTableDataSource(
      this.projectDocuments
    );

    this.projectWorkOrders = [
      {
        name: 'awdawdad',
        type: 'awdawdad',
        assigned: 'awdawdad',
        duration: 'awdawdad',
        start: new Date(),
        end: new Date(),
      },
      {
        name: 'awdawdad',
        type: 'awdawdad',
        assigned: 'awdawdad',
        duration: 'awdawdad',
        start: new Date(),
        end: new Date(),
      },
      {
        name: 'awdawdad',
        type: 'awdawdad',
        assigned: 'awdawdad',
        duration: 'awdawdad',
        start: new Date(),
        end: new Date(),
      },
      {
        name: 'awdawdad',
        type: 'awdawdad',
        assigned: 'awdawdad',
        duration: 'awdawdad',
        start: new Date(),
        end: new Date(),
      },
    ];
    this.workOrdersDataSource = new MatTableDataSource(this.projectWorkOrders);

    this.projectSupervisions = [
      {
        id: 'awdawdd',
        stage: 'awdawdd',
        assigned: 'awdawdd',
        Commissioning_date: new Date(),
        status: 'awdawdawd',
      },
      {
        id: 'awdawdd',
        stage: 'awdawdd',
        assigned: 'awdawdd',
        Commissioning_date: new Date(),
        status: 'awdawdawd',
      },
      {
        id: 'awdawdd',
        stage: 'awdawdd',
        assigned: 'awdawdd',
        Commissioning_date: new Date(),
        status: 'awdawdawd',
      },
    ];
    this.projectSupervisionDataSource = new MatTableDataSource(
      this.projectSupervisions
    );
  }

  open(content: any, data?: any, type?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type == 'mapModal' ? 'xl' : 'lg',
        centered: true,
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
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  return() {}

  confirm() {}

  share(data: any) {}
  uploadFile(data: any) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectTasksDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterNotices(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectNoticesDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterFiles(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectFilesDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilteWorkOrders(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.workOrdersDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterSupervision(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectSupervisionDataSource.filter = filterValue.trim().toLowerCase();
  }

  private getImage(file: File): void {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e: any) => this.uploadedFile.next(e.target.result);
      fr.readAsDataURL(file);
    } else {
      this.uploadedFile.next('');
    }
  }

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
}
