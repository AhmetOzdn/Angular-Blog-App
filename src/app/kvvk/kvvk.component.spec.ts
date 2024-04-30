import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvvkComponent } from './kvvk.component';

describe('KvvkComponent', () => {
  let component: KvvkComponent;
  let fixture: ComponentFixture<KvvkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvvkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvvkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
