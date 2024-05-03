import { Component } from '@angular/core';
import { CountDownEvents } from '../../models/CountDownEvents';
import { CountDownService } from '../count-down.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CountDownComponent } from '../count-down/count-down.component';
import { NgFor, NgIf } from '@angular/common';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterOutlet, CountDownComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  title = 'angular-count-down-v2';

  events: CountDownEvents[] = [];
  eventsSignal = this.service.eventsSignal;

  constructor(private service: CountDownService)
  {
    this.getEvents();
  }

  getEvents()
  {
    this.service.getEvents().subscribe({
      next: data => {
        this.events = data;
        console.log(this.events);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteEvent(id: number | undefined) {
    if(id)
    {
      this.events = this.events.filter(x => x.id !== id);
      this.service.deleteEvent(id).subscribe(event => console.log('deleted'));
    }
  }
}
