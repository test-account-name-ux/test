<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function index(){
        return Task::all();
    }

    public function store(Request $request){
        return Task::create($request->all());
    }

    public function update(Request $request, $id){
        $tasks = Task::findOrFail($id);
        $tasks->update($request->all()); 
        return $tasks;
    }

    public function delete($id){
        $tasks = Task::findOrFail($id);
        $tasks->delete();
        return 204; 
    }
}
