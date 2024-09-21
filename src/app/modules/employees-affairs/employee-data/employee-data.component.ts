import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RestApiService } from 'src/app/shared/services/api.service';
import { fade } from 'src/app/shared/animations/toggleBtn.animation';
declare let printJS: any;

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
  animations: [fade],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EmployeeDataComponent {
  title: any = {
    main: {
      name: {
        ar: 'شؤون الموظفين',
        en: 'Employees Affairs',
      },
      link: '/employees',
    },
    sub: {
      ar: 'بيانات الموظفين',
      en: 'Employees Data',
    },
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any = {
    selectedEmployee: null,
    employeesData: new MatTableDataSource([{}]),
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
  employee: any = null;
  statics: any = {
    open: false,
    data: {
      WithoutContracts: 2,
      WithoutMedicalInsurance: 12,
      DidnotStartWork: 2,
      HaveCustodies: 3,
      HaveLoans: 0,
      HaveDicounts: 3,
    },
  };
  displayedColumns: string[] = [
    'JobId',
    'EmployeeName',
    'NationalityName',
    'Salary',
    'JobName',
    'Email',
    'Mobile',
    'BranchName',
    'NationalId',
    'UserName',
    'operations',
  ];
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
  }

  getData() {
    this.api.get('../../../../../assets/employee.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.employeesData = new MatTableDataSource(data.employeesData);
        this.data.employeesData.paginator = this.paginator;
        this.data.employeesData.sort = this.sort;
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

  // print(id: any) {
  //   //const printContents = document.getElementById(divName).innerHTML;
  //   const printContents: any = window.document.getElementById(id)!.innerHTML;
  //   var originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  //   window.location.reload();
  // }



  applyFilter(event: Event) {}
  open(content: any, data?: any, type?: any) {
    if (data && type == 'edit') {
      // this.modalDetails = data;
      // this.modalDetails['id'] = 1;
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
