import { LoginComponent } from './public-module/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[

  { path: '', loadChildren: () => import("./public-module/public-page.module").then(m => m.PublicPage) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
