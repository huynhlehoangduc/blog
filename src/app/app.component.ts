import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet>
    <div class='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'
         *ngIf='loading'>
      <nz-spin
        nzSimple
        class='p-4'
        [nzSize]="'large'"></nz-spin>
    </div></router-outlet>`
})
export class AppComponent  implements OnInit {

  title = 'blog';

  loading: boolean = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(
      (event: RouterEvent): void => {
        if (event instanceof RouteConfigLoadStart) {
          this.loading = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loading = false;
        }
      }
    );
  }

}
