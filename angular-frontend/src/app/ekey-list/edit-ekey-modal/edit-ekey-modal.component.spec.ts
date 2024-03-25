import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEkeyModalComponent } from './edit-ekey-modal.component';

describe('EditEkeyModalComponent', () => {
  let component: EditEkeyModalComponent;
  let fixture: ComponentFixture<EditEkeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEkeyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEkeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
