import { RouterModule, Routes } from "@angular/router";
import { ClienteComponent } from "./component/cliente.component";
import { NgModule } from "@angular/core";
import { ClientesVisualizarComponent } from "./component/clientes-visualizar/clientes-visualizar.component";
import { ClientesCadastroComponent } from "./component/clientes-cadastro/clientes-cadastro.component";
import { ClientesListagemComponent } from "./component/clientes-listagem/clientes-listagem.component";
import { RouteGuard } from "../shared/services/route-guard.services";

export const ClienteRoutes: Routes = [
    {
        path: 'cliente',
        component: ClienteComponent,
        canActivate: [ RouteGuard ],
        children: [
            {
                path: '',
                component: ClientesListagemComponent
            },
            {
                path: 'visualizar/:idParam',
                component: ClientesVisualizarComponent
            },
            {
                path: 'cadastro/:idParam',
                component: ClientesCadastroComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ClienteRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ClienteRoutingModule {}