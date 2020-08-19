import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu', //you can change this tag if you want
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  
  selectedDish: Dish;

  //In the constructor...
  constructor( private dishService: DishService) { } 

  //lifeCycle method
  ngOnInit(): void { //will be executed whenever this component is created
    this.dishService.getDishes()
    .subscribe((dishes)=> this.dishes = dishes );
  }

}
