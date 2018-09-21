import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { VariableAst } from '@angular/compiler';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthService', () => {

    var service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.get(AuthService);
    });


    it('shouldc call api/login/ with authorization header', inject([HttpTestingController, AuthService], (
        httpMock: HttpTestingController,
        authService: AuthService) => {

        var credentials = { username: "userAdmin", pwd: "passwordAdmin" };

        //do login call
        authService.login({ username: "userAdmin", pwd: "passwordAdmin" }).subscribe();

        const req = httpMock.expectOne(r =>
            r.headers.has('Authorization') &&
            r.headers.get('Authorization') === "Basic " + btoa(credentials.username + ":" + credentials.pwd));
        expect(req.request.method).toEqual('POST');
        req.flush({
            data: {},
            error_code: null
        });

        httpMock.verify();
    })
    );


});
