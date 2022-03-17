import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeoComponent } from './papeo.component';

describe('PapeoComponent', () => {
  let component: PapeoComponent;
  let fixture: ComponentFixture<PapeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PapeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PapeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
