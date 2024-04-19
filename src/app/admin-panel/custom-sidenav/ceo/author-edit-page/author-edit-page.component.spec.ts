import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEditPageComponent } from './author-edit-page.component';

describe('AuthorEditPageComponent', () => {
  let component: AuthorEditPageComponent;
  let fixture: ComponentFixture<AuthorEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
