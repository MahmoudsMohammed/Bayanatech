import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalLayoutComponent } from './layouts/vertical-layout/vertical-layout.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VerticalSidebarComponent } from './components/vertical-sidebar/vertical-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { HijriDatePipe } from './pipes/hijriDate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatSortModule } from '@angular/material/sort';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TreeviewModule } from 'ngx-treeview';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PagesHeaderComponent } from './components/pages-header/pages-header.component';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { ProjectDetailsComponent } from '../modules/project-management/track-projects/project-details/project-details.component';
import { MatRadioModule } from '@angular/material/radio';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { SupervisionsComponent } from '../modules/project-management/supervisions/supervisions.component';
import { GeneralAlertComponent } from '../modules/employees-affairs/general-alert/general-alert.component';
import { SafePipe } from './pipes/safe.pipe';
import { AgmCoreModule } from '@agm/core';
import { EndServiceRewardComponent } from './reports/end-service-reward/end-service-reward.component';

@NgModule({
  declarations: [
    VerticalLayoutComponent,
    HeaderComponent,
    FooterComponent,
    VerticalSidebarComponent,
    GeneralAlertComponent,
    NotFoundComponent,
    HijriDatePipe,
    NavigatorComponent,
    NavigatorComponent,
    PagesHeaderComponent,
    ProjectDetailsComponent,
    SupervisionsComponent,
    SafePipe,
    EndServiceRewardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    ModalModule,
    ButtonsModule,
    NgSelectModule,
    NgxDatatableModule,
    PaginationModule,
    NgApexchartsModule,
    BsDatepickerModule,
    FileUploadModule,
    BsDropdownModule,
    TreeviewModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    NgxHijriGregorianDatepickerModule,
    MatSlideToggleModule,
    MatRadioModule,
    TabsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    NgxTypedJsModule,
    AgmCoreModule,
  ],
  exports: [
    MatMenuModule,
    FooterComponent,
    HijriDatePipe,
    NavigatorComponent,
    MatTabsModule,
    TabsModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    ModalModule,
    ButtonsModule,
    NgSelectModule,
    NgxDatatableModule,
    PaginationModule,
    NgApexchartsModule,
    BsDatepickerModule,
    FileUploadModule,
    BsDropdownModule,
    TreeviewModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    PagesHeaderComponent,
    NgxHijriGregorianDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    ProjectDetailsComponent,
    MatProgressBarModule,
    SupervisionsComponent,
    GeneralAlertComponent,
    SafePipe,
    EndServiceRewardComponent
  ],
})
export class SharedModule { }
