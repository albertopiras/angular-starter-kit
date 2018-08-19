import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'home',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
                // resolve: { server: ServerResolver }
            }
            // {
            //     path: 'users',
            //     children: [
            //         {
            //             path: '',
            //             redirectTo: 'list',
            //             pathMatch: 'full'
            //         },
            //         {
            //             path: 'list'
            //             // component: 
            //         },
            //         {
            //             path: ':id'
            //             // component: 
            //         }
            //     ]
            // }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
        // resolve: { server: ServerResolver }
    },
    {
        path: 'not-found',
        component: ErrorPageComponent,
        data: { message: 'Error : Page not Found!' }
    },
    //importante che il default sia alla fine
    {
        path: '**',
        redirectTo: '/not-found'
    }

];
@NgModule({

    // hashtag -> use useHash:true
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
