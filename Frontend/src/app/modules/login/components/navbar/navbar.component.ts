import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /*=============== SHOW MENU ===============*/
  showMenu(toggleId: string, navId: string): void {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    toggle?.addEventListener('click', () => {
      // Add show-menu class to nav menu
      nav?.classList.toggle('show-menu');
      // Add show-icon to show and hide menu icon
      toggle.classList.toggle('show-icon');
    });
  }

  ngOnInit(): void {
    this.showMenu('nav-toggle', 'nav-menu');
  }

  logout(){
    
  }
}
