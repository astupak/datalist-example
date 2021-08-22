import { Component } from '@angular/core';

const ITEMS = ['Edge', 'Firefox', 'Chrome', 'Opera', 'Safari'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'datalist';

  items = ITEMS;

  logChanges(value: string) {
    console.log(value);
  }
}
