import { Component } from '@angular/core';
import { News } from './models/news';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  news:News
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
 

}
