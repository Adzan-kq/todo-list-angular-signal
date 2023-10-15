import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListFormComponent } from './dialog-list-form.component';

describe('DialogListFormComponent', () => {
  let component: DialogListFormComponent;
  let fixture: ComponentFixture<DialogListFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogListFormComponent]
    });
    fixture = TestBed.createComponent(DialogListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
