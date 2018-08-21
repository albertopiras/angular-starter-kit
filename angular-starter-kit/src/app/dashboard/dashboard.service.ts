import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) { }

    getDashboardStatistics() {
        return this.http.get([
            environment.BACKEND.URL.FULL,
            environment.BACKEND.ENTRY_POINTS.DASHBOARD
        ].join(''));
    }

}