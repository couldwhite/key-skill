import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import {ExerciseComponent} from "./exercise/exercise.component";
import {ExerciseProcessComponent} from "./exercise-process/exercise-process.component";

const routes: Routes = [
  {
    path: 'home',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'exercises',
    component: ExerciseComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'exercises/exercise-process/:id',
    component: ExerciseProcessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
