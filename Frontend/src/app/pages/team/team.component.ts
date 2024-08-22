import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '@services/role.service';
import { TablesService, Element } from '@services/tables.service';
export interface PeriodicElement {
  name: string;
  name1:string
  position: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'TEAM A', name: 'Shibin', name1:'Jithin  ,  Akhil',weight: 1.0079, symbol: 'H'},
  {position: 'TEAM B', name: 'Mahin',name1:'Sulthan , eorge', weight: 4.0026, symbol: 'He'},
  {position: 'TEAM C', name: 'Azar', name1:'Muhaimin , Najeeb',weight: 6.941, symbol: 'Li'},
  {position: 'TEAM D', name: 'Vishnu',name1:'Akash , Bibin', weight: 9.0122, symbol: 'Be'},
 
];
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule    
  ],
  templateUrl: './team.component.html',
  providers: [
    TablesService
  ]
})
export class TeamComponent {
  displayedColumns: string[] = ['position', 'name','name1'];
  dataSource = ELEMENT_DATA;

  // public displayedColumns = ['position', 'name'];
  // public dataSource: any; 
  constructor(private tablesService: TablesService,private roleService:RoleService) { 
    // this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());
  }
  
  ngOnInit(){
    this.roleService.getRole().subscribe((res)=>{
      console.log(res)
  })}


  applyFilter(filterValue: string) { 
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
