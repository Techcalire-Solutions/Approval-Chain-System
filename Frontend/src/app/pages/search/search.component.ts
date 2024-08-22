import { Component } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FlexLayoutModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
