import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditingComponent } from './content-editing.component';

describe('ContentEditingComponent', () => {
  let component: ContentEditingComponent;
  let fixture: ComponentFixture<ContentEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEditingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
