import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandPopupComponent } from './cand-popup.component';

describe('CandPopupComponent', () => {
  let component: CandPopupComponent;
  let fixture: ComponentFixture<CandPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
