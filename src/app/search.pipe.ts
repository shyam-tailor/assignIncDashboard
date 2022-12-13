import { visitValue } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';
import { json } from 'd3';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): unknown {
    args = args.toLowerCase();
    return value.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
