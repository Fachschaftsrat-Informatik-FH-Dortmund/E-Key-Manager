import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbuchenModalComponent } from './abbuchen-modal.component';

describe('AbbuchenModalComponent', () => {
  let component: AbbuchenModalComponent;
  let fixture: ComponentFixture<AbbuchenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbbuchenModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbbuchenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
