import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmodalformComponent } from './projectmodalform.component';

describe('ProjectmodalformComponent', () => {
  let component: ProjectmodalformComponent;
  let fixture: ComponentFixture<ProjectmodalformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectmodalformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectmodalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
