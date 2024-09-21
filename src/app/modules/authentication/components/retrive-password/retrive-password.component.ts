import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-retrive-password',
  templateUrl: './retrive-password.component.html',
  styleUrls: ['./retrive-password.component.scss'],
})
export class RetrivePasswordComponent {
  constructor(
    private toast: ToastrService,
    private modalService: NgbModal,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  send(data: any) {
    if (data?.email) {
      this.toast.success(
        this.translate.instant('Password Send Successfully'),
        this.translate.instant('Retrive Password')
      );
    }
  }
}
