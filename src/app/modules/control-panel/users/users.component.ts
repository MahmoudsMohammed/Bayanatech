import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/services/api.service';
import { TreeMode } from 'tree-ngx';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  title: any = {
    main: {
      name: {
        ar: 'لوحة التحكم',
        en: 'Control Panel',
      },
      link: '/controlpanel',
    },
    sub: {
      ar: 'المستخدمين',
      en: 'Users',
    },
  };

  users: any;

  ngOnInit(): void {}

  treeItems: any = [
    {
      id: '0',
      name: 'Select All',
      children: [
        {
          id: '1',
          name: 'Batman',
        },
        {
          id: '2',
          name: 'Superman',
        },
        {
          id: '3',
          name: 'awdawn',
        },
        {
          id: '4',
          name: 'fawfdawfn',
        },
        {
          id: '5',
          name: 'awfawfawf',
        },
        {
          id: '6',
          name: 'fdbdfbdf',
        },
      ],
    },
  ];

  date: any = new Date();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('onlinedatapaginator') onlinedatapaginator!: MatPaginator;
  @ViewChild('onlinedata') onlinedata!: MatSort;

  @ViewChild('userPermissionstable') userPermissionstable!: MatSort;
  @ViewChild('userPermissionstablepaginator')
  userPermissionspag!: MatPaginator;

  @ViewChild('Permissionstable') Permissionstable!: MatSort;
  @ViewChild('Permissionstablepaginator')
  Permissionspag!: MatPaginator;

  @ViewChild('taskstable') taskstable!: MatSort;
  @ViewChild('taskstablepaginator')
  taskstablepaginator!: MatPaginator;

  @ViewChild('statementsTable') statementsTable!: MatSort;
  @ViewChild('statementsTablepag')
  statementsTablepag!: MatPaginator;

  @ViewChild('projectsTable') projectsTable!: MatSort;
  @ViewChild('projectsTablepag')
  projectsTablepag!: MatPaginator;

  displayedColumns: string[] = [
    'UserId',
    'UserName',
    'FullName',
    'JobName',
    'DepartmentName',
    'GroupName',
    'BranchName',
    'Status',
    'LastLoginDate',
    'appStatus',
    'DeviceId',
    'DeviceType',
    'operations',
  ];
  modals: any = {
    rows: {
      usersPermissions: new MatTableDataSource([{}]),
      permissions: new MatTableDataSource([{}]),
      tasks: new MatTableDataSource([{}]),
      projects: new MatTableDataSource([{}]),
      statments: new MatTableDataSource([{}]),
      online: new MatTableDataSource([{}]),
    },
    columns: {
      online: [
        'UserName',
        'JobName',
        'DepartmentName',
        'LastLoginDate',
        'GroupName',
        'BranchName',
        'operations',
      ],
      tasks: [
        'select',
        'DescriptionAr',
        'ProjectNumber',
        'ProjSubTypeId',
        'operations',
      ],
      projects: [
        'select',
        'ProjectNo',
        'CustomerName',
        'ProjectTypesName',
        'operations',
      ],
      payments: ['TaskName', 'SettingNo', 'SettingNote', 'operations'],
      permissions: ['FullName', 'Status', 'Insert', 'Update', 'Delete'],
      usersPermissions: [
        'PriviLedgeName',
        'Status',
        'Insert',
        'Update',
        'Delete',
      ],
    },
  };
  data: any = {
    users: new MatTableDataSource([{}]),
    filter: {
      enable: false,
      date: null,
    },
  };

  selectedCategory: any = 0;
  constructor(private api: RestApiService, private modalService: NgbModal) {
    this.getData();
  }

  options = {
    mode: TreeMode.MultiSelect,
    checkboxes: true,
    alwaysEmitSelected: false,
  };
  selectedTask1: any;

  nodeItems: any;
  getData() {
    this.api.get('../../../../../../assets/cpanel.json').subscribe({
      next: (data: any) => {
        // assign data to table
        this.data.users = new MatTableDataSource(data.users);
        this.data.users.paginator = this.paginator;
        this.data.users.sort = this.sort;

        this.selectAllForDropdownItems(data.users);

        // assign tasks data to table

        this.modals.rows.tasks = new MatTableDataSource(data.tasks);
        this.modals.rows.tasks.paginator = this.taskstablepaginator;
        this.modals.rows.tasks.sort = this.taskstable;
        // assign projects data to table
        this.modals.rows.projects = new MatTableDataSource(data.projects);
        this.modals.rows.projects.paginator = this.paginator;
        this.modals.rows.projects.sort = this.sort;
        // assign statements data to table
        this.modals.rows.statments = new MatTableDataSource(data.statments);
        this.modals.rows.statments.paginator = this.statementsTablepag;
        this.modals.rows.statments.sort = this.statementsTable;
        // assign online data to table
        this.modals.rows.online = new MatTableDataSource(data.users);
        this.modals.rows.online.paginator = this.onlinedatapaginator;
        this.modals.rows.online.sort = this.onlinedata;

        // assign permissions data to table
        this.modals.rows.permissions = new MatTableDataSource(data.permissions);
        this.modals.rows.permissions.paginator = this.Permissionspag;
        this.modals.rows.permissions.sort = this.Permissionstable;
        // assign usersPermissions data to table
        this.modals.rows.usersPermissions = new MatTableDataSource(
          data.usersPermissions
        );
        this.modals.rows.usersPermissions.paginator = this.userPermissionspag;
        this.modals.rows.usersPermissions.sort = this.userPermissionstable;

        this.nodeItems = data.tree;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  applyFilter(event: Event) {}
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

  selection = {
    tasks: new SelectionModel<any>(true, []),
    projects: new SelectionModel<any>(true, []),
  };
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.tasks.selected.length;
    const numRows = this.modals.rows.tasks.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.tasks.clear();
      return;
    }

    this.selection.tasks.select(...this.modals.rows.tasks.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.tasks.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  //
  //
  //

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedPro() {
    const numSelected = this.selection.projects.selected.length;
    const numRows = this.modals.rows.projects.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRowsPro() {
    if (this.isAllSelectedPro()) {
      this.selection.projects.clear();
      return;
    }

    this.selection.projects.select(...this.modals.rows.projects.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabelPro(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedPro() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.projects.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  selectAllForDropdownItems(items: any) {
    let allSelect = (items: any) => {
      items.forEach((element: any) => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };

    allSelect(items);
  }
}
