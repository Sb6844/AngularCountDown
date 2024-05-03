import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../_services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(public storageService: StorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.storageService.isLoggedIn())
    {
      let newRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getToken()}`
        }
      })
      return next.handle(newRequest);
    }

    // calls next so that the call continues on the chain
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true
  }
]
