import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositionPageComponent } from './edit-position-page.component';

describe('EditPositionPageComponent', () => {
  let component: EditPositionPageComponent;
  let fixture: ComponentFixture<EditPositionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPositionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPositionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
