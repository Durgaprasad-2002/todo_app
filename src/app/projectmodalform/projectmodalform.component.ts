import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedServiceService } from '../shared-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-projectmodalform',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './projectmodalform.component.html',
  styleUrl: './projectmodalform.component.css',
})
export class ProjectmodalformComponent {
  constructor(
    private sharedService: SharedServiceService,
    private http: HttpClient
  ) {}

  //variables
  showModal: boolean = false;
  myFormp: FormGroup = new FormGroup({});
  isValidForm: boolean = false;
  private subscription: Subscription | undefined;
  isSubmitting: boolean = false;

  //executes on component initializes
  ngOnInit(): void {
    this.subscription = this.sharedService.showModalProject$.subscribe(
      (state) => {
        this.showModal = state;
      }
    );
    this.myFormp = new FormGroup({
      projectName: new FormControl(null, Validators.required),
    });
  }

  //executes on component destory's
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //hides modal
  hideModal() {
    this.sharedService.setShowModalProject(!this.showModal);
  }

  //executes on form submission
  SubmitForm() {
    if (!this.myFormp.valid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.createProject(this.myFormp.value.projectName);
  }

  //creates project
  async createProject(projectName: string) {
    this.http
      .post<{ _id: string; name: string }>(
        `https://todo-2za8.onrender.com/api/projects/`,
        {
          projectName: projectName,
        }
      )
      .subscribe({
        next: (data) => {
          this.isSubmitting = false;
          this.myFormp.reset();
          this.hideModal();
          window.location.reload();
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Error creating project:', err);
        },
      });
  }
}
