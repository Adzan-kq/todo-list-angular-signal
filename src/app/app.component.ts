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
      type: 'Create',
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
            content: result.content,
          });
        }
      });
    });
  }

  openDialogUpdate(item: TodoList) {
    const dialogConfig = DialogListFormComponentConfig;
    dialogConfig.data = {
      type: 'Update',
      title: 'Task',
      data: item,
    };

    this.dialogRef = this.dialog.open(DialogListFormComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef.componentInstance.saveHandler.unsubscribe();
    });

    this.dialogRef.componentInstance.saveHandler.subscribe((result) => {
      this.listTodo.mutate((todo) => {
        if (result.title) {
          // Temukan indeks item yang sesuai
          const index = todo.findIndex((todoItem) => todoItem.id === item.id);
          if (index !== -1) {
            // Perbarui item dengan data yang baru
            todo[index] = {
              id: item.id,
              title: result.title,
              content: result.content,
            };
          }
        }
      });
    });
  }

  deleteItem(item: TodoList) {
    this.listTodo.mutate((todo) => {
      const index = todo.findIndex((todoItem) => todoItem.id === item.id);
      if (index !== -1) {
        todo.splice(index, 1);
      }
    });
  }
}
