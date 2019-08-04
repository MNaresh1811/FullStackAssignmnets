import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Note } from '../note';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {

  private notesUrl: string;
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(public http: HttpClient, private authService: AuthenticationService) {
    this.notesUrl = 'http://localhost:3000/api/v1/notes';
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
   }

   fetchNotesFromServer() {
    return this.http.get<Array<Note>>(this.notesUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    }, (err: any) => {
      this.notesSubject.error(err);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(tap(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }));
  }

}
