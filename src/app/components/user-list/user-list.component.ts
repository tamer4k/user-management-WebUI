import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import * as signalR from '@microsoft/signalr';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { environment } from '../../../environment';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  paginatedUsers: any[] = [];
  private destroy$ = new Subject<void>();
  search$ = new Subject<string>();
  private hubConnection!: signalR.HubConnection;

  // Paginatie variabelen
  currentPage: number = 1;
  pageSize: number = 25;
  totalPages: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    this.startSignalR();


    // 🧠 منطق البحث التفاعلي
this.search$
  .pipe(
    debounceTime(400),                // ننتظر 400ms بعد آخر كتابة
    distinctUntilChanged(),           // نتجاهل إذا الكلمة نفسها
    switchMap(term => this.userService.searchUsers(term)), // نرسل طلب البحث
    takeUntil(this.destroy$)
  )
  .subscribe(users => {
    this.users = users;
    this.currentPage = 1; // Reset naar eerste pagina bij zoeken
    this.updatePagination();
  });
  }

  loadUsers() {
    this.userService.loadUsers();
    this.userService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.users = users;
        this.updatePagination();
      });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  startSignalR() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiBaseUrl}/userHub`)
      .build();

    this.hubConnection.start().then(() => {
      console.log('✅ SignalR connected');
    });

    this.hubConnection.on('UserChanged', () => {
      console.log('🟣 User list changed, reloading...');
      this.loadUsers();
    });
  }

  // 🗑 دالة حذف المستخدم
  deleteUser(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log(`✅ User with ID ${id} deleted`);
          this.loadUsers(); // إعادة تحميل القائمة بعد الحذف
        },
        error: (err) => {
          console.error('❌ فشل حذف المستخدم', err);
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}