import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isHomePage: boolean = false;
  darkMode$: Observable<boolean>;

  constructor(private router: Router, private darkModeService: DarkModeService,private authService: AuthService) {
    this.darkMode$ = this.darkModeService.darkMode$;

    this.authService.user.subscribe((data) => {
      this.user = data;
    });
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }
  ngOnInit() {
      this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home';
    });
  }
  model = inject(NgbModal);
  user: any;

  onNavigate(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  Login() {
    let modalRef = this.model.open(LoginComponent);
  }
}
