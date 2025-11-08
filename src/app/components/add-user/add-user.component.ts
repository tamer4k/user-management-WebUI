import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private userService: UserService) {}

  addUser() {
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      this.message = '❗ Vul alle velden in: naam, email en wachtwoord.';
      return;
    }

    if (this.password.length < 6) {
      this.message = '❗ Wachtwoord moet minimaal 6 karakters zijn.';
      return;
    }

    const newUser = { name: this.name, email: this.email, password: this.password };

    this.userService.addUser(newUser).subscribe({
      next: () => {
        this.message = '✅ Gebruiker succesvol toegevoegd!';
        this.name = '';
        this.email = '';
        this.password = '';
      },
      error: (error) => {
        console.error('Error:', error);
        
        // Check of het een duplicate email error is
        if (error.status === 500 && error.error?.includes('duplicate key')) {
          this.message = `❌ Email adres "${this.email}" bestaat al. Gebruik een ander email adres.`;
        } else if (error.status === 400) {
          // Validatie fouten van de API
          this.message = '❌ Validatiefout: controleer of alle velden correct zijn ingevuld.';
        } else {
          this.message = '❌ Fout bij toevoegen gebruiker. Probeer het opnieuw.';
        }
      }
    });
  }
}