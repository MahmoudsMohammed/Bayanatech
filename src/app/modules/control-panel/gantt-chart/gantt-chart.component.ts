import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import GanttChartSettings = GanttChartView.Settings;
import PredecessorItem = GanttChartView.PredecessorItem;
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var initializeGanttChartTheme: any;
@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {
  @ViewChild('ganttChartView', { read: ElementRef, static: true }) ganttChartViewRef: ElementRef | any;
  ganttChartView: GanttChartView.Element | any;

  items: GanttChartItem[];
  settings: GanttChartSettings;
  onItemChanged: (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  itemDoubleClickHandler: (isOnChart: boolean, item: GanttChartItem) => void;
  addNewItem: () => void;
  insertNewItem: () => void;
  decreaseItemIndentation: () => void;
  increaseItemIndentation: () => void;
  deleteItem: () => void;
  moveItemUp: () => void;
  moveItemDown: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  print: () => void;

  isBaselineVisible: any;
  isHighlightCriticalPathVisible: any;
  isDependencyConstraintsActive: any;

  // Query string syntax: ?theme
  // Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  queryString = window.location.search;
  theme = this.queryString ? this.queryString.substr(1) : null;


  @ViewChild('dataModal') dataModal!: any;
  selectedItem: any
  constructor(private ngbModalService: NgbModal) {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
    /*
      **content: activity Name,
      **label: for parent and indentation
      **indentation: to set perant and children
      **start: for task start date
      **finish: for task finish date
      **minStart: actual start date
      **activity_id: activity id
      **assignmentsContent = assined User
    */
    var items = <GanttChartItem[] | any[]>[
      { activity_id: 'id-40', content: 'Planning', assignmentsContent: 'User 1', label: 'Planning', isExpanded: true, },
      { activity_id: 'id-41', content: 'Analysis', assignmentsContent: 'User 1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), },
      { activity_id: 'id-42', content: 'Requirements', assignmentsContent: 'User 1', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), },
      { activity_id: 'id-43', content: 'Review', assignmentsContent: 'User 1', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), },
      { activity_id: 'id-44', content: 'Arhitecture', assignmentsContent: 'User 1', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), },
      { activity_id: 'id-45', content: 'Design', assignmentsContent: 'User 1', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), },
      { activity_id: 'id-451', content: 'Design 1', assignmentsContent: 'User 2', indentation: 2, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), },
      { activity_id: 'id-452', content: 'Design 2', assignmentsContent: 'User 2', indentation: 2, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), },
      { activity_id: 'id-453', content: 'Design 3', assignmentsContent: 'User 2', indentation: 2, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), },
      { activity_id: 'id-46', content: 'Development', assignmentsContent: 'User 2', label: 'Development', isExpanded: true, },
      { activity_id: 'id-47', content: 'Start development', assignmentsContent: 'User 3', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), },
      { activity_id: 'id-48', content: 'Date-times', assignmentsContent: 'User 3', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), minStart: new Date(year, month, 5, 12, 0, 0), },
      { activity_id: 'id-49', content: 'Schedules', assignmentsContent: 'User 3', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), minStart: new Date(year, month, 5, 12, 0, 0), },
      { activity_id: 'id-50', content: 'Automation testing functions', assignmentsContent: 'User 3', label: 'Very important!', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), },
      { activity_id: 'id-51', content: 'Chart', assignmentsContent: 'User 3', label: 'Chart', indentation: 1 },
      { activity_id: 'id-52', content: 'Bars', assignmentsContent: 'User 4', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), minStart: new Date(year, month, 7, 16, 0, 0), },
      { activity_id: 'id-53', content: 'Summary bars', assignmentsContent: 'User 4', indentation: 2, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), },
      { activity_id: 'id-54', content: 'Review', assignmentsContent: 'User 4', indentation: 2, start: new Date(year, month, 9, 16, 0, 0), },
      { activity_id: 'id-55', content: 'Links', assignmentsContent: 'User 4', indentation: 2, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), },
      { activity_id: 'id-56', content: 'Diagram functions', assignmentsContent: 'User 4', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), },
      { activity_id: 'id-57', content: 'Quality assurance', assignmentsContent: 'User 5', label: 'Very important!', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0), },
      { activity_id: 'id-58', content: 'Project delivery', assignmentsContent: 'User 5', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), },
      { activity_id: 'id-59', content: 'Maintenance', assignmentsContent: 'User 5', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) },
      { activity_id: 'id-60', content: 'Marketing', assignmentsContent: 'User 5', label: 'Marketing', isExpanded: true, start: new Date(year, month, 10, 12, 0, 0), finish: new Date(year, month, 15, 12, 0, 0) },
      { activity_id: 'id-61', content: 'Preparations', assignmentsContent: 'User 5', indentation: 1, start: new Date(year, month, 10, 8, 0, 0), },
      { activity_id: 'id-62', content: 'Colors', assignmentsContent: 'User 1', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), },
      { activity_id: 'id-63', content: 'Logo', assignmentsContent: 'User 2', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), },
      { activity_id: 'id-64', content: 'Samples app', assignmentsContent: 'User 3', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 16, 12, 0, 0) },
      { activity_id: 'id-65', content: 'Screenshots', assignmentsContent: 'User 4', indentation: 1, start: new Date(year, month, 12, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0) },
      { activity_id: 'id-66', content: 'Videos', assignmentsContent: 'User 5', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0), }
    ];

    this.items = items;

    var settings: any = <GanttChartSettings>{
      // Auto-scheduling is initially turned on.
      areTaskDependencyConstraintsEnabled: true,
      isDraggingTaskStartEndsEnabled: true,
      // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
      currentTime: new Date(year, month, 2, 12, 0, 0)
    };

    // Customize columns.
    var columns = GanttChartView.getDefaultColumns(items, settings);
    columns.splice(0, 0, { header: '', cellClass: 'index-cell', width: 50, cellTemplate: GanttChartView.getIndexColumnTemplate(false) });
    columns.splice(1, 0, {
      header: 'Activity ID', width: 120, isReadOnly: true, isTreeView: true, cellTemplate: function (item: any) {
        return item?.ganttChartView.ownerDocument.createTextNode(item?.activity_id);
      }
    });
    columns.splice(4, 0, { header: 'Original Duration', width: 100, cellTemplate: GanttChartView.getDurationColumnTemplate(64, 8) });
    columns.splice(5, 0, { header: 'progress (%)', width: 80, cellTemplate: GanttChartView.getCompletionColumnTemplate(64) });
    columns.splice(7, 0, { header: 'Actual Start', width: 140, cellTemplate: GanttChartView.getMinStartColumnTemplate(120, true) });

    console.log(columns);

    settings.columns = columns;
    // users names and images
    settings.areResourceImagesVisibleAsAssignments = true;
    settings.resourceImageUrls = [
      { key: 'User 1', value: '/assets/images/user1.png' },
      { key: 'User 2', value: '/assets/images/user2.png' },
      { key: 'User 3', value: '/assets/images/user3.png' },
      { key: 'User 4', value: '/assets/images/user4.png' },
      { key: 'User 5', value: '/assets/images/user5.png' }
    ];
    // settings.schedule = { workingWeekStart: 5, workingWeekFinish: 1 };
    // settings.standardBarStyle = 'stroke: Green; fill: LightGreen';
    settings.itemHeight = 36;
    settings.arrowSize = 4;
    settings.useInlineToolTips = true;
    this.settings = settings;
    this.settings.isBaselineVisible = true;
    this.isBaselineVisible = settings.isBaselineVisible;
    this.isHighlightCriticalPathVisible = false;
    this.isDependencyConstraintsActive = settings.areTaskDependencyConstraintsEnabled;

    this.itemDoubleClickHandler = (isOnChart, item) => {
      this.selectedItem = item;
      this.open(this.dataModal);
    }

    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
        return;
      let selectedItem = items?.findIndex(el => el?.index == item.index)
      items[selectedItem] = item;
    }

    this.addNewItem = () => {
      var item = <GanttChartItem>{ activity_id: this.randomIdGenerator(), content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: '' };
      this.ganttChartView.addItem(item);
      this.ganttChartView.selectItem(item);
      this.ganttChartView.scrollToItem(item);
      this.ganttChartView.scrollToDateTime(new Date(year, month, 1));
    }
    this.insertNewItem = () => {
      if (this.ganttChartView.getSelectedItem() == null)
        return;
      var item = <GanttChartItem>{ activity_id: this.randomIdGenerator(), content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: '' };
      this.ganttChartView.insertItem(this.ganttChartView?.getSelectedItem()?.index, item);
      this.ganttChartView.selectItem(item);
      this.ganttChartView.scrollToItem(item);
      this.ganttChartView.scrollToDateTime(new Date(year, month, 1));
    }
    this.increaseItemIndentation = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.increaseItemIndentation(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.decreaseItemIndentation = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.decreaseItemIndentation(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.deleteItem = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.removeItem(item);
      this.ganttChartView.refresh();
    }

    this.moveItemUp = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.moveItemHierarchyUp(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.moveItemDown = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.moveItemHierarchyDown(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.zoomIn = () => {
      this.ganttChartView.setHourWidth(settings.hourWidth * 2);
    }
    this.zoomOut = () => {
      this.ganttChartView.setHourWidth(settings.hourWidth / 2);
    }
    this.print = () => {
      this.ganttChartView.print({
        title: 'Gantt Chart',
        isGridVisible: true,
        columnIndexes: [2],
        timelineStart: new Date(year, month, 1),
        timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000),
        preparingMessage: '...',
        autoClose: false
      });
    }
  }

  ngOnInit() {
    this.ganttChartView = <GanttChartView.Element>(<HTMLElement>this.ganttChartViewRef.nativeElement).firstChild;

    // Optionally, initialize custom themes (themes.js).
    initializeGanttChartTheme(this.settings, this.theme);
  }

  closeResult: any;
  open(content: any) {
    this.ngbModalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        centered: true
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
    this.selectedItem = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  randomIdGenerator() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  // new part
  projects: any[] = ['avav', 'rebern', 'avbreb', 'trnrtym']
  entries: any[] = ['avav', 'rebern', 'avbreb', 'trnrtym', 'avav', 'rebern', 'avbreb', 'trnrtym', 'avav', 'rebern', 'avbreb', 'trnrtym']
}
