import {Component} from '@angular/core';
import {Trainer} from "../../model/Trainer";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TrainerService} from "../../../service/trainer.service";
import {DialogBoxComponent} from "../../common-folder/dialog-box/dialog-box.component";
import {SnackBarService} from "../../../service/snack-bar.service";

interface Specialization {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-trainer-registration',
  templateUrl: './trainer-registration.component.html',
  styleUrls: ['./trainer-registration.component.css']
})
export class TrainerRegistrationComponent {
  trainer: Trainer = new Trainer();
  specializations: Specialization[] = [
    {value: 'fitness', viewValue: 'fitness'},
    {value: 'yoga', viewValue: 'yoga'},
    {value: 'Zumba', viewValue: 'Zumba'},
    {value: 'stretching', viewValue: 'stretching'},
    {value: 'resistance', viewValue: 'resistance'},
  ];
  registrationForm: any;

  constructor(private trainerService: TrainerService, private router: Router, public dialog: MatDialog,private snackbarService:SnackBarService) {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
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
    this.trainer.firstName = this.registrationForm.value.firstName;
    this.trainer.lastName = this.registrationForm.value.lastName;
    this.trainer.specialization = this.registrationForm.value.specialization;
    console.log(this.registrationForm.value.trainingType);
    this.trainer.email = this.registrationForm.value.email;
    this.trainerService.saveTrainer(this.trainer).subscribe(data => {
      console.log(data);
      if(data.username) {
        this.dialog.open(DialogBoxComponent, {
          data: {username: data.username, password: data.password}
        });
      }
      else{
        this.snackbarService.openSnackBar(data.error);
      }
    })
  }
}
