import { Component, OnInit } from '@angular/core';
import {CoinInterface} from '../../interfaces/coin';
import {CryptoService} from '../../services/crypto.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  coin: CoinInterface;
  postID: string;
  error: string;

  constructor(
    private cryptoService: CryptoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postID = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.retrieveCoin(this.postID);
    }, 1000);
  }

  retrieveCoin(id): void {
    this.cryptoService.getCoin(id).subscribe(
      (response) => {
        this.coin = response.body;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

}
