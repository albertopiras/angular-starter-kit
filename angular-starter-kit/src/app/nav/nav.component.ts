import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private statusSubscription: Subscription;
  warnings:number;
  status:number;

  constructor(private authService: AuthService, private statusService:StatusService) { }

  ngOnInit() {
    this.statusSubscription = this.statusService.statusChanged.
    subscribe(
      (response) => {
        this.warnings = response.warnings.counter;
        this.status = response.data;
      })
  }

  ngOnDestroy(){
    this.statusSubscription.unsubscribe();
    this.statusService.stopPolling();
  }

  onLogout(){
    this.authService.logout();
  }

}
