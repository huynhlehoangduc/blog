import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbItem } from '../interfaces/breadcrumb-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbItemsSub$: BehaviorSubject<BreadcrumbItem[]> = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumbItems$ = this.breadcrumbItemsSub$.asObservable();

  constructor() {
  }

  setBreadcrumbItems(breadcrumbItems: BreadcrumbItem[]): void {
    setTimeout(_ => this.breadcrumbItemsSub$.next(breadcrumbItems), 0);
  }
}
