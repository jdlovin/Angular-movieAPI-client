import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetMoviesService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import {DirectorViewComponent} from '../director-view/director-view.component';
import {SynopsisViewComponent} from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetMoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getAllMovies();  
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: "350px",
    });
  }

  showDirectorDialog(name: string, bio: string, birth: string ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth },
      width: "350px",
    });
  }

  showSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: "350px",
    });
  }
}
