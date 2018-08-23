import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UsersService } from '../users.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private usersSubscription: Subscription;

  //Material table
  displayedColumns: string[] = ['name', 'surname','email', 'address','gender'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selectedUserId: number;

  // paginator
  pageSize: number = 5;
  pageIndex: number = 0;
  offset: number = 0;
  totalCount = 0;

  isLoadingResults = true;
  isRateLimitReached = false;
  firstTimeLoaded = true;

  @Output() singleRowSelection = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersService: UsersService, private toastrService: ToastrService) {
    this.updateListItems();
  }

  ngOnInit() {
    this.usersSubscription = this.usersService.userListChanged.
      subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data['users']);
          this.isLoadingResults = false;
          this.totalCount = data['total_items'];

          // select first row
          if (this.firstTimeLoaded && this.dataSource.data.length > 0) {
            const firstRow = this.dataSource.data[0];
            this.singleRowSelection.emit(firstRow);
            this.selectedUserId = firstRow.id;
            this.firstTimeLoaded = false;
          }
        }
      )
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  updateListItems() {
    let filters = { offset: this.pageIndex * this.pageSize, pagesize: this.pageSize };
    // console.log('call: page index ' + this.pageIndex + '\n page size: ' + this.pageSize+ '\n offset: ' + (this.pageIndex )*this.pageSize);
    this.usersService.getUserList(filters).subscribe((success) => {
      // console.log('filter applied');
      this.isLoadingResults = false;
    }, (err) => {
      // console.log('filter error');
      this.isLoadingResults = false;
      this.toastrService.error(JSON.stringify(err), 'User list error:', {
        timeOut: 3000,
      });
    });
    this.isLoadingResults = true;
  }

  updateList(event) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log('paginator - update list');

    //rebuild the list
    this.updateListItems();

    // reset multi select
    this.selection.clear();
  }

  resetPaginatorIndex(){
    this.pageIndex = 0;
  }

  selectRow(row: any) {
      //single select
      this.singleRowSelection.emit(row);
      this.selectedUserId = row.id;
  }

}


