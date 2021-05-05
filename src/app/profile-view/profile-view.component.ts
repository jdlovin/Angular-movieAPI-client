import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  GetUserService, 
  GetFavMovieService,
  EditUserService,
  GetMoviesService,
  DeleteUserService
} from '../fetch-api-data.service';
import { Router } from '@angular/router'; 
import { UserInfoUpdateComponent } from '../user-info-update/user-info-update.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any= [];
  favorites: any = [];
  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetFavMovieService,
    public fetchApiData3: EditUserService,
    public fetchApiData4: DeleteUserService,
    public fetchApiData5: GetMoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getAUser();
  }

  /**
   * Gets user info
   */
  getAUser(): void {
    this.fetchApiData.userInfo().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * Fetches movies for user favorite movies
   */
  getMovies(): void {
    this.fetchApiData5.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites()
    });
  }

  /**
   * 
   * @returns user favorite movies
   */
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
    this.user.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }

  openUserUpdateDialog(): void {
    this.dialog.open(UserInfoUpdateComponent, {
      width: '280px'
    });
  }

  /**
   * 
   * @param _id 
   */
  removeFavorite(_id: string): void {
this.fetchApiData2.userFavMovie(_id).subscribe(() =>{
  this.snackBar.open(
    `Movie has been removed`, "OK", {
      duration: 2000,
    }
  );
  setTimeout(function() {
    window.location.reload();
  }, 1000);
});
  }

  /**
   * 
   * @param username 
   */
  removeUser(username: string): void {
    this.fetchApiData4.userDelete(username).subscribe(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.snackBar.open(
        "Profile has been deleted", "Ok", {
          duration: 2000,
        }
      );
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    });
    this.router.navigate(['welcome']);
  }

}
