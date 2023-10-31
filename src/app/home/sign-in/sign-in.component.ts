import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialsDto} from "../../model/CredentialsDto";
import {Router} from "@angular/router";
import {SnackBarService} from "../../../service/snack-bar.service";
import {SigninService} from "../../../service/signin.service";
import {TraineeService} from "../../../service/trainee.service";
import {TrainerService} from "../../../service/trainer.service";
import {GuardService} from "../../guard/GuardService";
import {TrainerProfileDto} from "../../model/TrainerProfileDto";
import {TraineeProfileDto} from "../../model/TraineeProfileDto";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  credentials: CredentialsDto = new CredentialsDto();
  loginForm: any
  selectedUserType: string = 'trainee';


  constructor(private router: Router, private snackbarService: SnackBarService, private signInService: SigninService, private traineeService: TraineeService, private trainerService: TrainerService
  ,private guardService:GuardService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.credentials.username = this.loginForm.value.username;
    this.credentials.password = this.loginForm.value.password;
    this.signInService.userAuthentication(this.credentials).subscribe(data => {
      console.log(data);
      if (data == true) {
        console.log("user exist")
        if (this.selectedUserType === 'trainee') {
          this.traineeService.getTraineeProfile(this.credentials.username).subscribe(data => {
            if (data.error) {
              this.snackbarService.openSnackBar(`Trainee with username ${this.credentials.username} not found.`);
            } else {
              let traineeProfile: TraineeProfileDto = data
              this.guardService.setUserRole(2);
              this.router.navigate(['trainee-profile'], {state: {traineeProfile}});
            }
          })
        } else if (this.selectedUserType === 'trainer') {

          this.trainerService.getTrainerProfile(this.credentials.username).subscribe(data => {
            console.log(data);
            if (data.error) {
              this.snackbarService.openSnackBar(`Trainer with username ${this.credentials.username} not found.`);

            } else {
              let trainerProfile: TrainerProfileDto = data
              this.guardService.setUserRole(1);
              this.router.navigate(['trainer-profile'], {state: {trainerProfile}});

            }
          });
        }
      } else {
        this.snackbarService.openSnackBar(`Enter Valid Username and Password`);
      }
    });

  }
}
