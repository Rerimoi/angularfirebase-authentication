import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from "../../shared/services/user.service";
import { User, Roles } from "../../shared/models/user";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users: User[];

  constructor(
    public authService: AuthService,
    public router: Router,
    private userService: UserService,
    // public ngZone: NgZone
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(users => {
      console.log(users);      
      this.users = users;
      
    })
  }

}
