import { Component, computed, inject, model, signal } from '@angular/core';
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
import {MatTabsModule} from '@angular/material/tabs';


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
    MatTabsModule
  ], 
  templateUrl: './app.html', 
  styleUrl: './app.css', 
})
export class App {
  protected title = 'todo-t'; 
  user: string = 'Paul'; 

  todoList = signal<ITodo[]>([]);
  standalone: boolean = true;

  filters = ['All', 'Active', 'Completed'];
  currentIndex = signal<number>(0); // Index of the currently selected 
  

  filteredList = computed<ITodo[]>(() => {
    const filter = this.filters[this.currentIndex()];
    const list = this.todoList();
    if (filter === 'All') {
      return list;
    } else if (filter === 'Active') {
      return list.filter(todo => !todo.done);
    } else if (filter === 'Completed') {
      return list.filter(todo => todo.done);
    } else {
      return [];
    }

  }); 
  
  // Model for the input description field
  description = model('');

  // Inject the Material Dialog service
  readonly dialog = inject(MatDialog);

  selectedIndex: number = -1; // Index of the todo being edited

  // Add a new todo item to the list
  save(): void {
    const obj: ITodo = {
      description: this.description(), 
      done: false,
      id: this.todoList().length + 1, 
    };

    // Add the new task to the list
    this.todoList().push(obj);
    

    this.description.set('');
  }

  // When checked, edit and delete buttons are hidden in the UI
  checkmarkChanged(index: number): void {
    this.todoList()[index].done = !this.todoList()[index].done;
    this.todoList.set(this.todoList());
  }

  //confirmation dialog before deleting a todo item
  deleteConfirmation(index: number): void {
    this.dialog
      .open(Confirmation, {
        width: '250px',
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res === 'YES') {
          this.todoList().splice(index, 1); // Remove the item if confirmed
        }
      });
  }

  
  editItem(index: number, item: ITodo): void {
    this.selectedIndex = index; 
    this.description.set(item.description); // Set the input to the item's description
  }

  // Update the edited todo item with the new description
  updateItem() {
    if (this.selectedIndex >= 0) {
      this.todoList()[this.selectedIndex].description = this.description();
      this.description.set('');
      this.selectedIndex = -1; 
    }
  }

  //create a method to search through the todo list



  //delete all items in the todo list
  clearAll():void {
    this.todoList.set([]);
  }

}
