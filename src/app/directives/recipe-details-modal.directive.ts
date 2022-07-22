import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Directive({
  selector: '[appRecipeDetailsModal]'
})
export class RecipeDetailsModalDirective {

  @HostBinding('style.backgroundColor') backgroundColor:string = 'transparent';

  @Input() recipeSelected:Recipe;

  constructor(private elementRef:ElementRef, private renderer:Renderer2) { }

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  @HostListener('mouseenter') mouseover(eventData: Event) {

    //this.backgroundColor = 'blue';
    //this.recipeWasSelected.emit(this.recipeSelected);

  }

}
