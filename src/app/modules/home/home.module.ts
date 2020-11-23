import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {MaterialModule} from '../material/material.module';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserModule} from '@angular/platform-browser';
import {SkeletonLoaderModule} from '../skeleton-loader/skeleton-loader.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserModule,
    SkeletonLoaderModule,
    NgxSkeletonLoaderModule
  ]
})
export class HomeModule { }
