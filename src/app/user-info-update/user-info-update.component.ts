import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info-update',
  templateUrl: './user-info-update.component.html',
  styleUrls: ['./user-info-update.component.scss']
})
export class UserInfoUpdateComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: ''};

  constructor(
    public fetchApiData: EditUserService,
    public dialogRef: MatDialogRef<UserInfoUpdateComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.fetchApiData.userEditInfo(this.userData).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
