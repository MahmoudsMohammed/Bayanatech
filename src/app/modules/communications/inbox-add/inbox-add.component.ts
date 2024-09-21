import { Component } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateType } from 'ngx-hijri-gregorian-datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { BehaviorSubject, Subscription } from 'rxjs';
@Component({
  selector: 'app-inbox-add',
  templateUrl: './inbox-add.component.html',
  styleUrls: ['./inbox-add.component.scss'],
})
export class InboxAddComponent {
  title: any = {
    main: {
      name: {
        ar: 'الاتصالات الإدارية',
        en: 'Administrative Communications',
      },
      link: '/communications',
    },
    sub: {
      ar: 'الخطابات الواردة ',
      en: ' Inbox Letters',
    },
  };
  constructor(private modalService: NgbModal) {
    this.subscription = this.control.valueChanges.subscribe(
      (values: Array<File>) => this.getImage(values[0])
    );
  }
  open(content: any, data: any, size: any) {
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
  // selectedDate: any;
  // selectedDateType = DateType.Hijri;
  // date?: NgbDate;

  // upload img
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
