import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskholderComponent } from './taskholder/taskholder.component';
import { CommonModule } from '@angular/common';
import { ProjectmodalformComponent } from './projectmodalform/projectmodalform.component';
import { TasksService } from './tasks.service';
import { HttpClient } from '@angular/common/http';
import { ModalformComponent } from './modalform/modalform.component';
import { SharedServiceService } from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    SidebarComponent,
    TaskholderComponent,
    CommonModule,
    ProjectmodalformComponent,
    ModalformComponent,
  ],
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    private shared: TasksService,
    private modalService: SharedServiceService
  ) {}

  //variables
  projectName: string = '';
  taskDefault = {};
  title = 'app';
  tasks: {
    todo: {
      taskname: string;
      startdate: string;
      enddate: string;
      _id: string;
    }[];
    inprogress: {
      taskname: string;
      startdate: string;
      enddate: string;
      _id: string;
    }[];
    inreview: {
      taskname: string;
      startdate: string;
      enddate: string;
      _id: string;
    }[];
    completed: {
      taskname: string;
      startdate: string;
      enddate: string;
      _id: string;
    }[];
  } = {
    todo: [],
    inprogress: [],
    inreview: [],
    completed: [],
  };
  projects: { _id: string; name: string }[] = [];

  // sidebar toggle function and variable
  isSidebarVisible: boolean = false;
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  //executes the block on component Initialized
  ngOnInit(): void {
    this.getProjects();
    this.shared.projectId$.subscribe((projectId) => {
      if (projectId) {
        this.getTasks(projectId);
      }
    });
  }

  // retrives the projects names and ids for sidebar
  getProjects() {
    this.http
      .get<any[]>('https://todo-2za8.onrender.com/api/projects/names')
      .subscribe((data) => {
        this.projects = data;
        if (this.projects.length > 0) {
          this.shared.setProjectId(this.projects[0]._id);
        }
      });
  }

  // retrives tasks by projectId
  getTasks(projectId: string) {
    this.http
      .get<any>(
        `https://todo-2za8.onrender.com/api/projects/tasks/${projectId}`
      )
      .subscribe((data) => {
        this.projectName = data.name;
        this.tasks = data;
      });
  }
}
