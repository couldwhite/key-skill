import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceUserComponent } from './reference-user.component';

describe('ReferenceUserComponent', () => {
  let component: ReferenceUserComponent;
  let fixture: ComponentFixture<ReferenceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
