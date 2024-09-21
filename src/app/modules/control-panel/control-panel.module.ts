import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { BackupComponent } from './backup/backup.component';
import { ActionsComponent } from './actions/actions.component';
import { OrganizationComponent } from './organization/organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeNgxModule } from 'tree-ngx';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { ProjectManagementRoutingModule } from '../project-management/project-management-routing.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TreeviewModule } from 'ngx-treeview';
import { GanttChartView, ScheduleChartView, LoadChartView } from './gantt-chart/gannt-chart-src/GanttChartAngular.Components';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
@NgModule({
  declarations: [
    UsersComponent,
    GroupsComponent,
    BackupComponent,
    ActionsComponent,
    OrganizationComponent,
    GanttChartView,
    GanttChartComponent,
    ScheduleChartView,
    LoadChartView,
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    SharedModule,
    FormsModule,
    TreeNgxModule,
    CommonModule,
    ProjectManagementRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    MatIconModule,
    MatRadioModule,
    NgbModule,
    MatProgressBarModule,
    ModalModule,
    TabsModule,
    TimepickerModule,
    NgApexchartsModule,
    BsDropdownModule,
    MatStepperModule,
    NgxHijriGregorianDatepickerModule,
    NgOtpInputModule,
    TreeviewModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    AccordionModule,
  ],
})
export class ControlPanelModule { }
