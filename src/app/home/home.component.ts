import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { HomeComponentComponent } from '../home-component/home-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoggedIn = false;
  constructor(private storageService: StorageService) {
    this.isLoggedIn = storageService.isLoggedIn();
  }



}
