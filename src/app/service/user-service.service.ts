import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }

addUser(user: User) {
  let users = [];
  const usersData = localStorage.getItem('Users');
  if (usersData) {
    users = JSON.parse(usersData);
    users = [user, ...users];
  } else {
    users = [user];
  }
  localStorage.setItem('Users', JSON.stringify(users));
}
}
