import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnuncioComponent } from './new-annuncio.component';

describe('NewAnnuncioComponent', () => {
  let component: NewAnnuncioComponent;
  let fixture: ComponentFixture<NewAnnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnuncioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAnnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
