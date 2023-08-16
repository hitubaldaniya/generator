import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'your-code',
  templateUrl: './your-code.component.html',
  styleUrls: ['./your-code.component.scss']
})
export class YourCodeComponent implements OnInit {
  @Input() code: string = ''

  constructor() { }

  ngOnInit() {
  }

}
