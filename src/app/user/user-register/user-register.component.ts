import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userSubmitted: Boolean = false;
  user!: User;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    // this.registrationForm = new FormGroup(
    //   {
    //     name: new FormControl(null, Validators.required),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //     password: new FormControl(null, [
    //       Validators.required,
    //       Validators.minLength(8),
    //     ]),
    //     confirmPassword: new FormControl(null, [Validators.required]),
    //     mobile: new FormControl(null, [
    //       Validators.required,
    //       Validators.maxLength(11),
    //     ]),
    //   },
    //   [this.passwordMatchingValidator]
    // );
    // this.registrationForm.controls['name'].setValue('John Doe', );
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group(
      {
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
        mobile: [null, [Validators.required, Validators.maxLength(11)]],
      },
      {
        validators: this.passwordMatchingValidator,
      }
    );
  }

  passwordMatchingValidator(formGroup: AbstractControl): Validators | null {
    return formGroup.get('password')?.value ===
      formGroup.get('confirmPassword')?.value
      ? null
      : { notMatched: true };
  }

  /** Getters for all form for all form control */
  get name() {
    return this.registrationForm.get('name') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    this.userSubmitted = true;
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      // this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('Congrats!!');
    } else {
      this.alertify.error('Invalid Registration');
    }
  }

  userData(): User {
    return (this.user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
    });
  }
}
