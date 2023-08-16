import { Component } from '@angular/core';
import { Services } from './services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'altar-task';
  constructor(public signatureService: Services){ } 
}
