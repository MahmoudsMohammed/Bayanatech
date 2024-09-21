import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  fileName = '';
  file: any;

  userInfo: any;
  closeResult: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        animation: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed  `;
        }
      );
  }

  changeInfo(data: any) {
    // console.log(data);
  }

  setFile(event: any) {
    this.file = event?.target?.files[0];
    this.fileName = this.file?.name;
    // console.log(this.file);
  }

  changeImage() {
    // console.log(this.file);
  }
  openModal(content: any, type?: any, size?: any, position?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: size ? size : 'md',
        centered: !position ? true : false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any, type?: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
