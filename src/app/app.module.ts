import { NgOtpInputModule } from 'ng-otp-input';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TreeviewModule } from 'ngx-treeview';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './modules/core/core.module';
import { WebcamModule } from 'ngx-webcam';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TreeNgxModule } from 'tree-ngx';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AgmCoreModule } from '@agm/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxPrintElementModule } from 'ngx-print-element';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxIntlTelInputModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected', // Footer selected message
      },
    }),
    HttpClientModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgOtpInputModule,
    TreeviewModule.forRoot(),
    FormsModule,
    CoreModule,
    WebcamModule,
    ModalModule.forRoot(),
    TreeNgxModule,
    NgxHijriGregorianDatepickerModule,
    NgIdleKeepaliveModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: '',
    }),
    NgxGaugeModule,
    NgxPrintElementModule,
    LeafletModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
