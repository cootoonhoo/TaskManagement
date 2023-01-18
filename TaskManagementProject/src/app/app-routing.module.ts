import { ListComponent } from './tasks/components/list/list.component';
import { CreateTaskComponent } from './tasks/components/create-task/create-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      {
        path: 'create',
        component: CreateTaskComponent
      },
      {
        path: 'edit/:id',
        component: CreateTaskComponent
      },
      {
        path:'',
        component: ListComponent
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
