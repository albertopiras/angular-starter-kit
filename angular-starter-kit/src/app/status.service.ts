import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {

  private statuspoller;
  public statusChanged = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    // this.startPolling();
  }

  startPolling() {
    this.retrieveStatus();
  }

  stopPolling() {
    clearTimeout(this.statuspoller);
  }


  //start status polling
  retrieveStatus() {
    this.httpClient.get([
      environment.BACKEND.URL.FULL,
      environment.BACKEND.ENTRY_POINTS.STATUS
    ].join('')).pipe(
      finalize(() => {
        this.statuspoller = setTimeout(() => {
          this.retrieveStatus();
        }, environment.FRONTEND.POLLING_TIMEOUT);
      }
      )
    ).subscribe((response) => {
      this.statusChanged.next(response);
    });
  }



}
