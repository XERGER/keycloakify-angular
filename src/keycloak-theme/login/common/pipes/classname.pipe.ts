import { Pipe, PipeTransform } from '@angular/core';
import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
import * as classData from '../../../assets/theme.properties.json';

@Pipe({
  name: 'kcClass',
  standalone: true,
})
export class KcClassPipe implements PipeTransform {
  private kcClsx?: (...args: any[]) => string;

  constructor() {
    this.loadClasses();
  }

  private loadClasses(): void {
    try {
      const params = {
        doUseDefaultCss: true,
        classes: classData,
      };
      this.kcClsx = getKcClsx(params).kcClsx;
    } catch (error) {
      console.error('Error loading classes for KcClassPipe:', error);
      this.kcClsx = undefined;
    }
  }

  transform(value: any): string {
    if (!this.kcClsx) {
      console.warn('kcClsx is not initialized. Returning empty string.');
      return '';
    }
    return this.kcClsx(value);
  }
}
