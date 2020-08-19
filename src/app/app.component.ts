import { Component } from '@angular/core'; //Now we can use de decorator "Component"

@Component({//Takes a js object as a parameter
  selector: 'app-root', //selector for the component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { // export = It will be exported in my module
  title = 'conFusion'; //Angular app will display this in the browser
}
