import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntsperrEkeyModalComponent } from './entsperr-ekey-modal.component';

describe('EntsperrEkeyModalComponent', () => {
  let component: EntsperrEkeyModalComponent;
  let fixture: ComponentFixture<EntsperrEkeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntsperrEkeyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntsperrEkeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
