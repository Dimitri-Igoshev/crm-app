import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDialogListComponent } from './history-dialog-list.component';

describe('HistoryDialogListComponent', () => {
  let component: HistoryDialogListComponent;
  let fixture: ComponentFixture<HistoryDialogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDialogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDialogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
