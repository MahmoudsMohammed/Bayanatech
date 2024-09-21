/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EndServiceRewardComponent } from './end-service-reward.component';

describe('EndServiceRewardComponent', () => {
  let component: EndServiceRewardComponent;
  let fixture: ComponentFixture<EndServiceRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndServiceRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndServiceRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
