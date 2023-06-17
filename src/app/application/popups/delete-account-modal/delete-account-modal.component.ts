import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})
export class DeleteAccountModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {}

  deleteUser(){
    this.profileService.deleteUser()
      .subscribe(() => 
        this.router.navigateByUrl('/login'),
      );
  }
}
