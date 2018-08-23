import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Subject, Observable } from "rxjs";
import { retry } from "rxjs/operators";


@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }

    userListChanged = new Subject<Array<any>>();
    userList = [];
    currentFilters = {}

    getUserList(filters: any) {
        debugger;
        // returns an observable, this will be used in user-filter.component
        return new Observable<any>(observer => {
            this.currentFilters = { ...this.currentFilters, ...filters };
            if(!filters['offset']){
                this.currentFilters['offset'] = 0;
            }
            this.http.post([
                environment.BACKEND.URL.FULL,
                environment.BACKEND.ENTRY_POINTS.USERS
            ].join(''), this.currentFilters).pipe(retry(3)).subscribe((response) => {
                if(response['data']){
                    this.userList = response['data'];
                    this.userListChanged.next(this.userList);
                    observer.next(true);
                }
            }, (error) => {
                this.catchError(error);
                observer.error(error);
            });
        })
    }

    catchError(error) {
        console.log('error ' + JSON.stringify(error));
    }

}