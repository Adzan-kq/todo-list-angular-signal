import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  DialogListFormComponent,
  DialogListFormComponentConfig,
} from './components/dialog-list-form/dialog-list-form.component';

import { v4 as uuid } from 'uuid';

interface TodoList {
  id: string;
  title: string;
  subTitle?: string;
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';

  listTodo = signal<TodoList[]>([
    {
      id: uuid(),
      title: 'Rutinitas Work Out',
      content: 'semangat tiap hari',
    },
  ]);

  dialogRef!: MatDialogRef<DialogListFormComponent>;

  constructor(public dialog: MatDialog) {}

  openDialogCreate() {
    const dialogConfig = DialogListFormComponentConfig;
    dialogConfig.data = {
      type: 'create',
      title: 'List Activity',
    };

    this.dialogRef = this.dialog.open(DialogListFormComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef.componentInstance.saveHandler.unsubscribe();
    });

    this.dialogRef.componentInstance.saveHandler.subscribe((result) => {
      this.listTodo.mutate((todo) => {
        if (result.title) {
          todo.push({
            id: uuid(),
            title: result.title,
            content: '',
          });
        }
      });
    });
  }
}
