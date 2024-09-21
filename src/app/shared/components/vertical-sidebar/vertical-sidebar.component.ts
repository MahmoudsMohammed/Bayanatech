import { Router } from '@angular/router';
import { HandelSideBarService } from './../../services/handel-side-bar.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { ToggleBtnAnimation } from '../../animations/toggleBtn.animation';
import { RestApiService } from '../../services/api.service';
import { MatSidenav } from '@angular/material/sidenav';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AUTO_STYLE,
} from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: ['./vertical-sidebar.component.scss'],
  animations: [
    ToggleBtnAnimation,
    trigger('slide', [
      state('up', style({ height: 0, opacity: '0' })),
      state('down', style({ height: '*', opacity: '1' })),
      transition('up <=> down', animate(200)),
    ]),
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class VerticalSidebarComponent implements OnInit {
  @Input() scrolled: any;
  linkName: any;
  isOpen!: boolean;
  sideMenu: any = [
    {
      title: {
        ar: '',
        en: '',
      },
      mainMenu: [
        {
          title: {
            ar: '',
            en: '',
          },
          subMenu: [
            {
              title: {
                ar: '',
                en: '',
              },
              link: '',
            },
          ],
        },
      ],
    },
  ];

  options = {
    strings: [
      'سبحان الله وبحمده.',
      'عدد خلقه.',
      'ورضا نفسه',
      'وزنة عرشه',
      'ومداد كلماته',
    ],
    typeSpeed: 100,
    backSpeed: 50,
    showCursor: true,
    cursorChar: '|',
    loop: true,
  };

  lang: any = 'ar';

  isExpanded = true;
  showSubmenu: any;
  activeIndex: any;
  activeChildIndex: any;
  isShowing = false;
  showSubSubMenu: any;
  constructor(
    private router: Router,
    private handelSidebarService: HandelSideBarService,
    private api: RestApiService
  ) {
    // get Url To Check Activated Link In Sidebar
    this.router.events.subscribe((event) => {
      this.linkName = this.router.url;
    });

    api.lang.subscribe((res) => {
      this.lang = res;
      this.setMenu();
    });

    this.setMenu();
  }

  ngOnInit(): void {
    this.checkSideBarState();
  }

  setSidebarState(): void {
    this.handelSidebarService.sideBarState.next(this.isOpen);
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }

  checkSideBarState(): void {
    this.handelSidebarService.sideBarState.subscribe((res) => {
      if (res != null) {
        this.isOpen = res;
      } else {
        this.isOpen = true;
      }
    });
  }

  open(event: any) {
    this.isOpen = true;
    this.setSidebarState();
    this.stopPropagation(event);
  }

  closeSideBar(): void {
    this.isOpen = false;

    this.handelSidebarService.sideBarState.next(this.isOpen);
  }

  closeSideBarSmallDevices(): void {
    if (window.innerWidth < 1200) {
      this.isOpen = false;
      this.handelSidebarService.sideBarState.next(this.isOpen);
    }
  }

  menu: any;
  setMenu() {
    // { name: { ar: '', en: '' }, link: '', type: '', icon:'' },
    this.menu = [
      {
        name: { ar: 'الصفحة الرئيسية', en: 'Dashboard' },
        link: '/dash/home',
        type: 'single',
        icon: '/assets/sidebar-icons/noun_Home_-1.png',
      },

      {
        name: { ar: 'العملاء', en: 'Customers' },
        link: null,
        type: 'multiple',
        icon: '/assets/sidebar-icons/user-multiple-1.png',

        children: [
          {
            name: { ar: 'الإضافة والبحث', en: 'Search and inquire' },
            link: '/customers/search',
            type: 'single',
            icon: '/assets/sidebar-icons/Search Icon-1.png',
          },

          {
            name: { ar: 'خدمات العميل', en: 'Customer services' },
            link: '/customers/CustomerOperations',
            type: 'single',
            icon: '/assets/sidebar-icons/settings-solid.png',
          },

          {
            name: { ar: 'تقارير العملاء', en: 'Reports and statistics' },
            link: '/customers/CustomerReports',
            type: 'single',
            icon: '/assets/sidebar-icons/user-avatar.png',
          },

          {
            name: { ar: 'كشف حساب عميل', en: 'Customer account statement' },
            link: '/customers/AccountStatementCustomer',
            type: 'single',
            icon: '/assets/sidebar-icons/collection.png',
          },

          {
            name: { ar: 'متابعة التحصيل', en: 'Follow-up collection' },
            link: '/customers/ContractNCustomer',
            type: 'single',
            icon: '/assets/sidebar-icons/report-data-1.png',
          },
        ],
      },

      {
        name: { ar: 'الاتصالات الإدارية', en: 'Administrative Communications' },
        link: null,
        type: 'multiple',
        icon: '/assets/sidebar-icons/bx-support-1.png',

        children: [
          {
            name: { ar: 'الصادر', en: 'Outbox' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/export.png',

            children: [
              {
                name: { ar: 'البحث في الصادر', en: 'Search in Outbox' },
                link: '/communications/Outbox',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },

              {
                name: { ar: 'الخطابات الصادرة', en: 'Outbox Letters' },
                link: '/communications/OutboxAdd',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
          {
            name: { ar: 'الوارد', en: 'Inbox' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/export-1.png',

            children: [
              {
                name: { ar: 'البحث في الوارد', en: 'Search in Inbox' },
                link: '/communications/Inbox',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },

              {
                name: { ar: 'الخطابات الواردة', en: 'Inbox Letters' },
                link: '/communications/InboxAdd',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
          {
            name: { ar: 'بحث', en: 'Search' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/Search Icon.png',

            children: [
              {
                name: {
                  ar: 'بحث في الصادر و الوارد',
                  en: 'Search in InOutBox',
                },
                link: '/communications/OutInboxSearch',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },

              {
                name: { ar: 'بحث في الملفات', en: 'Search in Files' },
                link: '/communications/OutInboxFiles',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
        ],
      },

      {
        name: { ar: 'ادارة المشاريع', en: 'project management' },
        link: null,
        type: 'multiple',
        icon: '/assets/sidebar-icons/settings-services.png',
        children: [
          {
            name: { ar: 'عروض الأسعار', en: 'Quotations' },
            link: '/projects/offers-price',
            type: 'single',
            icon: '/assets/sidebar-icons/offer_broken.png',
          },
          {
            name: { ar: 'حركة المشاريع', en: 'Project movement' },
            link: '/projects/track-projects',
            type: 'single',
            icon: '/assets/sidebar-icons/movement.png',
          },
          {
            name: { ar: 'حركة المهام', en: 'task movement' },
            link: '/projects/track-missions',
            type: 'single',
            icon: '/assets/sidebar-icons/Group 40676.png',
          },
          {
            name: { ar: 'المهام الإدارية', en: 'Administrative tasks' },
            link: '/projects/work-orders',
            type: 'single',
            icon: '/assets/sidebar-icons/process-on-vm-line-2.png',
          },
          {
            name: { ar: 'سير عمل المشروع', en: 'Project workflow' },
            link: '/projects/project-setting',
            type: 'single',
            icon: '/assets/sidebar-icons/arrow-left-right.png',
          },
          {
            name: { ar: 'متطلبات المشروع', en: 'Project requirements' },
            link: '/projects/project-requirements',
            type: 'single',
            icon: '/assets/sidebar-icons/data-1.png',
          },
          {
            name: { ar: 'مركز رفع الملفات', en: 'File upload center' },
            link: '/projects/file-uploader-center',
            type: 'single',
            icon: '/assets/sidebar-icons/upload-cloud-line.png',
          },
          {
            name: { ar: 'أرشيف المشاريع', en: 'Projects archive' },
            link: '/projects/project-archive',
            type: 'single',
            icon: '/assets/sidebar-icons/Path 34061.png',
          },
          {
            name: { ar: 'الإشراف', en: 'Supervision' },
            link: '/projects/supervisions',
            type: 'single',
            icon: '/assets/sidebar-icons/airline-manage-gates.png',
          },
          {
            name: { ar: 'حالة المشروع', en: 'Project state' },
            link: '/projects/project-status',
            type: 'single',
            icon: '/assets/sidebar-icons/ai-status.png',
          },
          {
            name: {
              ar: 'إيرادات ومصروفات المشاريع',
              en: 'Project revenues and expenses',
            },
            link: '/projects/follow-project',
            type: 'single',
            icon: '/assets/sidebar-icons/money-1.png',
          },
          {
            name: { ar: 'تقارير  المشاريع', en: 'Project Reports' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/report-data-4.png',
            children: [
              {
                name: {
                  ar: 'تقرير الاداء الشامل',
                  en: 'Comprehensive Performance Report',
                },
                link: '/projects/performance-report',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'مشاريع المستخدم', en: 'User Projects' },
                link: '/projects/user-projects',
                type: 'single',
                icon: '/assets/sidebar-icons/user-data.png',
              },
              {
                name: { ar: 'مهام المستخدم', en: 'user tasks' },
                link: '/projects/user-tasks',
                type: 'single',
                icon: '/assets/sidebar-icons/report-data-5.png',
              },
              {
                name: { ar: 'مهام حسب المشروع', en: 'tasks by project' },
                link: '/projects/project-tasks-report',
                type: 'single',
                icon: '/assets/sidebar-icons/report-data-5.png',
              },
              {
                name: { ar: 'تكلفة المشروع', en: 'project cost' },
                link: '/projects/project-cost',
                type: 'single',
                icon: '/assets/sidebar-icons/moneyalt.png',
              },
            ],
          },
        ],
      },

      {
        name: { ar: 'شؤون الموظفين', en: 'Employees Affairs' },
        link: null,
        type: 'multiple',
        icon: '/assets/sidebar-icons/users-line.png',
        children: [
          {
            name: { ar: 'التنبيهات والتعاميم', en: 'General Alerts' },
            link: '/employees/generalAlert',
            type: 'single',
            icon: '/assets/sidebar-icons/notification-outline-badged.png',
          },
          {
            name: { ar: 'بيانات الموظف', en: 'Employee Data' },
            link: '/employees/employeeData',
            type: 'single',
            icon: '/assets/sidebar-icons/info-circle.png',
          },
          {
            name: { ar: 'عقود الموظفين', en: 'Staff Contracts' },
            link: '/employees/staffcontracts',
            type: 'single',
            icon: '/assets/sidebar-icons/document.png',
          },
          {
            name: { ar: 'إجازات الموظفين', en: 'Staff Holidays' },
            link: '/employees/staffHolidays',
            type: 'single',
            icon: '/assets/sidebar-icons/on-holiday-line.png',
          },
          {
            name: { ar: 'سلف الموظف', en: 'Employee Loan' },
            link: '/employees/EmployeeLoan',
            type: 'single',
            icon: '/assets/sidebar-icons/cash_outline.png',
          },
          {
            name: { ar: 'مسيرات الرواتب', en: 'Payroll Marches' },
            link: '/employees/PayrollMarches',
            type: 'single',
            icon: '/assets/sidebar-icons/money.png',
          },
          {
            name: { ar: 'إعداد المسير الشهري', en: 'Monthly Salary setup' },
            link: '/employees/SalarySetup',
            type: 'single',
            icon: '/assets/sidebar-icons/update-line.png',
          },
          {
            name: { ar: 'عُهَد الموظفين', en: 'Advance to employees' },
            link: '/employees/AdvanceToEmployees',
            type: 'single',
            icon: '/assets/sidebar-icons/materialdesignicons.png',
          },
          {
            name: { ar: 'حركة السيارات', en: 'Car Movement' },
            link: '/employees/CarMovement',
            type: 'single',
            icon: '/assets/sidebar-icons/Path 34110.png',
          },
          {
            name: { ar: 'ارشيف الموظفين', en: 'Staff Archive' },
            link: '/employees/EmployeesArchive',
            type: 'single',
            icon: '/assets/sidebar-icons/meter-alt.png',
          },
          {
            name: { ar: 'الحضور والانصراف', en: 'Attendance and Departure' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/employee-line.png',
            children: [
              {
                name: {
                  ar: 'الحضور بالبصمة',
                  en: 'Attendance and departure of employees',
                },
                link: '/employees/AttendanceAndDepartureOfEmployees',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'الحضور اليدوي', en: 'Maniual attendance' },
                link: '/employees/ManualAttendance',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'الحضور من التطبيق', en: 'Application Attendance' },
                link: '/employees/ApplicationAttendance',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
          {
            name: { ar: 'تقارير احصائية', en: 'Statistical reports' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/bx-stats.png',
            children: [
              {
                name: { ar: 'الموظفون الغائبون', en: 'Absentee Staff' },
                link: '/employees/AbsenteeStaff',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'الغائبون اليوم', en: 'Absentees Today' },
                link: '/employees/AbsenteesToday',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'الموظفون المتأخرون', en: 'Late employees' },
                link: '/employees/LateEmployees',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'المتأخرون اليوم', en: 'Late today' },
                link: '/employees/LateToday',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'الخروج المبكر', en: 'Early exit' },
                link: '/employees/EarlyExit',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'لم يسجلوا الخروج', en: 'Not logged out' },
                link: '/employees/NotLoggedOut',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'الحضور والانصراف',
                  en: 'Attendance and Departure',
                },
                link: '/employees/AttendanceAndDeparture',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
        ],
      },

      {
        name: { ar: 'الحسابات', en: 'Accounts' },
        link: null,
        type: 'multiple',
        icon: '/assets/sidebar-icons/accounting-1.png',
        children: [
          {
            name: { ar: 'فاتورة مبيعات', en: 'Sales bill' },
            link: '/accounts/Sales_bill',
            type: 'single',
            icon: '/assets/sidebar-icons/md-paper-1.png',
          },
          {
            name: { ar: 'مردود المبيعات', en: 'Sales return' },
            link: '/accounts/Sales_return',
            type: 'single',
            icon: '/assets/sidebar-icons/backward.png',
          },
          {
            name: {
              ar: 'فواتير المبيعات الملغاة',
              en: 'Canceled sales invoices',
            },
            link: '/accounts/Canceled_sales',
            type: 'single',
            icon: '/assets/sidebar-icons/md-paper.png',
          },
          {
            name: { ar: 'فاتورة مشتريات', en: 'Purchases bill' },
            link: '/accounts/Purchases_bill',
            type: 'single',
            icon: '/assets/sidebar-icons/process-on-vm-line.png',
          },
          {
            name: { ar: 'مردود فاتورة مشتريات', en: 'Purchase invoice return' },
            link: '/accounts/Purchase_invoice_return',
            type: 'single',
            icon: '/assets/sidebar-icons/Group 40676.png',
          },
          {
            name: {
              ar: 'فواتير المشتريات الملغاة',
              en: 'Canceled purchase invoices',
            },
            link: '/accounts/Canceled_purchase',
            type: 'single',
            icon: '/assets/sidebar-icons/md-paper.png',
          },
          {
            name: { ar: 'سند قبض', en: 'Catch Receipt' },
            link: '/accounts/Catch_Receipt',
            type: 'single',
            icon: '/assets/sidebar-icons/cash_outline.png',
          },
          {
            name: { ar: 'سند صرف', en: 'Receipt' },
            link: '/accounts/Receipt',
            type: 'single',
            icon: '/assets/sidebar-icons/cash_outline.png',
          },
          {
            name: { ar: 'مردود المصروفات', en: 'Expense return' },
            link: '/accounts/Expense_return',
            type: 'single',
            icon: '/assets/sidebar-icons/backward.png',
          },
          {
            name: { ar: 'قيد يومية', en: 'Under daily' },
            link: '/accounts/Under_daily',
            type: 'single',
            icon: '/assets/sidebar-icons/report-data-3.png',
          },

          {
            name: {
              ar: 'العهد الماليه للموظفين',
              en: 'Financial covenant for employees',
            },
            link: '/accounts/Financial_covenant',
            type: 'single',
            icon: '/assets/sidebar-icons/money-3.png',
          },
          {
            name: { ar: 'عقود العملاء', en: 'Customer Contracts' },
            link: '/accounts/Customer_Contracts',
            type: 'single',
            icon: '/assets/sidebar-icons/user-multiple.png',
          },
          {
            name: {
              ar: 'تذكير بالوثائق الرسمية',
              en: 'Reminder of official documents',
            },
            link: '/accounts/official_documents',
            type: 'single',
            icon: '/assets/sidebar-icons/alarm.png',
          },
          {
            name: {
              ar: 'تذكير بالفواتير والخدمات',
              en: 'Billing and service reminders',
            },
            link: '/accounts/Billing_service',
            type: 'single',
            icon: '/assets/sidebar-icons/alarm.png',
          },
          {
            name: { ar: 'شيكات صادرة', en: 'Checks issued' },
            link: '/accounts/checks_issued',
            type: 'single',
            icon: '/assets/sidebar-icons/cash-coin.png',
          },
          {
            name: { ar: 'الضمانات', en: 'Warranties' },
            link: '/accounts/Warranties',
            type: 'single',
            icon: '/assets/sidebar-icons/money-1.png',
          },
          {
            name: { ar: 'اعتماد  المسير', en: 'Adoption of the manager' },
            link: '/accounts/Adoption_of_theManager',
            type: 'single',
            icon: '/assets/sidebar-icons/law.png',
          },
          {
            name: { ar: 'تقارير  الحسابات', en: 'Project Reports' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/report-data-4.png',
            children: [
              {
                name: { ar: 'كشف حساب', en: 'Account Statement' },
                link: '/accounts/Account_Statement',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'اليومية العامة', en: 'general journal' },
                link: '/accounts/general_Journal',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'ميزان المراجعة', en: 'Trial Balance' },
                link: '/accounts/Trial_Balance',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'قائمة الدخل', en: 'Income list' },
                link: '/accounts/Incom_List',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'قائمة المركز المالي',
                  en: 'Statement of financial position',
                },
                link: '/accounts/Statement_of_financial_position',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'الإقرار الضريبي', en: 'Tax declaration' },
                link: '/accounts/Tax_declaration',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'كشف بالأرصدة الآجلة',
                  en: 'Statement of deferred balances',
                },
                link: '/accounts/Statement_of_customers_deferred_balances',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'حركة مراكز التكلفة', en: 'Cost center movement' },
                link: '/accounts/Cost_center_movement',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'كشف تجميعي للسندات',
                  en: 'Synthesis statement of bonds',
                },
                link: '/accounts/Synthesis_statement_of_bonds',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'ايرادات مدراء المشاريع',
                  en: 'Project managers revenue',
                },
                link: '/accounts/Project_managers_revenue',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'متابعة إيرادات العملاء',
                  en: 'Follow up on customer revenue',
                },
                link: '/accounts/FollowUp_on_Customer_revenue',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'ايراد العميل (تفصيلي)',
                  en: 'Customer revenue (detailed)',
                },
                link: '/accounts/Customer_revenue',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'متابعة المصروفات', en: 'Expense follow-up' },
                link: '/accounts/Expense_follow_up',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'متابعة مراكز التكلفة',
                  en: 'Follow up cost centers',
                },
                link: '/accounts/Follow_up_the_revenues_and_expenses',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: {
                  ar: 'اشعارات الدائن والمدين',
                  en: 'Credit and debit notices',
                },
                link: '/accounts/Follow_up_on_credit_and_debit_notes',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
          {
            name: { ar: 'الحسابات الختامية', en: 'Final Accounts' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/accounting-1.png',
            children: [
              {
                name: { ar: 'دليل الحسابات', en: '  Accounts guide ' },
                link: '/accounts/Accounts_guide',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'مراكز التكلفة', en: ' Cost centres  ' },
                link: '/accounts/Cost_centres',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'السنوات المالية', en: '  Fiscal years ' },
                link: '/accounts/Fiscal_years',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'القيد الافتتاحي', en: '  Opening entry ' },
                link: '/accounts/Opening_entry',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'اسعار الخدمات', en: '  Service prices ' },
                link: '/accounts/Service_prices',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'قيد اقفال', en: '  Closed ' },
                link: '/accounts/Closed',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
        ],
      },

      {
        name: { ar: 'لوحة التحكم', en: 'Control Panel' },
        link: null,
        type: 'multiple',
        icon: '/assets/sidebar-icons/bxs-dashboard.png',
        children: [
          {
            name: { ar: 'اعدادات النظام', en: 'system settings' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/settings-solid.png',
            children: [
              {
                name: { ar: 'تجهيز بيانات المنشأة', en: 'Building Data' },
                link: '/controlpanel/organization',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'سجل احداث النظام', en: 'System event log' },
                link: '/controlpanel/actions',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'النسخ الاحتياطي', en: 'Create a backup' },
                link: '/controlpanel/backup',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
          {
            name: { ar: 'صلاحيات النظام', en: 'System Permissions' },
            link: null,
            type: 'multiple',
            icon: '/assets/sidebar-icons/security.png',
            children: [
              {
                name: { ar: 'المستخدمين', en: 'Users' },
                link: '/controlpanel/users',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
              {
                name: { ar: 'المجموعات', en: 'Groups' },
                link: '/controlpanel/groups',
                type: 'single',
                icon:
                  this.lang == 'ar'
                    ? '/assets/sidebar-icons/Group 40278.png'
                    : '/assets/sidebar-icons/Group 40280.png',
              },
            ],
          },
        ],
      }, 
      {
        name: { ar: 'Gantt Chart', en: 'Gantt Chart' },
        link: '/controlpanel/gantt-chart',
        type: 'single',
        icon: '/assets/sidebar-icons/noun_Home_-1.png',
      },
    ];
  }
}
