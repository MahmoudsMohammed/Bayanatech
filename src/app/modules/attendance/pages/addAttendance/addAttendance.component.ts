import { attendanceDataService } from './../../services/adttendace.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-addAttendance',
  templateUrl: './addAttendance.component.html',
  styleUrls: ['./addAttendance.component.css'],
})
export class AddAttendanceComponent implements OnInit {
  @ViewChild('latLonForm', { static: true }) latLonForm!: any;
  @ViewChild('lng', { static: true }) lng!: any;
  @ViewChild('lat', { static: true }) lat!: any;
  @ViewChild('form', { static: true }) nameForm!: NgForm;

  locationName!: string;
  coordinates!: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  center!: {
    lng: number;
    lat: number;
  };
  router = inject(Router);
  actRouter = inject(ActivatedRoute);
  attendanceDataService = inject(attendanceDataService);
  locationData!: {
    name: string;
    coordinates: {
      xmin: number;
      ymin: number;
      xmax: number;
      ymax: number;
    };
    center: {
      lng: number;
      lat: number;
    };
  };
  ngOnInit() {
    this.locationName = this.actRouter.snapshot.params['name'];
    if (this.locationName === 'new') {
      this.locationData = {
        name: '',
        coordinates: {
          xmin: 0,
          ymin: 0,
          xmax: 0,
          ymax: 0,
        },
        center: {
          lng: 0,
          lat: 0,
        },
      };
      this.locationData.name = this.locationName;
    } else {
      this.locationData = this.attendanceDataService.attendanceData.find(
        (data) => data.name === this.locationName
      )!;
    }

    this.initialMap();
  }

  initialMap() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Sketch',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/widgets/Search',
      'esri/geometry/Extent',
      'esri/geometry/support/webMercatorUtils',
    ])
      .then(
        ([
          Map,
          MapView,
          Sketch,
          GraphicsLayer,
          Graphic,
          Search,
          Extent,
          webMercatorUtils,
        ]) => {
          const map = new Map({
            basemap: 'streets-navigation-vector',
          });

          const view = new MapView({
            container: 'viewDiv',
            map: map,
            center: [46.7115, 24.7253],
            zoom: 12,
          });
          const drawRectangleFromExtent = (
            xmin: number,
            ymin: number,
            xmax: number,
            ymax: number
          ) => {
            graphicsLayer.removeAll();
            const lowerLeft = webMercatorUtils.webMercatorToGeographic(
              new Extent({
                xmin: xmin,
                ymin: ymin,
                xmax: xmax,
                ymax: ymax,
                spatialReference: { wkid: 3857 },
              })
            );
            const rectangle = new Graphic({
              geometry: new Extent({
                xmin: lowerLeft.xmin,
                ymin: lowerLeft.ymin,
                xmax: lowerLeft.xmax,
                ymax: lowerLeft.ymax,
                spatialReference: { wkid: 4326 },
              }),
              symbol: {
                type: 'simple-fill',
                color: [0, 0, 255, 0.3],
                outline: {
                  color: [0, 0, 255, 1],
                  width: 2,
                },
              },
            });
            this.coordinates = {
              xmin: xmin,
              ymin: ymin,
              xmax: xmax,
              ymax: ymax,
            };
            this.center = {
              lng: rectangle.geometry.center.longitude,
              lat: rectangle.geometry.center.latitude,
            };
            graphicsLayer.add(rectangle);
          };

          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const drawRectangle = (lng: number, lat: number, size = 0.01) => {
            graphicsLayer.removeAll();
            const rectangle = new Graphic({
              geometry: new Extent({
                xmin: lng - size,
                ymin: lat - size,
                xmax: lng + size,
                ymax: lat + size,
                spatialReference: { wkid: 4326 },
              }),
              symbol: {
                type: 'simple-fill',
                color: [0, 0, 255, 0.3],
                outline: {
                  color: [0, 0, 255, 1],
                  width: 2,
                },
              },
            });
            graphicsLayer.add(rectangle);

            const lowerLeft = webMercatorUtils.geographicToWebMercator(
              new Extent({
                xmin: lng - size,
                ymin: lat - size,
                xmax: lng + size,
                ymax: lat + size,
                spatialReference: { wkid: 4326 },
              })
            );
            this.coordinates = {
              xmin: lowerLeft.xmin,
              ymin: lowerLeft.ymin,
              xmax: lowerLeft.xmax,
              ymax: lowerLeft.ymax,
            };
            this.center = {
              lng: lowerLeft.center.longitude,
              lat: lowerLeft.center.latitude,
            };
          };

          const searchWidget = new Search({
            view: view,
          });

          view.ui.add(searchWidget, {
            position: 'top-right',
          });

          this.latLonForm.nativeElement.addEventListener('submit', (e: any) => {
            const lng = +this.lng.nativeElement.value,
              lat = +this.lat.nativeElement.value;
            view.graphics.removeAll();
            view.center = [lng, lat];
            drawRectangle(lng, lat);
            e.preventDefault();
          });

          searchWidget.on('search-complete', (event: any) => {
            if (
              event.results.length > 0 &&
              event.results[0].results.length > 0
            ) {
              const searchResult = event.results[0].results[0].feature.geometry;
              drawRectangle(searchResult.longitude, searchResult.latitude);
            }
          });

          const sketch = new Sketch({
            layer: graphicsLayer,
            view: view,
            creationMode: 'update',
          });

          sketch.on('update', (event: any) => {
            if (event.state === 'complete') {
              const extent = event.graphics[0].geometry.extent;
              const { xmin, ymin, xmax, ymax } = extent;
              this.coordinates = {
                xmin,
                ymin,
                xmax,
                ymax,
              };
              this.center = {
                lng: extent.center.longitude,
                lat: extent.center.latitude,
              };
            }
          });

          if (this.locationName === 'new') {
            drawRectangle(46.7115, 24.7253);
          } else {
            view.center = [
              this.locationData.center.lng,
              this.locationData.center.lat,
            ];
            drawRectangleFromExtent(
              this.locationData.coordinates.xmin,
              this.locationData.coordinates.ymin,
              this.locationData.coordinates.xmax,
              this.locationData.coordinates.ymax
            );
          }
        }
      )
      .catch((err) => {
        console.error('EsriLoader: ', err);
      });
  }

  save(form: NgForm) {
    if (this.locationName === 'new') {
      this.locationData.name = form.value.location;
      this.locationData.coordinates = this.coordinates;
      this.locationData.center = this.center;
      this.attendanceDataService.attendanceData.push(this.locationData);
    } else {
      this.attendanceDataService.attendanceData.find(
        (data) => data.name === this.locationName
      )!.coordinates = this.coordinates;
      this.attendanceDataService.attendanceData.find(
        (data) => data.name === this.locationName
      )!.center = this.center;
      this.attendanceDataService.attendanceData.find(
        (data) => data.name === this.locationName
      )!.name = form.value.location;
    }
    this.router.navigate(['/attendance/attendanceList']);
  }
}
