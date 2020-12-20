import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMyGraffitiComponent } from './modify-my-graffiti.component';

describe('ModifyMyGraffitiComponent', () => {
  let component: ModifyMyGraffitiComponent;
  let fixture: ComponentFixture<ModifyMyGraffitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMyGraffitiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMyGraffitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
