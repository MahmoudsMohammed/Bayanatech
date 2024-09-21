import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/services/api.service';
import { fade } from 'src/app/shared/animations/toggleBtn.animation';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { BehaviorSubject, Subscription } from 'rxjs';
@Component({
  selector: 'app-employees-archive',
  templateUrl: './employees-archive.component.html',
  styleUrls: ['./employees-archive.component.scss'],
  animations: [fade],
})
export class EmployeesArchiveComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'ارشيف الموظفين',
      en: 'Staff Archive',
    },
  };
  lang: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any = {
    employeesArchive: new MatTableDataSource([{}]),
    filter: {
      show: 1,
    },
    employeeAttachment: [],
    employeeAllowances: [],
    employeeVacations: [],
    employeeDisscount: [],
    employeeAlloans: [],
    selectedAttachment: {
      AttachmentId: 0,
      AttachmentName: '',
      Date: '',
      Notes: '',
    },
    selectedVacations: {
      vacationType: '',
      Date: '',
      vacationReason: '',
    },
  };
  searchBox: any = {
    open: false,
    searchType: null,
  };
  statics: any = {
    open: false,
    data: {
      Esteqala: 5,
      Fasl: 22,
      ContractEnd: 12,
      Death: 2,
      OtherReasins: 4,
    },
  };
  displayedColumns: string[] = [
    'EmployeeName',
    'EmpServiceDuration',
    'NationalityName',
    'BranchName',
    'WorkStartDate',
    'EndWorkDate',
    'ResonLeave',
    'Mobile',
    'operations',
  ];
  selectedUser: any
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
    api.lang.subscribe((res) => {
      this.lang = res;
    });
  }

  getData() {
    this.api.get('../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.employeesArchive = new MatTableDataSource(
          data.employeesArchive
        );
        this.data.employeesArchive.paginator = this.paginator;
        this.data.employeesArchive.sort = this.sort;
        this.data.employeeAttachment = data.employeeAttachment;
        this.data.employeeAllowances = data.employeeAllowances;
        this.data.employeeVacations = data.employeeVacations;
        this.data.employeeDisscount = data.employeeDisscount;
        this.data.employeeAlloans = data.employeeAlloans;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  applyFilter(event: Event) { }
  open(content: any, data?: any, type?: any) {
    if (data && (type == 'edit' || type == 'report')) {
      // this.modalDetails = data;
      // this.modalDetails['id'] = 1;
      this.selectedUser = data;
    }


    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: type ? 'xl' : 'lg',
        centered: type ? false : true,
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
