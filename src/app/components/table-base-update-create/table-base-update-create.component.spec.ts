import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBaseUpdateCreateComponent } from './table-base-update-create.component';

describe('TableBaseUpdateCreateComponent', () => {
  let component: TableBaseUpdateCreateComponent;
  let fixture: ComponentFixture<TableBaseUpdateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBaseUpdateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBaseUpdateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
