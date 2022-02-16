import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionStorageService } from '../../services/local-storage.service';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  constructor(private sessionStorageService: SessionStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tenantID = this.sessionStorageService.getValue('X-TenantID');
    const tenantReq = req.clone({ setHeaders: { 'X-TenantID': tenantID } });

    return next.handle(tenantReq);
  }
}
