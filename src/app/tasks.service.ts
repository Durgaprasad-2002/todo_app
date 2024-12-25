import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private projectIdSubject = new BehaviorSubject<string>('');

  projectId$ = this.projectIdSubject.asObservable();

  setProjectId(id: string) {
    this.projectIdSubject.next(id);
  }
}
