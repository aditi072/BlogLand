import {Pipe, PipeTransform } from '@angular/core';

 @Pipe({
    name: 'htmlToPlaintext'
 })
 export class HtmlToPlaintextPipe implements PipeTransform {
    transform(value: any) {
       return value ? value.replace(/<[^>]+>/g, '') : '';
    }
 }