import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent {
  title: any = {
    main: {
      name: {
        ar: 'الاتصالات الإدارية',
        en: 'Administrative Communications',
      },
      link: '/communications',
    },
    sub: {
      ar: 'البحث في الصادر',
      en: 'Search in Outbox',
    },
  };
  data: any = {
    tempData: null,
    alloutbox: new MatTableDataSource([{}]),
    filter: {
      enable: false,
      date: null,
      searchType: null,
    },
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'OutInTypeName',
    'Number',
    'inBox',
    'Date',
    'Topic',
    'FileCount',
    'ProjectNumber',
    'CustomerName',
    'OutInBoxTypeName',
    'ArchiveFilesName',
    'SideFromName',
    'SideToName',
    'operations',
  ];
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
  }
  open(content: any, data: any, size: any) {
    this.data.tempData = data;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: size,
        centered: true,
      })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  getData() {
    this.api.get('../../../../../../assets/calls.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.alloutbox = new MatTableDataSource(data.alloutbox);
        this.data.alloutbox.paginator = this.paginator;
        this.data.alloutbox.sort = this.sort;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
  applyFilter(event: Event) {}
}
