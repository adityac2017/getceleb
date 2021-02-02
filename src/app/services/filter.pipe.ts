import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) return [];
    if (!value) return  items;
    if (value == '' || value == null) return [];
    return items.filter(e => e.clientName.toLowerCase().indexOf(value.toLowerCase()) > -1 || e.instagramId.toLowerCase().indexOf(value.toLowerCase()) > -1 ||  e.tags.toLowerCase().includes(value.toLowerCase()));
    
  }

}
