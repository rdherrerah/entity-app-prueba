import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'entity-app-prueba';
  isLoged:boolean | undefined;
  ngOnInit(): void {
      this.isLoged = localStorage.getItem("accessToken")!==null;
  } 
}
