import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private modalService: NgbModal,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  send(data: any) {
    // // console.log(data);

    if (data?.email) {
      this.toast.success(
        this.translate.instant('Email Send Successfully'),
        this.translate.instant('Forget Password')
      );
    }
  }
}
