import {Component} from '@angular/core';
import {TraineeUpdateDto} from "../../model/TraineeUpdateDto";
import {TraineeProfileDto} from "../../model/TraineeProfileDto";
import {Router} from "@angular/router";
import {TraineeService} from "../../../service/trainee.service";
import {SnackBarService} from "../../../service/snack-bar.service";

@Component({
  selector: 'app-trainee-profile-update',
  templateUrl: './trainee-profile-update.component.html',
  styleUrls: ['./trainee-profile-update.component.css']
})
export class TraineeProfileUpdateComponent {
  traineeProfile: TraineeProfileDto = new TraineeProfileDto();
  traineeUpdateDto: TraineeUpdateDto = new TraineeUpdateDto();

  constructor(private router: Router, private traineeService: TraineeService, private snackbarService: SnackBarService) {
  }
  ngOnInit() {
    const state = window.history.state;
    this.traineeProfile = state.traineeProfile;
    console.log(this.traineeProfile);
    const dateObject = new Date(parseInt(this.traineeProfile.dateOfBirth[0]), parseInt(this.traineeProfile.dateOfBirth[1]) - 1, parseInt(this.traineeProfile.dateOfBirth[2]));
  }

  onSubmit() {
    this.traineeUpdateDto.username = this.traineeProfile.userName;
    this.traineeUpdateDto.firstName = this.traineeProfile.firstName
    this.traineeUpdateDto.lastName = this.traineeProfile.lastName
    this.traineeUpdateDto.dateOfBirth = this.traineeProfile.dateOfBirth;
    this.traineeUpdateDto.address = this.traineeProfile.address;
    this.traineeUpdateDto.email = this.traineeProfile.email;
    this.traineeUpdateDto.status = this.traineeProfile.status;
    console.log(this.traineeUpdateDto);
    this.traineeService.updateTraineeProfile(this.traineeUpdateDto).subscribe({
      next:(data:any)=>{
        this.snackbarService.openSnackBar(`Trainee Profile Updated Successfully`);
        this.router.navigate(['trainee-profile'], {state: {profile: this.traineeProfile}});
      },error:(error:any)=>{
        this.snackbarService.openSnackBar(error.error.error);
      }
    })


  }

  backToProfile() {
    this.router.navigate(['trainee-profile'], {state: {profile: this.traineeProfile}});
  }
}
