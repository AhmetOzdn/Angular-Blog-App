import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditPageComponent } from './subject-edit-page.component';

describe('SubjectEditPageComponent', () => {
  let component: SubjectEditPageComponent;
  let fixture: ComponentFixture<SubjectEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
