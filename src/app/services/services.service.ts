import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Matrix, Types, Coords } from '../types';

@Injectable({
  providedIn: 'root'
})

export class Services {

  size = { width: 10, height: 10 };
  interval = 2000;
  characters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("")
  
  running$ = new BehaviorSubject(true);
  generator_timer$ = new BehaviorSubject<number | null>(null)
  current_signature$ = new BehaviorSubject<Types | null>(null)
  
  prefered_char: string = ''

  constructor() {

    this.running$.pipe(
      switchMap(on => on ? interval(20) : NEVER),
      map(i => i * 20),
      map(t => t % this.interval),
      map(c => this.interval - c)
    ).subscribe(tl => {
      this.generator_timer$.next(tl)
      if (tl <= 20) {
        const next_signature = this.makeSignature(10, 10, this.prefered_char)
        this.current_signature$.next(next_signature)
      }
    })

  }

  setPreferedChar(char: string) {
    this.prefered_char = char
  }

  setGeneratorRunning(live: boolean){
    this.running$.next(live)
  }

  makeSignature(width: number, height: number, prefered_char?: string): Types {

    const getCodeFromMatrix = (matrix: Matrix): string => {

      const countOccurrencesInArray = (array: Array<any>, x: any): number => {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
          if (array[i] === x) count++
        }
        return count
      }

      let seconds:string[] = new Date().getSeconds().toString().split('')
      if (seconds.length === 1) seconds.unshift('0')

      const coords_a: Coords = { x: parseInt(seconds[0]), y: parseInt(seconds[1]) }
      const coords_b: Coords = { x: parseInt(seconds[1]), y: parseInt(seconds[0]) }

      const char_a = matrix.getChar(coords_a) 
      const char_b = matrix.getChar(coords_b)

      const n_occurrences_a = countOccurrencesInArray(matrix.data, char_a)
      const n_occurrences_b = countOccurrencesInArray(matrix.data, char_b)

      const code_a = n_occurrences_a % 10
      const code_b = n_occurrences_b % 10

      const code = code_a.toString() + code_b.toString()

      return code
    }

    const matrix: Matrix = this.makeMatrix(width, height, prefered_char)
    const signature: Types = {
      matrix,
      code: getCodeFromMatrix(matrix)
    }
    return signature
  }

  makeMatrix(width: number, height: number, prefered_char?: string): Matrix {
    
    const makeListOfRandomCharsExcludingChar = (length, char_to_exclude?) => {
      const list = []
      for (let i = 0; i < length; i++) {
        let entry = this.randomAlphaChar(char_to_exclude)
        list.push(entry)
      }
      return list
    }

    const makeListOf20DifferentRandomInts = (min = 0, max: number) => {
      const list = []
      while (list.length < 20) {
        const random_int = this.randomInt(min, max)
        if (!list.includes(random_int)) list.push(random_int)
      }
      return list
    }

    const putCharInArrayAtIndexes = (array: Array<string>, indexes: Array<number>, char_to_put: string) => {
      const array_with_char_at_indexes = [...array]
      for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i]
        array_with_char_at_indexes[index] = char_to_put
      }
      return array_with_char_at_indexes
    }

    const matrix = new Matrix()
    matrix.width = width; matrix.height = height;
    matrix.data = makeListOfRandomCharsExcludingChar(width * height, prefered_char)

    if (prefered_char) {
      const indices_to_put_prefered_char = makeListOf20DifferentRandomInts(0, matrix.data.length)
      matrix.data = putCharInArrayAtIndexes(matrix.data, indices_to_put_prefered_char, prefered_char)
    }

    return matrix
  }

  randomAlphaChar(char_to_exclude?: string) {
    const valid_chars = this.characters.filter(char => char != char_to_exclude)
    return valid_chars[this.randomInt(0, valid_chars.length)]
  }

  randomFloat01() {
    return Math.random()
  }

  randomInt(min: number, max: number) {
    const range = max - min
    return Math.floor(this.randomFloat01() * range + min)
  }

}
