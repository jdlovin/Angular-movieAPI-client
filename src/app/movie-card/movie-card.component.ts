import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetMoviesService, AddMovieService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favorites: any = [];
  constructor(
    public fetchApiData: GetMoviesService,
    public fetchApiData2: AddMovieService,
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

  /**
   * 
   * @param name 
   * @param description 
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: "350px",
    });
  }

  /**
   * 
   * @param name 
   * @param bio 
   * @param birth 
   */
  showDirectorDialog(name: string, bio: string, birth: string ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth },
      width: "350px",
    });
  }

  /**
   * 
   * @param title 
   * @param description 
   */
  showSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: "350px",
    });
  }

  /**
   * 
   * @param _id 
   */
  addFavoriteMovie(_id: string): void {
    this.fetchApiData2.addFavMovie(_id).subscribe(() => {
      this.snackBar.open(
        'Movie has been added', "OK", {
          duration: 2000,
        }
      );
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    });
  }
}
