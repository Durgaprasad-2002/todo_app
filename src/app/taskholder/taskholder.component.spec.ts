import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskholderComponent } from './taskholder.component';

describe('TaskholderComponent', () => {
  let component: TaskholderComponent;
  let fixture: ComponentFixture<TaskholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
