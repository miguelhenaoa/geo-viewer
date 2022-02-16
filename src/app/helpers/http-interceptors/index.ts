import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TenantInterceptor } from './tenant.interceptor';

export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true }];
