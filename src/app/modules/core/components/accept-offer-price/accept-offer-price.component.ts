import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accept-offer-price',
  templateUrl: './accept-offer-price.component.html',
  styleUrls: ['./accept-offer-price.component.scss'],
})
export class AcceptOfferPriceComponent implements OnInit {
  pinCode: any;
  @ViewChild('pinCodeModal') otpModal: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  checkPinCode() {
    if (this.pinCode == '2424') {
      this.modalService.dismissAll();
    }
  }

  open(content: any) {
    this.modalService
      .open(content, {
        size: 'md',
        centered: true,
      })
      .result.then();
  }

  check(data: any) {
    this.open(this.otpModal);
  }
  onOtpChange(data: any) {
    this.pinCode = data;
  }
}
