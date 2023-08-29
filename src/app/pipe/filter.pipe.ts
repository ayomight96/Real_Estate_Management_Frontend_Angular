import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterName: string, propertyName: string): any[] {
    const resultArray = [];
    if (value.length === 0 || filterName === '' || propertyName === '') {
      return value;
    }
    for (const item of value) {
      if (item[propertyName] === filterName) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
