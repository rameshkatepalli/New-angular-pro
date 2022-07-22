import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients:Ingredient[] = [
    new Ingredient('Bread',2),
    new Ingredient('cucumbers',25)
  ]

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());

  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredients(ingredients:Ingredient[]) {

    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients); //this will push the ingredients as a list of ing and reduces time taken
    this.ingredientChanged.next(this.ingredients.slice());
    console.log(this.ingredients);

  }

  updateIngredient(index:number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number) {
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
