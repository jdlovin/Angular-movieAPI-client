import { Component, OnInit } from '@angular/core';
import { GetUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any[] = [];
  constructor(public fetchApiData: GetUserService) { }

  ngOnInit(): void {
    this.getAUser();
  }

  getAUser(): void {
    this.fetchApiData.userInfo().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }
}
