import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor() {}

  //-------------------------task vlaue variables and function

  private task = new BehaviorSubject<any>(null);
  task$ = this.task.asObservable();

  // Method to update the value
  setValue(newValue: any) {
    this.task.next(newValue);
  }
  // ------------------------ Task Modal trigger funcstion

  private showModalSubject = new BehaviorSubject<boolean>(true);
  showModal$ = this.showModalSubject.asObservable();

  // Method to update the value
  setShowModal(value: boolean) {
    this.showModalSubject.next(value);
  }

  toggleModal() {
    this.showModalSubject.next(!this.showModalSubject.value);
  }

  // ----------------------------------Project Modal trigger funcstion

  private showModalSubjectProject = new BehaviorSubject<boolean>(true);
  showModalProject$ = this.showModalSubjectProject.asObservable();
  // Method to update the value
  setShowModalProject(value: boolean) {
    this.showModalSubjectProject.next(value);
  }

  toggleModalProject() {
    this.showModalSubjectProject.next(!this.showModalSubjectProject.value);
  }
}
