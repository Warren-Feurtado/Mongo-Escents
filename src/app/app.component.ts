import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mongo-Escents';

  patchScrolling(){
    window.scroll({behavior: 'smooth', top: 0});
  }


}


