import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCreatePageComponent } from './author-create-page.component';

describe('AuthorCreatePageComponent', () => {
  let component: AuthorCreatePageComponent;
  let fixture: ComponentFixture<AuthorCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
