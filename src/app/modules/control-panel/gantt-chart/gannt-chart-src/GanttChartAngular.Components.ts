import { Component, OnInit, ElementRef, Input } from '@angular/core';
import GanttChartItem = DlhSoft.Controls.GanttChartView.Item;
import GanttChartSettings = DlhSoft.Controls.GanttChartView.Settings;
import ScheduleChartItem = DlhSoft.Controls.ScheduleChartView.Item;
import ScheduleChartSettings = DlhSoft.Controls.ScheduleChartView.Settings;
import LoadChartItem = DlhSoft.Controls.LoadChartView.Item;
import LoadChartSettings = DlhSoft.Controls.LoadChartView.Settings;

@Component({
  selector: 'ganttchartview',
  template: '<div><ng-content></ng-content></div>'
})
export class GanttChartView implements OnInit {
  rootElement: HTMLElement;
  @Input() style: string = "";
  @Input() items: GanttChartItem[] = [];
  @Input() settings: GanttChartSettings = {};
  @Input() license: any;
  @Input() change!: (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  @Input() dbClick!: (inOnChart: boolean, item: GanttChartItem) => void;
  constructor(elementRef: ElementRef) {
    this.rootElement = <HTMLElement>elementRef.nativeElement;
  }
  ngOnInit() {
    var element = <HTMLElement>this.rootElement.firstChild;

    element.setAttribute('style', this.style);
    var changeHandler = this.settings.itemPropertyChangeHandler;
    DlhSoft.Controls.GanttChartView.initialize(element, this.items, this.settings, this.license);
    if (this.change) {
      this.settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
        if (changeHandler)
          changeHandler(item, propertyName, isDirect, isFinal);

        this.change(item, propertyName, isDirect, isFinal);
      }
    }
    if (this.dbClick) {
      this.settings.itemDoubleClickHandler = (inOnChart, item) => {
        this.dbClick(inOnChart, item);
      }
    }
  }
}

@Component({
  selector: 'schedulechartview',
  template: '<div><ng-content></ng-content></div>'
})
export class ScheduleChartView implements OnInit {
  rootElement: HTMLElement;
  @Input() style: string = "";
  @Input() items: ScheduleChartItem[] = [];
  @Input() settings: ScheduleChartSettings = {};
  @Input() license: any;
  @Input() change!: (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  constructor(elementRef: ElementRef) {
    this.rootElement = <HTMLElement>elementRef.nativeElement;
  }
  ngOnInit() {
    var element = <HTMLElement>this.rootElement.firstChild;
    element.setAttribute('style', this.style);
    var changeHandler = this.settings.itemPropertyChangeHandler;
    DlhSoft.Controls.ScheduleChartView.initialize(element, this.items, this.settings, this.license);
    if (this.change) {
      this.settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
        if (changeHandler)
          changeHandler(item, propertyName, isDirect, isFinal);
        this.change(item, propertyName, isDirect, isFinal);
      }
    }
  }
}

@Component({
  selector: 'loadchartview',
  template: '<div><ng-content></ng-content></div>'
})
export class LoadChartView implements OnInit {
  rootElement: HTMLElement;
  @Input() style: string = "";
  @Input() items: LoadChartItem[] = [];
  @Input() settings: LoadChartSettings = {};
  @Input() license: any;
  @Input() change!: (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  constructor(elementRef: ElementRef) {
    this.rootElement = <HTMLElement>elementRef.nativeElement;
  }
  ngOnInit() {
    var element = <HTMLElement>this.rootElement.firstChild;
    element.setAttribute('style', this.style);
    var changeHandler = this.settings.itemPropertyChangeHandler;
    DlhSoft.Controls.LoadChartView.initialize(element, this.items, this.settings, this.license);
    if (this.change) {
      this.settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
        if (changeHandler)
          changeHandler(item, propertyName, isDirect, isFinal);
        this.change(item, propertyName, isDirect, isFinal);
      }
    }
  }
}
