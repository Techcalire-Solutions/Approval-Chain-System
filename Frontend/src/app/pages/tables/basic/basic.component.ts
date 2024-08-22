import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { TablesService, Element } from '@services/tables.service';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './basic.component.html',
  providers: [
    TablesService
  ]
})
export class BasicComponent {
  public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  public dataSource: any; 
  constructor(private tablesService: TablesService) { 
    this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());
  }
}
