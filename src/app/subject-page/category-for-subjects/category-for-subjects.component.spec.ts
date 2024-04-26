import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryForSubjectsComponent } from './category-for-subjects.component';

describe('CategoryForSubjectsComponent', () => {
  let component: CategoryForSubjectsComponent;
  let fixture: ComponentFixture<CategoryForSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryForSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryForSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
