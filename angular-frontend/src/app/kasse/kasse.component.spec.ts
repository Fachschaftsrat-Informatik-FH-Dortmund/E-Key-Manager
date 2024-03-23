import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasseComponent } from './kasse.component';

describe('KasseComponent', () => {
  let component: KasseComponent;
  let fixture: ComponentFixture<KasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
