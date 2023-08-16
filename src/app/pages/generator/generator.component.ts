import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, throttleTime } from 'rxjs/operators';
import { Services } from '../../services/services.service'
import { Types } from 'src/app/types';

@Component({
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  size = this.services.size
  generator_interval = this.services.interval

  generator_running$ = this.services.running$
  generator_timer$ = this.services.generator_timer$
  current_signature$ = this.services.current_signature$

  current_signature: Types | null = null
  prefered_char: string = ''

  @ViewChild('input_character', { static: true }) character: ElementRef

  constructor(public services: Services) {
  }

  ngOnInit() {
    this.current_signature$.subscribe(signature => this.current_signature = signature)

    fromEvent(this.character.nativeElement, 'keyup').pipe(
      map((event: KeyboardEvent) => event.key),
      map(key => key.toUpperCase()),
      filter(key => this.services.characters.includes(key)),
      throttleTime(4000),
    ).subscribe(key => this.handlePreferedCharInput(key))
  }

  onToggleGenerator() {
    this.services.setGeneratorRunning(!this.generator_running$.value)
  }

  handlePreferedCharInput(key) {
    this.prefered_char = key
    this.services.setPreferedChar(this.prefered_char)
  }

  range(max: number) {
    return new Array(max).fill(0).map((x, i) => i)
  }

}