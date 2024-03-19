import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkeyListComponent } from './ekey-list.component';

describe('EkeyComponent', () => {
  let component: EkeyListComponent;
  let fixture: ComponentFixture<EkeyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EkeyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EkeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
