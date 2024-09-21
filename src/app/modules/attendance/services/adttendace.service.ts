import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class attendanceDataService {
  attendanceData: {
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
  }[] = [];
}
