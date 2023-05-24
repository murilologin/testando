import { Injectable } from "@angular/core";
import { HttpUtilService } from "./http-util.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class RouteGuard {

    constructor(
        private httpUtilService: HttpUtilService,
        private router: Router,
        private snackbar: MatSnackBar
    ) { }

    // colocar no admin-routing.module.ts
    // canActivate: [ RouteGuard ]
    canActivate(): boolean {
        if (this.httpUtilService.temToken()) {
            return true;
        }
        this.snackbar.open('Sessão expirada', 'Atenção', {duration: 5000});
        this.router.navigate(['/login']);
        return false;
    }

}