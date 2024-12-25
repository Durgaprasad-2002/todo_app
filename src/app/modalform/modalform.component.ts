import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SharedServiceService } from '../shared-service.service';
import { TasksService } from '../tasks.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modalform',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css'],
})
export class ModalformComponent implements OnInit {
  constructor(
    private sharedService: SharedServiceService,
    private shared: TasksService,
    private http: HttpClient
  ) {}

  //variables
  showModal: boolean = false;
  isValidForm: boolean = false;
  isSubmitting: boolean = false;
  isEdit: boolean = false;

  //initializes the reactive form
  myForm: FormGroup = new FormGroup({});

  //executes on component initializes
  ngOnInit(): void {
    this.sharedService.showModal$.subscribe((state) => {
      this.showModal = state;
    });

    this.sharedService.task$.subscribe((state: any) => {
      let { taskname, startdate, enddate, status, _id } = state;
      this.isEdit = true;
      this.myForm.setValue({
        taskName: taskname,
        startDate: new Date(startdate).toISOString().split('T')[0],
        endDate: new Date(enddate).toISOString().split('T')[0],
        status: status,
      });
    });

    this.myForm = new FormGroup({
      taskName: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
  }

  //hide modal and reset modal
  hideModal() {
    this.isEdit = false;
    this.myForm.reset();
    this.sharedService.setValue(null);
    this.sharedService.setShowModal(!this.showModal);
  }

  //executes on form submission
  SubmitForm(event: Event) {
    event.preventDefault();

    this.isValidForm = this.myForm.valid;
    if (!this.isValidForm) {
      alert('Fill all the inputs');
      console.log('Form is not valid');
      return;
    }

    this.shared.projectId$.pipe(take(1)).subscribe((projectId) => {
      if (projectId) {
        this.sharedService.task$.subscribe((data) => {
          if (data) {
            //this calls the update task
            this.updateTask(
              this.myForm.value,
              projectId,
              data._id,
              data.status
            );
          } else {
            //this calls the create task
            this.createTask(this.myForm.value, projectId);
          }
        });
      } else {
        alert('Project is not Created!');
        console.log('No projectId available.');
      }
    });
  }

  delete() {
    this.shared.projectId$.pipe(take(1)).subscribe((projectId) => {
      if (projectId) {
        this.sharedService.task$.subscribe((data) => {
          if (data) {
            //this calls the delete task
            this.deleteTask(
              this.myForm.value,
              projectId,
              data._id,
              data.status
            );
          }
        });
      } else {
        alert('Project is not Created!');
        console.log('No projectId available.');
      }
    });
  }

  //DeleteTask()
  deleteTask(
    task: {
      taskName: string;
      startDate: string;
      endDate: string;
      status: string;
    },
    projectId: string,
    taskId: string,
    status: string
  ): void {
    if (this.isSubmitting) {
      alert('Already submitting...');
      console.log('Already submitting...');
      return;
    }

    this.isSubmitting = true;

    this.http
      .delete(
        `https://todo-2za8.onrender.com/api/projects/${projectId}/${status}/${taskId}`
      )
      .subscribe({
        next: (data) => this.onSuccess(),
        error: (err) => this.onError(err),
      });
  }

  //updates task
  updateTask(
    task: {
      taskName: string;
      startDate: string;
      endDate: string;
      status: string;
    },
    projectId: string,
    taskId: string,
    status: string
  ): void {
    if (this.isSubmitting) {
      alert('Already submitting...');
      console.log('Already submitting...');
      return;
    }

    this.isSubmitting = true;

    this.http
      .put(
        `https://todo-2za8.onrender.com/api/projects/${projectId}/${status}/${taskId}`,
        {
          taskname: task.taskName,
          startdate: task.startDate,
          enddate: task.endDate,
          status: task.status,
        }
      )
      .subscribe({
        next: (data) => this.onSuccess(),
        error: (err) => this.onError(err),
      });
  }

  //creates task
  createTask(
    task: {
      taskName: string;
      startDate: string;
      endDate: string;
      status: string;
    },
    projectId: string
  ) {
    if (this.isSubmitting) {
      console.log('Already submitting...');
      return;
    }

    this.isSubmitting = true;

    this.http
      .post<{
        _id: string;
        name: string;
        todo: [];
        inprogress: [];
        inreview: [];
        completed: [];
      }>(
        `https://todo-2za8.onrender.com/api/projects/${projectId}/${task.status}`,
        {
          taskname: task.taskName,
          startdate: task.startDate,
          enddate: task.endDate,
        }
      )
      .subscribe({
        next: (data) => this.onSuccess(),
        error: (err) => this.onError(err),
      });
  }

  //executes on request failed
  onSuccess() {
    this.isEdit = false;
    this.myForm.reset();
    this.isSubmitting = false;
    this.hideModal();
    window.location.reload();
  }

  //executes on request error
  onError(err: any) {
    console.error('Error creating task:', err);
    this.isSubmitting = false;
  }
}
