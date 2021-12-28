import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
    })

export class HttpErrorInterceptor implements HttpInterceptor {
    error: String = null;  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMsg = '';
              if (error.error instanceof ErrorEvent) {
                // console.log('this is client side error');
                errorMsg = `Error: ${error.error.error.message}`;
              }
              else {
                errorMsg = `${error.error.message}`;
                // console.log('this is Server side error');
                console.log(error);
              }

              window.alert(errorMsg);
              return throwError(errorMsg);
            })
            )
            
            }
}