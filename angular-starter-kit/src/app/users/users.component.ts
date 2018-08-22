import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }
  selectedUser = {};

  ngOnInit() {

  }

  updateUserPreview(event:Event){
    console.log('parent - event  ' + JSON.stringify(event));
    this.selectedUser = event;
  }

}
