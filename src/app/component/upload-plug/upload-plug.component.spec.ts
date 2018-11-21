import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlugComponent } from './upload-plug.component';

describe('UploadPlugComponent', () => {
  let component: UploadPlugComponent;
  let fixture: ComponentFixture<UploadPlugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPlugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
