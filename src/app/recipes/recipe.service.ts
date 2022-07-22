import { Injectable } from '@angular/core';
import { Subject, throttleTime } from 'rxjs';
// import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Cucumber Sandwich',
  //     'It is delicious',
  //     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2022%2F03%2F01%2Fcucumber-sandwich.jpg&q=60',
  //     [
  //       new Ingredient('Sandwich',2),
  //       new Ingredient('cucumber',2)
  //     ]),
  //   new Recipe(
  //     'Home made samosa',
  //     'It is crispy',
  //     'https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800',
  //     [
  //       new Ingredient('Alu',3),
  //       new Ingredient('midha',2)
  //     ])
  // ];
  private recipes:Recipe[] = [];

  constructor(private slService:ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice(); //it will return the exact copy of the array
  }

  setRecipes(recipes:Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index:number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {

    this.slService.addIngredients(ingredients);

  }

  addRecipe(recipe: Recipe) {

    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
