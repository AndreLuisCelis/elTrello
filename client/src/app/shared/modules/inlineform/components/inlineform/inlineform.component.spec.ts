import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineformComponent } from './inlineform.component';

describe('InlineformComponent', () => {
  let component: InlineformComponent;
  let fixture: ComponentFixture<InlineformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
