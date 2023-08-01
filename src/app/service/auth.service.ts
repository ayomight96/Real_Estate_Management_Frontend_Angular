import { Injectable } from '@angular/core';
export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  authUser(user: User) {
    let userArray = [];
    const usersData = localStorage.getItem('Users');
    if (usersData) {
      userArray = JSON.parse(usersData);
    }
    return userArray.find(
      (p: User) => p.email === user.email && p.password === user.password
    );
  }
}
