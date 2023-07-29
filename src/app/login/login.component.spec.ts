import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService],
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });
  it('should send login request and navigate to main on success', () => {
    const mockForm = {
      value: {
        email: 'test@example.com',
        password: 'password',
      },
    };
    spyOn(authService, 'login').and.returnValue(of({ token: 'mockToken' }));

    spyOn(component.router, 'navigate');
    component.onSubmit(mockForm);

    expect(authService.login).toHaveBeenCalledWith(
      mockForm.value.email,
      mockForm.value.password
    );

    expect(component.router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should handle login error', () => {
    const mockForm = {
      value: {
        email: 'adminDoesNotExist@admin.com',
        password: 'password!',
      },
    };
    spyOn(authService, 'login').and.returnValue(throwError({ status: 403 }));
    spyOn(component, 'resetAlert');
    component.onSubmit(mockForm);
    expect(authService.login).toHaveBeenCalledWith(
      mockForm.value.email,
      mockForm.value.password
    );
    expect(component.resetAlert).toHaveBeenCalledWith(403);
  });
});
