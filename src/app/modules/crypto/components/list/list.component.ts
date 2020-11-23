import {Component, OnInit, ViewChild} from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CoinsInterface } from '../../interfaces/coins';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  coins: CoinsInterface[];
  displayedColumns: string[] = ['ID', 'symbol', 'name'];
  dataSource;
  length: 10;
  pageSize = 10;

  // Pagination
  tableSizes = [20, 50, 100];

  constructor(
    // Instance du service "CryptoService"
    private cryptoService: CryptoService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.retrieveCoins();
  }

  retrieveCoins(): void {
   this.cryptoService.getCoins().subscribe((
       response) => {
         this.coins = response.body;
         this.dataSource = new MatTableDataSource(this.coins);
         this.dataSource.paginator = this.paginator;
     },
       error => {
       console.log(error);
     });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
