import { Component } from '@angular/core';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RestApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/dash/support',
    },
    sub: {
      ar: ' فتح تذكرة دعم فني جديدة',
      en: ' Open a new technical support ticket',
    },
  };
  requests: any;
  columns: any = [
    {
      ar: 'العنوان',
      en: 'Address',
    },
    {
      ar: 'النوع',
      en: 'type',
    },
    {
      ar: 'الاقسام',
      en: 'Departments',
    },
    {
      ar: 'أولوية',
      en: 'priority',
    },
    {
      ar: 'موضوع الطلب',
      en: 'Topic',
    },
    {
      ar: 'التاريخ',
      en: 'Date',
    },
    {
      ar: 'الملف',
      en: 'File',
    },
  ];
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
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
  }
  open(content: any, data: any, size: any, positions?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: size,
        centered: !positions ? true : false,
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
    this.api.get('../../../../../../assets/dropMenu.json').subscribe({
      next: (data: any) => {
        // assign requests to table
        this.requests = data.requests;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
}
