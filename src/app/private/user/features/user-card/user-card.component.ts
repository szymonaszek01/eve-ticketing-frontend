import { Component } from '@angular/core';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { User } from '../../../../shared/shared/models/user';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';
import { MatIcon } from '@angular/material/icon';
import { ImageUploaderComponent } from '../../../../shared/firebase/features/image-uploader/image-uploader.component';
import { authActions } from '../../../../public/auth/data-access/auth-actions';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CustomTabComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatChip,
    NgIf,
    NgOptimizedImage,
    MatIcon,
    ImageUploaderComponent
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  protected user: User;

  constructor(protected store: Store<{ auth: AuthState }>) {
    this.user = {
      id: 0,
      email: '',
      createdAt: new Date(),
      firstname: '',
      lastname: '',
      phoneNumber: '',
      role: '',
      image: ''
    };
  }

  ngOnInit(): void {
    this.store.select(selectAuth).subscribe(auth => this.user = auth ? {...auth} : this.user);
  }

  protected onImageUploadClick(file: File): void {
    this.store.dispatch(authActions.uploadAuthImage({file, entity: 'auth-user', field: 'image'}));
  }
}
