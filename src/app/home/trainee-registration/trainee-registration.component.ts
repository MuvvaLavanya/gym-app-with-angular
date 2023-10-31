import {Component} from '@angular/core';
import {Trainee} from "../../model/Trainee";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TraineeService} from "../../../service/trainee.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../../common-folder/dialog-box/dialog-box.component";
import {SnackBarService} from "../../../service/snack-bar.service";

@Component({
  selector: 'app-trainee-registration',
  templateUrl: './trainee-registration.component.html',
  styleUrls: ['./trainee-registration.component.css']
})
export class TraineeRegistrationComponent {
  trainee: Trainee = new Trainee();
  registrationForm: any;

  constructor(private traineeService: TraineeService, private router: Router, public dialog: MatDialog,private snackbarService:SnackBarService) {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(''),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+@gmail\.com$/i)])
    });
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  onSubmit() {
    this.trainee.firstName = this.registrationForm.value.firstName;
    this.trainee.lastName = this.registrationForm.value.lastName;
    this.trainee.dateOfBirth = this.registrationForm.value.dateOfBirth;
    this.trainee.address = this.registrationForm.value.address;
    this.trainee.email = this.registrationForm.value.email;
    console.log(this.trainee);
    this.traineeService.saveTrainee(this.trainee).subscribe(data => {
      console.log(data);
      if(data.error) {
        this.snackbarService.openSnackBar(data.error);
      }
      else{
        this.dialog.open(DialogBoxComponent, {
          data: {username: data.username, password: data.password}
        });
      }
    })
  }
}
