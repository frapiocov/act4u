import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  timer: any;

  status: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor() { }

  showToast(msg: string) {
    this.status.next(msg);
    if (this.timer) {
      clearTimeout(this.timer);
    }
      this.timer = window.setTimeout(() => {
        this.status.next(null);
      }, 12000);
  }
}
