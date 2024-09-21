import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  text = false;
  qrCodeCheckValue: string;
  checked = false;

  constructor(
    private toast: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.qrCodeCheckValue = Math.floor(1000 + Math.random() * 9000).toString();
  }

  ngOnInit(): void {}

  login(data: any) {
    this.toast.success(
      this.translate.instant('Login Successfully'),
      this.translate.instant('Login')
    );
    this.router.navigateByUrl('dash');
  }

  refreshQrCode() {
    this.qrCodeCheckValue = Math.floor(1000 + Math.random() * 9000).toString();
  }
}
