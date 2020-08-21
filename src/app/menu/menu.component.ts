import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';

import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu', //you can change this tag if you want
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: { //ensure that this animation happends when route changes occur
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
      flyInOut(), expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  
  selectedDish: Dish;

  baseURL: String;
  errMess: string;

  //In the constructor...
  constructor( 
    private dishService: DishService
    ) { } 

  //lifeCycle method
  ngOnInit(): void { //will be executed whenever this component is created
    this.dishService.getDishes()
    .subscribe((dishes)=> this.dishes = dishes,
    errmess => this.errMess = <any>errmess); //throw

    this.baseURL = baseURL;
  }

}
