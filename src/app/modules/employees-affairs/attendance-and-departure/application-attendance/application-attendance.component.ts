import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, popup, tileLayer } from 'leaflet';
import { RestApiService } from 'src/app/shared/services/api.service';
import * as L from "leaflet";

@Component({
  selector: 'app-application-attendance',
  templateUrl: './application-attendance.component.html',
  styleUrls: ['./application-attendance.component.scss'],
})
export class ApplicationAttendanceComponent implements OnInit {
  mapOptions: any

  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'الحضور من التطبيق',
      en: 'Application Attendance',
    },
  };
  modalDetails: any;
  data: any = {
    employees: [],
    date: new Date(),
    period: 1,
  };
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  Latitude = '24.215';
  longitude = '24.215';

  date: any = new Date();

  icon: any = {
    url: '/assets/user-test.png',
    scaledSize: {
      width: 50,
      height: 50,
    },
  };


  mapData: any = {
    name: 'احمد المحمدي',
    position: 'موظف مكتب',
    period: 'تسجيل حضور الفترة الاولي',
    date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
    location: 'الفرع الاول للمؤسسة',
  };

  mapLat = 24.701735728926153
  mapLan = 46.71405309220546
  constructor(private api: RestApiService) {
    this.getData();
  }

  ngOnInit(): void {


  }

  getData() {
    this.api.get('../../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.employees = data.applicationAttendence;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  toLocal(date: any) {
    let lang = localStorage.getItem('lang');
    return date.toLocaleDateString(lang, this.options);
  }

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 24.701735728926153;
  lng: number = 46.71405309220546;

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: google.maps.MapMouseEvent) {
    // console.log($event.latLng);

    // this.markers.push({
    //   lat: $event.latLng,
    //   lng: $event.latLng,
    //   draggable: true,
    // });
  }

  setMapReq: any = false
  setMap(lat: any, lon: any, img: any, data: any) {
    this.setMapReq = false
    setTimeout(() => {
      let popupContent: any = `<p>${data?.name}  </p><p> ${data?.position}  </p><p>       ${data?.period} </p><p> ${data?.date}</p><p><i class="fa-solid fa-location-dot"style = "margin-inline-end: 10px"></i><span>     ${data?.location} </span></p>`;

      this.mapOptions = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
          marker([lat, lon], {
            icon: icon({
              iconUrl: img,
            }),
          }).bindPopup(popupContent, { closeButton: false, closeOnClick: false, autoPan: true, keepInView: true }).openPopup(),


        ],
        zoom: 5,
        center: latLng(lat, lon)
      };

      this.setMapReq = true
    }, 100);

  }


  employees: any = [
    {
      EmpId: 4213,
      name: 'awdw',
      jobTitle: 'wafdawf ',
      period: 'awf awf awf',
      location: 'bwdawd',
      mapLat: 24.7,
      mapLan: 46.7,
      image: '/assets/images/client-3.png',
      date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
      attend: 12,
      absence: 4,
      Late: 2
    },
    {
      EmpId: 4223,
      name: 'awdw',
      jobTitle: 'wafdawf ',
      period: 'awf vavv awf',
      location: 'bwdawd',
      mapLat: -28.7,
      mapLan: -52.7,
      image: '/assets/images/client-3.png',
      date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
      attend: 12,
      absence: 4,
      Late: 2
    }, {
      EmpId: 4233,
      name: 'awdw',
      jobTitle: 'wafdawf ',
      period: 'mvng mvng mvng',
      location: 'bwdawd',
      mapLat: 34.7,
      mapLan: 56.7,
      image: '/assets/images/client-3.png',
      date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
      attend: 12,
      absence: 4,
      Late: 2
    },
    {
      EmpId: 4243,
      name: 'awdw',
      jobTitle: 'wafdawf ',
      period: 'bvvawa bvvawa bvvawa',
      location: 'bwdawd',
      mapLat: 44.7,
      mapLan: 66.7,
      image: '/assets/images/client-3.png',
      date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
      attend: 12,
      absence: 4,
      Late: 2
    },
  ]

  clickOnEmployee(employee: any) {
    let mapData: any = {
      name: employee.name,
      position: employee.jobTitle,
      period: employee.period,
      date: employee?.date,
      location: employee.location,
    };

    this.setMap(employee.mapLat, employee.mapLan, employee.image, mapData)

  }

  onMapReady(map: L.Map) {
    let popupContent: any = `<p>${this.modalDetails?.name}  </p><p> ${this.modalDetails?.jobTitle}  </p><p>       ${this.modalDetails?.period} </p> <p>${this.modalDetails.date}</p><p><i class="fa-solid fa-location-dot"style = "margin-inline-end: 10px"></i><span>     ${this.modalDetails?.location} </span></p>`;
    console.log();
    var popup = L.popup({ closeButton: false, closeOnClick: false, autoPan: true, keepInView: true }).setContent(popupContent).setLatLng([this.modalDetails.mapLat, this.modalDetails.mapLan])
    map.openPopup(popup)
  }
}
