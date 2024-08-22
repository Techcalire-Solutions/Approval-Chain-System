import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TablesService, Element } from '@services/tables.service';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule    
  ],
  templateUrl: './filtering.component.html',
  providers: [
    TablesService
  ]
})
export class FilteringComponent {
  public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  public dataSource: any; 
  constructor(private tablesService: TablesService) { 
    this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());
  }

  applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
