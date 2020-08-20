import { Component, OnInit, ViewChild } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


import { Params, ActivatedRoute } from '@angular/router'; //access to the routers parameters
import { Location } from '@angular/common'; //track the location of my page in the browser's history

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  baseURL: string;
  errMess: string;

  date = new Date();

  dishcopy: Dish;

  comment: Comment;
  commnentForm: FormGroup;
  @ViewChild('fform') commentFormDirective;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required' : 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.'
    },
    'comment': {
      'required' : 'Comment is required.',
      'minlength':  'Comment must be at least 2 characters long.',
      'maxlength':  'Comment cannot be more than 200 characters long.'
    }
  };
  

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.createForm();

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    //switchmap => interrupts an observable while map it and creates a new observable 
    this.route.params
    .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
               errmess => this.errMess = <any>errmess);

    this.baseURL = baseURL;
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back(); //back into the previous item in the browser's history
  }

  createForm(): void{
    this.commnentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2)]], 
      rating: ['5',],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]]
    });

    this.commnentForm.valueChanges 
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); 
  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.commnentForm) { return; } //has been created?
    
    const form = this.commnentForm;
    
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

  onSubmit(){
    //New comment
    this.comment = this.commnentForm.value;
    this.comment.date = this.date.toString();

    //Push new comment into the dish
    this.dishcopy.comments.push(this.comment);

    this.dishService.putDish(this.dishcopy)//Sending a copy instead of the original dish
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish; //If the update is successful
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

    this.commentFormDirective.resetForm(); 
    this.commnentForm.reset({
      author: '',
      comment: '',
      rating: '5'
    });
    
  }

}
