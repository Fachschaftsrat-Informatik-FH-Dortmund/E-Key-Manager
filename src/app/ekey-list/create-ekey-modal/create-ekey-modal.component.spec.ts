import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEkeyModalComponent } from './create-ekey-modal.component';

describe('CreateEkeyModalComponent', () => {
  let component: CreateEkeyModalComponent;
  let fixture: ComponentFixture<CreateEkeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEkeyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEkeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
