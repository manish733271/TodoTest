import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos: Todo[];
  
  constructor(private _todoService: TodosService) { 
  }

  ngOnInit() {
    this.todos = [];
    this._todoService.getTodos().subscribe(
      todos => {
        this.todos = todos;
      });
  }

  addTodo(event, todoText){
    var result;
    var newTodo = {
      text: todoText.value,
      isCompleted: false
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {  
      setTimeout(function(){this.todos.push(newTodo)}, 1000);
      location.reload();
      todoText.value = '';
    });
  }

  updateStatus(todo){
    var _todo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    };

    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.isCompleted = !todo.isCompleted;
        // location.reload();
        // console.log(data);
      });
  }

  updateTodoText(event, todo){
    if(event.which === 13){
      todo.text = event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };
      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          // console.log(data);
          this.setEditState(todo, false);
          // location.reload();
         
        });
    }
  }

   setEditState(todo, state){
    if (state){
      todo.isEditMode = state;
    }else{
      delete todo.isEditMode;
    }
  }

  deleteTodo(todo){
    this._todoService.deleteTodo(todo._id)
      .subscribe(data => {
        // console.log(data);
         this.todos = [];
         this._todoService.getTodos().subscribe(
          todos => {
             this.todos = todos;
          });
          // location.reload();
      });
  }

}
