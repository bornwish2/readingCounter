import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private snackWrapperService: SnackWrapperService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.showSpinnerConsiderExceptions();
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          try {

            if (error.status === 400) {
              if (error.error.message) {
                this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
              }
              else
                this.snackWrapperService.openSnackBar('مقادیر را بررسی و مجددا امتحان نمایید', ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
            }
            //401 handling in authService
            if (error.status === 403) {
              this.snackWrapperService.openSnackBar('شما به این قسمت دسترسی ندارید', ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === 404) {
              if (error.error.message)
                this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
              else
                this.snackWrapperService.openSnackBar('اطلاعاتی پیدا نشد، لطفا داده ورودی را بدقت وارد نمایید', ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            if (error.status === 405) {
              this.snackWrapperService.openSnackBar(error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === 408) {
              this.snackWrapperService.openSnackBar('زمان ارسال درخواست به سرویس دهنده به اتمام رسید، احتمالا شبکه کٌند و یا قطع است، لطفا دقایقی دیگر امتحان نمایید', ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
            }
            if (error.status === 409) {
              this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
            }
            if (error.status === 410) {
              this.snackWrapperService.openSnackBar('چنین آیتمی پیدا نشد، یا قبلاً حذف شده است', ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === 422) {
              this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === 0) {
              this.snackWrapperService.openSnackBar('از دسترسی به شبکه اطمینان حاصل نمایید', ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            if (error.status === 500 || error.status === 502) {
              this.snackWrapperService.openSnackBar('خطای سرویس دهنده', ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            if (error.status === 504) {
              this.snackWrapperService.openSnackBar('پاسخی دریافت نشد', ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }

            this.spinnerWrapperService.stopLoading();
            this.spinnerWrapperService.stopLoadingSmallSpinner();

            return throwError(() => error);

          } catch (e) { }
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.spinnerWrapperService.stopLoading();
            this.spinnerWrapperService.stopLoadingSmallSpinner();
          }
          return evt;
        })
      )
  }
  showSpinnerConsiderExceptions = () => {
    const url = this.router.url;
    if (url === '/wr/db' || url === '/wr/m/r/apk') {
      this.spinnerWrapperService.startLoadingSmallSpinner();
    }
    else {
      this.spinnerWrapperService.startLoading();
    }
  }
}
