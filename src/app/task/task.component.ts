import { Component, Input } from '@angular/core';
import { ModalformComponent } from '../modalform/modalform.component';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(private sharedService: SharedServiceService) {}

  //sets data from parent component
  @Input()
  name = '';
  @Input()
  data: { taskname: string; startdate: string; enddate: string } = {
    taskname: '',
    startdate: '',
    enddate: '',
  };
}
