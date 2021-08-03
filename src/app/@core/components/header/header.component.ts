import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('Header Init');
  }

  ngOnDestroy() {
    console.log('Header Destroy');
  }

}
