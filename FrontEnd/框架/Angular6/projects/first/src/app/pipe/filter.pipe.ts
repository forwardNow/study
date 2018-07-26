import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return list;
    }
    return list.filter(item => {
      const fieldValue = item[filterField];
      return fieldValue.indexOf(keyword) >= 0;
    });
  }

}
