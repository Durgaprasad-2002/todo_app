import { Component, Input, ViewChild } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { ModalformComponent } from '../modalform/modalform.component';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-taskholder',
  imports: [TaskComponent, CommonModule],
  templateUrl: './taskholder.component.html',
  styleUrl: './taskholder.component.css',
})
export class TaskholderComponent {
  constructor(private sharedService: SharedServiceService) {}

  taskDefault: any = '';

  //sets values from parent
  @Input()
  title = '';
  @Input()
  name = '';
  @Input()
  items: any[] = [{ taskname: '', startdate: '', enddate: '', _id: '' }];

  //initizes the modal
  showModal() {
    this.sharedService.setShowModal(!this.sharedService.showModal$);
  }

  update(task: any, status: string) {
    this.taskDefault = { ...task, status: status };

    //sets the editable values of existing task on service, and initilizes the modal
    this.sharedService.setValue(this.taskDefault);
    this.sharedService.setShowModal(!this.sharedService.showModal$);
  }
}
