import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UsersService } from '../users.service';
import { NgForm } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material';
import { finalize} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  animations: [
    trigger('filterState', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ])
    ])]
})
export class UsersFilterComponent implements OnInit {

  isSubmitting: boolean = false;

  name: String;

  @ViewChild('usersForm') currentForm: NgForm;
  @ViewChild('genderGroup') genderGroup: MatButtonToggleGroup;

  constructor(private usersService: UsersService, private toastrService: ToastrService) {
  }

  @Output() filterApplied = new EventEmitter<boolean>();

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.isSubmitting = true;
    const filters = {};
    filters['name'] = this.currentForm.value.barcode;
    filters['gender'] = this.genderGroup.value;
    this.filterApplied.emit(true);

    this.usersService.getUserList(filters).subscribe((success)=>{
      // console.log('filter applied');
      this.isSubmitting= false;
    },(err)=>{
      // console.log('filter error');
      this.isSubmitting= false;
      this.toastrService.error(JSON.stringify(err), 'Filter  Error:', {
        timeOut: 3000,
      });
    });
  }

}
