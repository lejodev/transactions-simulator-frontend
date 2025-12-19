import { HttpInterceptorFn } from '@angular/common/http';

export const versionHeaderInterceptor: HttpInterceptorFn = (req, next) => {
    const versionReq = req.clone({
        setHeaders: {
            'X-Frontend-Version': '1.0'
        }
    });
    return next(versionReq);
};
