import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  public onRefresh: EventEmitter<void> = new EventEmitter();

  constructor() { }

  refresh() {
    this.onRefresh.emit();
  }
}
