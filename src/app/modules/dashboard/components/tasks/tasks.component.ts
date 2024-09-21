import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NodeItem, TreeCallbacks, TreeMode } from 'tree-ngx';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: any;
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/dash/tasks',
    },
    sub: {
      ar: 'المهام',
      en: 'Tasks',
    },
  };
  closeResult: any;
  selectedItems: any;
  selectedTask1: any;
  selectedTask2: any;
  stratDate = new Date();
  endDate = new Date();
  expected_project_duration = new Date();
  expected_end_date = new Date();
  items = [
    {
      assignedTo: 'محمد هلهل	',
      ProjectNumber: '2022-63	',
      CustomerName: 'احمد',
      taskStatus: 'منخفض',
    },
  ];
  nodeItems: any;
  users: any;
  selectedUser: any;
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
  constructor(private modalService: NgbModal) {}

  private getDismissReason(reason: any, type?: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
      // FileUploadValidators.accept(['image/*']),
      FileUploadValidators.filesLimit(1),
    ]
  );
  open(content: any, type?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type == 'AddOption' || type == 'infoAction' ? 'md' : 'xl',
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

    this.chartOptions = {
      series: [44],
      chart: {
        type: 'donut',
      },
      labels: null,
      legend: null,

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
          },
        },
      ],
    };
  }
  // Save row
  save(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    // console.log('Row saved: ' + rowIndex);
    // console.log(row);
  }
  addNewTask() {}
  saveOption(data: any) {}
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.name_ar.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
  }
  // Delete row
  delete(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    this.rows.splice(rowIndex, 1);
    // console.log('Row deleted: ' + rowIndex);
  }
  confirm() {}

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
