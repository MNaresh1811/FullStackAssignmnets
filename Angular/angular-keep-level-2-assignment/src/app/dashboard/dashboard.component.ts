import { Component, OnInit } from '@angular/core';
import {Note} from '../note';
import { NotesService } from '../services/notes.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  note: Note = new Note(); // creating instance of Note
  notes: Array<Note> = []; // creating an array of Note instances
  errMessage: string;

  constructor(private notesService: NotesService) {
    this.notesService.fetchNotesFromServer();
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      res => this.notes = res,
      err => {
        this.errMessage = err.message;
      }
    );
  }
  takeNotes() {
    if (this.note.title !== '' && this.note.text !== '') {
      this.notesService.addNote(this.note).subscribe(
        data => {},
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    }else {
      this.errMessage = 'Title and Text both are required fields';
    }

  }
}
