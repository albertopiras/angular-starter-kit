import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  @ViewChild(UsersListComponent) child:UsersListComponent;

  selectedUser = {};
  constructor() { }
  ngOnInit() {

  }

  resetPaginationOffset(){
    this.child.resetPaginatorIndex();
  }

  updateUserPreview(event:Event){
    console.log('parent - event  ' + JSON.stringify(event));
    this.selectedUser = event;
  }

}
