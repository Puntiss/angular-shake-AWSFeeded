import { AfterViewInit, inject } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTabsComponent } from 'mdb-angular-ui-kit/tabs';

@Component({
  selector: 'app-manage-session',
  templateUrl: './manage-session.component.html',
  styleUrls: ['./manage-session.component.css'],
})
export class ManageSessionComponent implements AfterViewInit {
  @ViewChild('tabs') tabs: MdbTabsComponent;
  constructor(private activeRoute: ActivatedRoute) {}
  //switch between login o signup
  ngAfterViewInit() {
    let activeTab: number = 0;
    if (this.activeRoute.snapshot.url[0].path === 'signup') activeTab = 1;

    setTimeout(() => {
      this.tabs.setActiveTab(activeTab);
    }, 0);
  }
}
