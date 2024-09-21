import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterContentChecked,
  ViewChild,
} from '@angular/core';
import { LayoutAnimation } from './shared/animations/layout.animation';
import { NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { first } from 'rxjs/operators';
import { RestApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [LayoutAnimation],
})
export class AppComponent implements OnInit, AfterContentChecked {
  idleState = 'NOT_STARTED';
  countdown?: any = 0;
  lastPing?: any = null;

  title = 'dashboard';
  open = false;
  isDash = false;
  counter: any;
  closeResult: any;
  openIframe: any;
  @ViewChild('sessionAlertModal') sessionAlertModal: any;
  @ViewChild('sessionEnd') sessionEnd: any;

  constructor(
    private cdk: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private idle: Idle,
    private keepalive: Keepalive,
    private api: RestApiService
  ) {
    idle.setIdle(60); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(60); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE';
      if (this.countdown == 0) {
        // TODO: this.openModal(this.sessionAlertModal);
      }
    });

    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NOT_IDLE';
      cdk.detectChanges(); // how do i avoid this kludge?+
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      // TODO: modalService.dismissAll();
      // TODO: this.openModal(this.sessionEnd, 'backdropStatic');
    });
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe((seconds) => (this.countdown = seconds));

    // set keepalive parameters, omit if not using keepalive
    this.keepalive.interval(15); // will ping at this interval while not idle, in seconds

    document.documentElement.setAttribute('lang', 'ar');

    document
      .querySelector('.ar-stylesheet')
      ?.setAttribute('href', '/assets/css/ar-style.css');

    this.router.events.forEach((ev) => {
      if (ev instanceof NavigationStart) {
        if (
          ev.url.includes('dash') ||
          ev.url.includes('customers') ||
          ev.url.includes('projects') ||
          ev.url.includes('accounts') ||
          ev.url.includes('employees') ||
          ev.url.includes('controlpanel') ||
          ev.url.includes('reports') ||
          ev.url.includes('communications')
        ) {
          this.isDash = true;
        } else {
          this.isDash = false;
        }
      }
    });
  }

  ngOnInit() {
    this.reset();
  }

  ngAfterContentChecked(): void {
    this.cdk.detectChanges();
  }

  openModal(content: any, type?: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
        centered: true,
        backdrop: type == 'backdropStatic' ? 'static' : undefined,
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

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.lastPing = null;
  }

  onActivate(event: any) {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 800);
  }

  extentSession() {
    this.modalService.dismissAll();
    this.countdown = 0;
  }

  endSession() {}
}
