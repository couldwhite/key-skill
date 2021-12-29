import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {ModComponent} from './mod/mod.component';
import {AdminComponent} from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ExerciseComponent} from './exercise/exercise.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { LogoutComponent } from './logout/logout.component';
import { NewExerciseModalComponent } from './new-exercise-modal/new-exercise-modal.component';
import {MatSelectModule} from "@angular/material/select";
import { ExerciseProcessComponent } from './exercise-process/exercise-process.component';
import {MatKeyboardConfig, MatKeyboardModule} from "angular-onscreen-material-keyboard";
import { DeleteExerciseModalComponent } from './delete-exercise-modal/delete-exercise-modal.component';
import { GeneralStatisticComponent } from './general-statistic/general-statistic.component';
import { NgApexchartsModule } from "ng-apexcharts";
import {MatButtonModule} from "@angular/material/button";
import { ErrorExitGameModalComponent } from './error-exit-game-modal/error-exit-game-modal.component';
import { SuccessGameModalComponent } from './success-game-modal/success-game-modal.component';
import { ReferenceUserComponent } from './reference-user/reference-user.component';
import { ReferenceAdminComponent } from './reference-admin/reference-admin.component';
import { UserCardModalComponent } from './user-card-modal/user-card-modal.component';
import { SureDeleteUserModalComponent } from './sure-delete-user-modal/sure-delete-user-modal.component';
import { SureStartGameModalComponent } from './sure-start-game-modal/sure-start-game-modal.component';
import {UserStatisticComponent} from "./user-statistic/user-statistic.component";
import { BlockUserModalComponent } from './block-user-modal/block-user-modal.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AboutUsModalComponent } from './about-us-modal/about-us-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ModComponent,
    AdminComponent,
    ExerciseComponent,
    NewUserModalComponent,
    LogoutComponent,
    NewExerciseModalComponent,
    ExerciseProcessComponent,
    GeneralStatisticComponent,
    DeleteExerciseModalComponent,
    ErrorExitGameModalComponent,
    SuccessGameModalComponent,
    ReferenceUserComponent,
    ReferenceAdminComponent,
    UserCardModalComponent,
    SureDeleteUserModalComponent,
    SureStartGameModalComponent,
    UserStatisticComponent,
    BlockUserModalComponent,
    AboutUsModalComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSelectModule,
        MatKeyboardModule,
        ReactiveFormsModule,
        FormsModule,
        NgApexchartsModule,
        MatButtonModule,
        MatButtonModule,
        MatSnackBarModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
