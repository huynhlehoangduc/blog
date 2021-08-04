import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../@core/services/breadcrumb.service';
import { BreadcrumbItem } from '../@core/interfaces/breadcrumb-item';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  breadcrumbItems$ = this.breadcrumbService.breadcrumbItems$;

  url$: Observable<string> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((navigationEnd: NavigationEnd) => navigationEnd.url)
  );

  constructor(private readonly breadcrumbService: BreadcrumbService,
              public readonly router: Router) { }

  ngOnInit(): void {
  }

  trackByItems(index: number, item: BreadcrumbItem) {
    return item.title;
  }

}
