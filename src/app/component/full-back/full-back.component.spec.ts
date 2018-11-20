import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBackComponent } from './full-back.component';

describe('FullBackComponent', () => {
  let component: FullBackComponent;
  let fixture: ComponentFixture<FullBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
