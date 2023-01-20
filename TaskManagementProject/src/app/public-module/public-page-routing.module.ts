import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PublicPageComponent } from './public-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [

 {path: '',
    component: PublicPageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModuleRoutingModule { }
