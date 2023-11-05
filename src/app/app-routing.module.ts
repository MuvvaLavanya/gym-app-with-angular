import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JoinUsComponent} from "./home/join-us/join-us.component";
import {InformationComponent} from "./home/information/information.component";
import {TraineeRegistrationComponent} from "./home/trainee-registration/trainee-registration.component";
import {TrainerRegistrationComponent} from "./home/trainer-registration/trainer-registration.component";
import {TrainerProfileComponent} from "./trainer/trainer-profile/trainer-profile.component";
import {TraineeProfileUpdateComponent} from "./trainee/trainee-profile-update/trainee-profile-update.component";
import {DialogBoxComponent} from "./common-folder/dialog-box/dialog-box.component";
import {TrainerProfileUpdateComponent} from "./trainer/trainer-profile-update/trainer-profile-update.component";
import {PasswordUpdateComponent} from "./shared/password-update/password-update.component";
import {TraineeTrainersComponent} from "./trainee/trainee-trainers/trainee-trainers.component";
import {AddTrainingComponent} from "./trainer/add-training/add-training.component";
import {TraineeTrainingsLogsComponent} from "./trainee/trainee-trainings-logs/trainee-trainings-logs.component";
import {TrainerTrainingsLogsComponent} from "./trainer/trainer-trainings-logs/trainer-trainings-logs.component";
import {PageNotFoundComponent} from "./common-folder/page-not-found/page-not-found.component";
import {traineeGuard} from "./guard/trainer.guard";
import {trainerGuard} from "./guard/trainee.guard";
import {SignInComponent} from "./home/sign-in/sign-in.component";
import {TraineeProfileComponent} from "./trainee/trainee-profile/trainee-profile.component";

const routes: Routes = [
  {path: "home", component: InformationComponent},
  {path: "join-us", component: JoinUsComponent},
  {path: "signIn", component: SignInComponent},
  {path: "trainee-signup", component: TraineeRegistrationComponent},
  {path: "trainer-signup", component: TrainerRegistrationComponent},
  {path: "trainee-profile", canActivate:[traineeGuard], component: TraineeProfileComponent},
  {path: "trainer-profile", canActivate:[trainerGuard],component: TrainerProfileComponent},
  {path: "trainee-update", canActivate:[traineeGuard],component: TraineeProfileUpdateComponent},
  {path: "dialog-box", component: DialogBoxComponent},
  {path: "trainer-update", canActivate:[trainerGuard],component: TrainerProfileUpdateComponent},
  {path: "update-password", component: PasswordUpdateComponent},
  {path: "edit-trainee-trainer", component: TraineeTrainersComponent},
  {path: "addTraining", component: AddTrainingComponent},
  {path: "trainee-trainings", component: TraineeTrainingsLogsComponent},
  {path: "trainer-trainings", component: TrainerTrainingsLogsComponent},
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {path: "**",component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
