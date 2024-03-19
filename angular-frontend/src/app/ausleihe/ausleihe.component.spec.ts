import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusleiheComponent } from './ausleihe.component';

describe('AusleiheComponent', () => {
  let component: AusleiheComponent;
  let fixture: ComponentFixture<AusleiheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AusleiheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AusleiheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
