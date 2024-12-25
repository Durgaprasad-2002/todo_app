import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private sharedService: SharedServiceService,
    private shared: TasksService
  ) {}

  // projects names variable
  @Input()
  projects: { _id: string; name: string }[] = [
    { _id: '1', name: 'Project Alpha' },
    { _id: '2', name: 'Project Beta' },
    { _id: '3', name: 'Project Gamma' },
  ];

  //sidebar visible state
  @Input()
  isSidebarVisible: boolean = false;

  //sets the active index on click
  activeIndex = 0;
  isindex(index: number): boolean {
    return this.activeIndex === index;
  }
  setActiveIndex(index: number, project: any): void {
    console.log(project);
    this.shared.setProjectId(project._id);
    this.activeIndex = index;
  }

  //toggle sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  //actives project modal
  showModal() {
    this.sharedService.setShowModalProject(
      !this.sharedService.showModalProject$
    );
  }
}
