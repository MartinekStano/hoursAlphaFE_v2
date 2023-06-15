import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/application/service/auth.service';

@Component({
  selector: 'app-after-verify-email',
  templateUrl: './after-verify-email.component.html',
  styleUrls: ['./after-verify-email.component.scss']
})
export class AfterVerifyEmailComponent {

  code: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.code = String(this.route.snapshot.paramMap.get('code'));

    this.authService.verifyUser(this.code);
    console.log(this.code);
  }
}
