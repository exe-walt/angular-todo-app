import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Confirmation } from './confirmation/confirmation';

interface ITodo {
  id: number;
  description: string;
  done: boolean;
}
@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todo-t';
  user: string = 'Paul';
  checked: boolean = false;
  todoList = signal<ITodo[]>([]);
  standalone: boolean = true;

  description = model('');

  readonly dialog = inject(MatDialog);

  selectedIndex: number = -1;

  save(): void {
    const obj: ITodo = {
      description: this.description(),
      done: false,
      id: this.todoList().length + 1,
    };

    // add the new todo to the list
    this.todoList().push(obj);

    // set the input field to empty after saving
    this.description.set('');
  }

  //when checkbox is check, don't show edit and delete buttons
  checkmarkChanged(index: number): void {
    this.todoList()[index].done = !this.todoList()[index].done;
    this.todoList.set(this.todoList());
  }

  deleteConfirmation(index: number): void {
    this.dialog
      .open(Confirmation, {
        width: '250px',
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res === 'YES') {
          this.todoList().splice(index, 1);
        }
      });
  }

  editItem(index: number, item: ITodo): void {
    this.selectedIndex = index;
    this.description.set(item.description);
  }

  updateItem(){
    if (this.selectedIndex >= 0){
      this.todoList()[this.selectedIndex].description = this.description();
      this.description.set('');
      this.selectedIndex = -1;
    }
  }
}
