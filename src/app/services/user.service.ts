import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environment';
// تعريف شكل المستخدم (البيانات القادمة من الـ API)
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // optioneel, gebruiken we niet bij weergave
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/api/Users`;// رابط API تبعك

  // BehaviorSubject لحفظ قائمة المستخدمين
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** 🔹 جلب كل المستخدمين من الـ API */
  loadUsers() {
    this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('❌ خطأ أثناء جلب المستخدمين:', error);
          return throwError(() => error);
        })
      )
      .subscribe(users => this.usersSubject.next(users));
  }

  searchUsers(term: string) {
  if (!term.trim()) {
    // إذا البحث فاضي رجع الكل
    return this.http.get<User[]>(`${environment.apiBaseUrl}/api/Users`);
  }
  return this.http.get<User[]>(`${environment.apiBaseUrl}/api/Users?search=${encodeURIComponent(term)}`);
}

  /** 🔹 إضافة مستخدم جديد */
  addUser(newUser: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser)
      .pipe(
        tap(user => {
          const current = this.usersSubject.value;
          this.usersSubject.next([...current, user]);
        })
      );
  }

  /** 🔹 تحديث مستخدم */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user)
      .pipe(
        tap(updatedUser => {
          const current = this.usersSubject.value.map(u =>
            u.id === updatedUser.id ? updatedUser : u
          );
          this.usersSubject.next(current);
        })
      );
  }

  /** 🔹 حذف مستخدم */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const current = this.usersSubject.value.filter(u => u.id !== id);
          this.usersSubject.next(current);
        })
      );
  }
}