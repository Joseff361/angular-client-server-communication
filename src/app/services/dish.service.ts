import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ //enable the dependemcy injection
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  
  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: String): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(1000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(1000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id )); //array of dish.id
  }


  // getDishes(): Promise<Dish[]> { //If you want to emit only one value from your observable use "of"
  //   return of(DISHES).pipe(delay(2000)).toPromise();
  // }

  // getDish(id: number): Promise<Dish> {
  //   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  // }

  // getFeaturedDish(): Promise<Dish> {
  //   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  // }



  // getDishes(): Promise<Dish[]> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES), 2000);
  //   });
  // }

  // //The filter returns a sub-array
  // getDish(id: string): Promise<Dish> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  //   });
  // }

  // getFeaturedDish(): Promise<Dish> {
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  //   });
  // }
}
