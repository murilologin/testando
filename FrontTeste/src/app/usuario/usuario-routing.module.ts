import { RouterModule, Routes } from "@angular/router";
import { UsuarioComponent } from "./component/usuario.component";
import { NgModule } from "@angular/core";
import { UsuariosListagemComponent } from "./component/usuarios-listagem/usuarios-listagem.component";
import { UsuariosVisualizarComponent } from "./component/usuarios-visualizar/usuarios-visualizar.component";
import { UsuariosCadastroComponent } from "./component/usuarios-cadastro/usuarios-cadastro.component";
import { RouteGuard } from "../shared/services/route-guard.services";

export const UsuarioRoutes: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        canActivate: [ RouteGuard ],
        children: [
            {
                path: '',
                component: UsuariosListagemComponent
            },
            {
                path: 'visualizar/:userParam',
                component: UsuariosVisualizarComponent
            },
            {
                path: 'cadastro/:userParam',
                component: UsuariosCadastroComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(UsuarioRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsuarioRoutingModule {}