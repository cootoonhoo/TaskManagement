import { AuthGuard } from './core/auth.guard';
import { ListComponent } from './tasks/components/list/list.component';
import { CreateTaskComponent } from './tasks/components/create-task/create-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';


const routes: Routes = [

  { path: '', loadChildren: () => import("./public-module/public-page.module").then(m => m.PublicPage) },

  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      {
        path: 'create',
        component: CreateTaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:id',
        component: CreateTaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'',
        component: ListComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
