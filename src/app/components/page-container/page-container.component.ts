import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css'],
})
export class PageContainerComponent implements OnInit {
  @Input() pageWidth: string = null;

  constructor() {}

  ngOnInit(): void {}
  getPageWidth() {
    return this.pageWidth ? 'width:' + this.pageWidth : 'width:80%';
  }
}
