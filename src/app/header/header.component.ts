import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  optionNav:string = '0';
  selectOptionNav(optionNav:string){
    this.optionNav = optionNav;
  }
  
}
