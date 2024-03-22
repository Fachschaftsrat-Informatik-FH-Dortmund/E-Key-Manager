import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RueckmeldungComponent } from './rueckmeldung.component';

describe('RueckmeldungComponent', () => {
  let component: RueckmeldungComponent;
  let fixture: ComponentFixture<RueckmeldungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RueckmeldungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RueckmeldungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
