import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOldComponent } from './management-old.component';

describe('ManagementOldComponent', () => {
  let component: ManagementOldComponent;
  let fixture: ComponentFixture<ManagementOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
