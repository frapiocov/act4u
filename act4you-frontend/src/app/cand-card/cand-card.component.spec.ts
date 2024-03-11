import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandCardComponent } from './cand-card.component';

describe('CandCardComponent', () => {
  let component: CandCardComponent;
  let fixture: ComponentFixture<CandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
