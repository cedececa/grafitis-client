import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaGrafitisComponent } from './mapa-grafitis.component';

describe('MapaGrafitisComponent', () => {
  let component: MapaGrafitisComponent;
  let fixture: ComponentFixture<MapaGrafitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaGrafitisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaGrafitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
