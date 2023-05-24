import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouteGuard } from "../shared/services/route-guard.services";
import { ProdutoComponent } from "./component/produto.component";
import { ProdutosListagemComponent } from "./component/produtos-listagem/produtos-listagem.component";
import { ProdutosVisualizarComponent } from "./component/produtos-visualizar/produtos-visualizar.component";
import { ProdutosCadastroComponent } from "./component/produtos-cadastro/produtos-cadastro.component";

export const ProdutoRoutes: Routes = [
    {
        path: 'produto',
        component: ProdutoComponent,
        canActivate: [ RouteGuard ],
        children: [
            {
                path: '',
                component: ProdutosListagemComponent
            },
            {
                path: 'visualizar/:idParam',
                component: ProdutosVisualizarComponent
            },
            {
                path: 'cadastro/:idParam',
                component: ProdutosCadastroComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ProdutoRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProdutoRoutingModule {}