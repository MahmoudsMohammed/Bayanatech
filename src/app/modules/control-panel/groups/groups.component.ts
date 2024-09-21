import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/services/api.service';
import { TreeMode } from 'tree-ngx';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/controlpanel',
    },
    sub: {
      ar: 'المجموعات ',
      en: ' Groups',
    },
  };
  options = {
    mode: TreeMode.MultiSelect,
    checkboxes: true,
    alwaysEmitSelected: false,
  };
  selectedTask1: any;

  nodeItems: any = [];

  selectedPermission: any = 1;
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
  }
  getData() {
    this.api.get('../../../../../../assets/cpanel.json').subscribe({
      next: (data: any) => {
        this.nodeItems = data.tree;
      },
      error: (error) => {
        // console.log(error);
      },
    });
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
}
