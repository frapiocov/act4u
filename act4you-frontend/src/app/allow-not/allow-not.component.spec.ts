import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowNotComponent } from './allow-not.component';

describe('AllowNotComponent', () => {
  let component: AllowNotComponent;
  let fixture: ComponentFixture<AllowNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllowNotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllowNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
