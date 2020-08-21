import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { //ensure that this animation happends when route changes occur
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
      flyInOut()
  ]
})
export class ContactComponent implements OnInit {
  
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMess: string;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required' : 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required' : 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required' : 'Tel. number is required.',
      'pattern'  : 'Tel. number must contain only numbers.'
    },
    'email': {
      'required' : 'Email is required.',
      'email'    : 'Email not in valid format.'
    },
  };

  //Get access any of the child child DOM elements whitin my template
  @ViewChild('fform') feedbackFormDirective;


  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
    ){
    this.createForm();
  }

  ngOnInit(): void {
  }

 createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.feedbackForm) { return; } //has been created?
    
    const form = this.feedbackForm;
    
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {//make sure that the object contain the property
        
        this.formErrors[field] = ''; // clear previous error message (if any)

        const control = form.get(field); //const form = this.feedbackForm;

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) { // const control = form.get(field);
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback => {
        this.feedback = feedback;
      },
      errmess => { this.feedback = null; this.errMess = <any>errmess; });
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm(); //ensure a completely reset
    //#fform="ngForm"
  }
}

//https://angular.io/guide/reactive-forms