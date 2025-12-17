import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_MATERIAL_IMPORTS } from '../../shared/material/material.imports';
import { UsersPicker } from "../transactions/components/users-picker/users-picker";
import { User } from '../users/models/user.model';
import { Services } from '../users/services/user.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, SHARED_MATERIAL_IMPORTS, UsersPicker],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    users = signal<User[]>([]);

    constructor(private userService: Services) { }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users.set(users);
        });
    }


}
