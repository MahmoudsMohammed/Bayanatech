import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxPrintElementService } from 'ngx-print-element';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-end-service-reward',
  templateUrl: './end-service-reward.component.html',
  styleUrls: ['./end-service-reward.component.css']
})
export class EndServiceRewardComponent implements OnInit {
  items: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  lang: any = 'ar';

  work_periods: any = [1, 2, 3]

  @Input() data: any
  constructor(
    private print: NgxPrintElementService,
    private translate: TranslateService
  ) {
    this.translate.use(this.lang);
  }

  ngOnInit(): void { }

  printData(id: any) {
    this.print.print(id, environment.printConfig);
  }
}
