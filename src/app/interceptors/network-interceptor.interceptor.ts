import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { ErrorDialogService } from '../services/error-dialog.service';

@Injectable()
export class NetworkInterceptorInterceptor implements HttpInterceptor {

  constructor(private spinnerService:LoadingService,
    private errorDialogService: ErrorDialogService,) {}


 
   intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Error from error interceptor", error);
        this.errorDialogService.openDialog(error.message ?? JSON.stringify(error), error.status);
        return throwError(error);
      }),
      finalize(() => {
        this.spinnerService.hide();
      })
    ) as Observable<HttpEvent<any>>;
  }
}

