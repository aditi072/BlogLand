import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirmed.validator';
import { Auth2Service } from './auth2.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupForm: FormGroup = new FormGroup({});
  SignupForm2: FormGroup = new FormGroup({});
  Submit = false;
  Submit2 = false;

  Data: Array<any> = [
    { name: 'Technology', value: 'Technology' },
    { name: 'Music', value: 'Music' },
    { name: 'Self-Help-Therapies', value: 'Self-Help-Therapies' },
    { name: 'Travel', value: 'Travel' },
    { name: 'Food', value: 'Food' },
    { name: 'Finance', value: 'Finance' },
    { name: 'Beauty', value: 'Beauty' },
    { name: 'Poetry', value: 'Poetry' },
    { name: 'Mythology & History', value: 'Mythology & History' },
    { name: 'Politics', value: 'Politics' }
  ];

  constructor(fb: FormBuilder, private router: Router, private auth2Service: Auth2Service) {
    this.SignupForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      dob: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}")])],
      confirm_password: new FormControl('', [Validators.required])
    },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      }
    )

    this.SignupForm2 = fb.group({
      userName: [''],
      bio: [''],
      myTopics: fb.array([''], Validators.required)
    })
  }

  ngOnInit() { }

  onNext() {
    console.log(this.SignupForm);
    this.Submit = true;

    const fullName = this.SignupForm.value.name;
    const email = this.SignupForm.value.email;
    const contact = this.SignupForm.value.contact;
    const DOB = this.SignupForm.value.dob;
    const password = this.SignupForm.value.password;
    const confirmPassword = this.SignupForm.value.confirm_password;

    this.auth2Service.signup(fullName, email, contact, DOB, password, confirmPassword)
  }

  onSubmit() {
    console.log(this.SignupForm2);
    this.Submit2 = true;

    const userName = this.SignupForm2.value.userName;
    const bio = this.SignupForm2.value.bio;
    const myTopics = this.SignupForm2.value.myTopics;
    var filtered = myTopics.filter(function (myTopics: any) {
      return myTopics != "";
    });
    const id = this.auth2Service.id;

    this.auth2Service.signup2(id, userName, bio, filtered);
  }

  genuserName(){
    const userName = this.SignupForm2.value.userName;
    this.auth2Service.genuserName(userName);
  }

  onVerify() {}

onCheckboxChange(e) {
  const myTopics: FormArray = this.SignupForm2.get('myTopics') as FormArray;

  if (e.target.checked) {
    myTopics.push(new FormControl(e.target.value));
  }
  else {
    let i: number = 1;
    myTopics.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        myTopics.removeAt(i);
        return;
      }
      i++;
    });
  }
}
}
