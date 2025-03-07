import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditDialogComponent } from './adit-dialog.component';

describe('AditDialogComponent', () => {
  let component: AditDialogComponent;
  let fixture: ComponentFixture<AditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
