import { Component, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {
  ngOnInit() {
    // Component initialization logic if any
  }

  ngAfterViewInit() {
    this.showMenu('nav-toggle', 'nav-menu');
  }

  showMenu(toggleId: string, navId: string) {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu');

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon');
      });
    }
  }
}
