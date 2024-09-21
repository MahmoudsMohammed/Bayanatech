import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-file-uploader-center',
  templateUrl: './file-uploader-center.component.html',
  styleUrls: ['./file-uploader-center.component.scss'],
})
export class FileUploaderCenterComponent {
  title: any = {
    main: {
      name: {
        ar: 'إدارة المشاريع',
        en: 'Projects Manegment',
      },
      link: '/projects',
    },
    sub: {
      ar: '  مركز تحميل ملفات المشروع',
      en: '  Project files upload center',
    },
  };

  displayedColumns: string[] = [
    'projectNumber',
    'fileName',
    'uploadDate',
    'user',
    'notes',

    'operations',
  ];
  data: any = {
    filter: {
      enable: false,
      date: null,
    },
    file: {
      NameAr: '',
      NameEn: '',
      id: 0,
    },
    files: {
      NameAr: '',
      NameEn: '',
      id: 0,
    },
    allProjectNumbers: [],
  };

  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private modalService: BsModalService,
    private api: RestApiService
  ) {
    this.getData();
  }

  getData() {
    this.api.get('../../../../assets/projectManegment.json').subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.projectFiels);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.data.allProjectNumbers = data.allProjectNumbers;
      },
      error: (error) => {
        // console.log(error);
      },
    });
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        this.data.files = data.filesTypes;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  selection = new SelectionModel<any>(true, []);
  modalDetails: any;
  addNewSupervision?: BsModalRef;
  employees: any[] = [
    {
      name: '',
      duration: '',
      durationType: '',
      ratio: '',
      salary: '',
      cost: '',
    },
  ];
  addEmployee() {
    let newEmployee = {
      name: '',
      duration: '',
      ratio: '',
      salary: '',
      cost: '',
    };
    this.employees.push(newEmployee);
  }

  log(asd: any) {
    // console.log(asd);
    // console.log(asd);
  }

  applyFilter(event: Event) {}

  availableSupervision() {}
  decline() {}
  confirmDelete() {}
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
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
