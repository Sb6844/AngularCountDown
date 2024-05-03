import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CountDownEvents } from '../models/CountDownEvents';

@Injectable({
  providedIn: 'root'
})
export class CountDownService {

  private eventUrl = 'https://localhost:7183/api/CountDownEvents';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public eventsSignal = signal<CountDownEvents[] | null>(null);


  constructor(private http: HttpClient) { }

  getEvents(): Observable<CountDownEvents[]> {
    return this.http.get<CountDownEvents[]>(this.eventUrl);
  }


  // with
  getEventsWithSignals(): void {
    this.http.get<CountDownEvents[]>(this.eventUrl).subscribe({
      next: res => {
        this.eventsSignal.set(res);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  addEvent(event: CountDownEvents): Observable<CountDownEvents> {
    return this.http.post<CountDownEvents>(this.eventUrl, {
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      eventTodos: event.eventTodos
    }, this.httpOptions)
  }

  getEventById(id: number): Observable<CountDownEvents>  {
    return this.http.get<CountDownEvents>(`${this.eventUrl}/${id}`);
  }

  updateEvent(event: CountDownEvents): Observable<any> {
    return this.http.put<any>(`${this.eventUrl}/${event.id}`, {
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      eventTodos: event.eventTodos,
      id: event.id
    }, this.httpOptions)
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.eventUrl}/${id}`);
  }
}
