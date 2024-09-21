import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
// import { SelectionModel, SelectionModel } from '@ng-select/ng-select';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  @ViewChild('mailPaginator') mailPaginator!: MatPaginator;
  @ViewChild('mailSort') mailSort!: MatSort;
  @ViewChild('smsPaginator') smsPaginator!: MatPaginator;
  @ViewChild('smsSort') smsSort!: MatSort;
  @ViewChild('filesPaginator') filesPaginator!: MatPaginator;
  @ViewChild('filesSort') filesSort!: MatSort;
  @ViewChild('archievedProjectsPaginator')
  archievedProjectsPaginator!: MatPaginator;
  @ViewChild('archievedProjectsSort') archievedProjectsSort!: MatSort;
  @ViewChild('currentProjectsPaginator')
  currentProjectsPaginator!: MatPaginator;
  @ViewChild('currentProjectsSort') currentProjectsSort!: MatSort;

  title: any = {
    main: {
      name: {
        ar: 'العملاء',
        en: 'Customers',
      },
      link: '/customers/CustomerOperations',
    },
    sub: {
      ar: 'عمليات على العملاء',
      en: 'Customers Services',
    },
  };
  select: any = {
    selected: null,
    mobileSelect: [],
    mailSelect: [],
  };
  data: any = {
    fileType: {
      NameAr: '',
      Id: '',
      NameEn: '',
    },
    sms: new MatTableDataSource([{}]),
    files: new MatTableDataSource([{}]),
    documents: [
      {
        description: 'awdawd awdawd',
        type: { Name: 'adawdwd' },
        name: 'awdawdawd',
      },
    ],
    archievedProjects: new MatTableDataSource([{}]),
    currentProjects: new MatTableDataSource([{}]),
    mail: new MatTableDataSource([{}]),
    filesTypes: [],
  };
  displayedColumns: any = {
    email: ['date', 'sender', 'addressMessage', 'messageContain', 'operations'],
    sms: ['date', 'sender', 'messageContain', 'operations'],

    currentProjects: ['ProjectNumber', 'Projecttype', 'SubProjecttype', 'Site'],
    archievedProjects: [
      'date',
      'ProjectNumber',

      'Projecttype',
      'SubProjecttype',
      'Site',
    ],

    files: [
      'ModelName',
      'Description',
      'User',
      'UploadDate',
      'FileType',
      'operations',
    ],

    usersMail: ['select', 'name', 'email'],
    usersMobile: ['select', 'name', 'mobile'],
  };
  modalDetails: any;
  modal?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private api: RestApiService
  ) {
    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
    this.getSelect();
    this.getCustomers();
  }

  ngOnInit(): void {
    this.data.files = new MatTableDataSource([{}]);
  }

  openModal(template: TemplateRef<any>, data?: any, modalType?: any) {
    // openModal(template: any, data: any, modalType: any) {
    this.resetModal();
    if (data) {
      this.modalDetails = data;
    }
    if (modalType) {
      this.modalDetails.type = modalType;
    }

    this.modal = this.modalService.show(
      template,
      Object.assign({}, { class: modalType })
    );
  }
  resetModal() {
    // this.control.clear();
    this.modalDetails = {
      type: null,
    };
  }
  getCustomers() {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        // get data

        this.data.mail = new MatTableDataSource(data.customersData.mail);
        this.data.mail.paginator = this.mailPaginator;
        // this.data.mail.sort = this.mailSort;

        this.data.sms = new MatTableDataSource(data.customersData.sms);
        this.data.sms.paginator = this.smsPaginator;
        // this.data.sms.sort = this.smsSort;

        this.data.archievedProjects = new MatTableDataSource(
          data.customersData.archievedProjects
        );
        this.data.archievedProjects.paginator = this.archievedProjectsPaginator;
        // this.data.archievedProjects.sort = this.archievedProjectsSort;

        this.data.currentProjects = new MatTableDataSource(
          data.customersData.currentProjects
        );
        this.data.currentProjects.paginator = this.currentProjectsPaginator;
        // this.data.currentProjects.sort = this.currentProjectsSort;

        this.data.files = new MatTableDataSource(data.customersData.files);
        this.data.files.paginator = this.filesPaginator;
        // this.data.files.sort = this.filesSort;

        this.data.filesTypes = data.filesTypes;
        this.data.orgEmail = 'awdw@awd.com';
        // console.log(this.data.files);
      },
    });
  }
  getSelect() {
    this.api.get('../../../../assets/data.json').subscribe({
      next: (data: any) => {
        // get select
        this.select = {
          selected: null,

          mobileSelect: data.customersSelect1,
          mailSelect: data.customersSelect2,
        };
      },
    });
  }
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  getCustomersAccount(data: any) {}
  sendMessages(data: any) {
    // console.log(this.selection);
  }
  addNewIssuer() {}
  addFilePost() {}
  openNewWindow(link: any) {
    window.open(
      'https://tameercloud.com' + link,
      'newwindow',
      'width=300,height=250,top=300,left=250'
    );
  }
  addNewFile(addFileForm: NgForm) {
    let file = {
      description: addFileForm.controls['FileDescription'].value,
      type: addFileForm.controls['FileType'].value,
      name: this.control?.value[0]?.name,
    };
    this.data.files.push(file);
    this.control.clear();
    addFileForm.resetForm();
  }
  deleteEmails() {
    // console.log(this.modalDetails.SenderUserName);
    this.resetModal();
    this.modal?.hide();
  }
  selection = new SelectionModel<any>(true, []);

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =
      this.modalDetails.type == 'sendEmails'
        ? this.select.mailSelect.length
        : this.select.mobileSelect.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    let data =
      this.modalDetails.type == 'sendEmails'
        ? this.select.mailSelect
        : this.select.mobileSelect;
    this.selection.select(...data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
