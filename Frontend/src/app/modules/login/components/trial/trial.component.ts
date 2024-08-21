import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
  { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
  { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];


@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.scss']
})
export class TrialComponent {

  private listTitles!: any[];
    location: any;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button: any;

    constructor( private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter((listTitle: any) => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
    getTitle(){
      // var titlee = this.location.prepareExternalUrl(this.location.path());
      // if(titlee.charAt(0) === '#'){
      //     titlee = titlee.slice( 1 );
      // }
      // for(var item = 0; item < this.listTitles.length; item++){
      //     if(this.listTitles[item].path === titlee){
      //         return this.listTitles[item].title;
      //     }
      // }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          // const html = document.getElementsByTagName('html')[0];
          // const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          // if (window.innerWidth < 991) {
          //   setTimeout(function(){
          //     mainPanel.style.position = '';
          //   }, 500);
          // }
          // this.toggleButton.classList.remove('toggled');
          // this.sidebarVisible = false;
          // html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

}
