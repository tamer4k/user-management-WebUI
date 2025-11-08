import { Component, signal } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './components/add-user/add-user.component'; // ✅ أضف هذا السطر

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent, HttpClientModule, AddUserComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App {
  protected readonly title = signal('user-management-WebUI');
}