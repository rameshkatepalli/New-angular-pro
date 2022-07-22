import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; // it will return true or false whether we are in edit mode or new mode(create mode)
        // console.log(this.editMode);
        this.initForm();
        // console.log("hiiii");
      }
    )
  }

  onSubmit() {

    // const newRecipe = new Recipe(
    // this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();

  }

  onCancel() {

    this.router.navigate(['../'], {relativeTo:this.route}) // it will navigate to one step backword
  }

  private initForm() {
    // console.log("init-form")

    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients =  new FormArray([])

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {

          recipeIngredients.push(new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,
              [Validators.required,
               Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
          })
          );
        }

      }

    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients': recipeIngredients
    });

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  AddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index:number) {

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

}