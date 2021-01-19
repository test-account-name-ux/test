import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Alert} from 'reactstrap';
import axios from 'axios';

export default class Example extends Component {

    constructor() {
        super()
        this.state = {
            tasks: [],
            newTaskModal:false,
            newTaskData: {
                name: "",
                description: ""
            },
            editTaskModal:false,
            editTaskData: {
                name: "",
                description: ""
            }
        }
    }

    loadTask(){
        axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
            this.setState({
                tasks:response.data
            })
        })
    }

    addTask(){
        axios.post('http://127.0.0.1:8000/api/task', this.state.newTaskData).then((response) => {
            let { tasks } = this.state
            this.loadTask()

            this.setState({
                tasks,
                newTaskModal: false,
                newTaskData: {
                    name: "",
                    description: ""
                },
                editTaskModal: false,
                editTaskData: {
                    name: "",
                    description: ""
                }
            })
            
        })
    }

    editTask(id, name, description){
        console.log(id)
        this.setState({
            editTaskData:{
                id,
                name,
                description
            },
            editTaskModal: !this.state.editTaskModal
        })
    }

    updateTask(){
        let { name, description} = this.state.editTaskData

        axios.put('http://127.0.0.1:8000/api/task/'+this.state.editTaskData.id, {
            name,
            description
        }).then((response) => {
            this.loadTask()

            this.setState({
                editTaskModal:false,
                editTaskData:{
                    id: "",
                    name: "",
                    description: ""
                }
            })
        })
    }

    deleteTask(id){
        axios.delete('http://127.0.0.1:8000/api/task/'+id).then((response)=>{
            this.loadTask()
        })
    }

    componentWillMount(){
        this.loadTask();
    }

    toggleNewTaskModal(){
        this.setState({
            newTaskModal: !this.state.newTaskModal
        })
    }

    toggleEditTaskModal(){
        this.setState({
            editTaskModal: !this.state.editTaskModal
        })
    }


    render() {
        let tasks = this.state.tasks.map((task) => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button 
                            color="success" 
                            size="sm" 
                            className="mr-2" 
                            onClick={this.editTask.bind(this, task.id, task.name, task.description)}>Edit</Button>
                        <Button 
                            color="danger" 
                            size="sm" 
                            onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <h1>
                    TodoList
                </h1>
                <Button color="primary" onClick={this.toggleNewTaskModal.bind(this)} className="my-3">Add Task</Button>
                <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                id="name"
                                value={this.state.newTaskData.name}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.name = e.target.value
                                    this.setState({newTaskData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                id="description"
                                value={this.state.newTaskData.description}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.description = e.target.value
                                    this.setState({newTaskData})
                                }}
                                ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                
                <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                id="name"
                                value={this.state.editTaskData.name}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.name = e.target.value
                                    this.setState({editTaskData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                id="description"
                                value={this.state.editTaskData.description}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.description = e.target.value
                                    this.setState({editTaskData})
                                }}
                                ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

               <Table>
                   <thead>
                       <tr>
                           <th>#</th>
                           <th>Name</th>
                           <th>Description</th>
                           <th>Action</th>
                       </tr>
                    </thead>   
                    <tbody>
                        {tasks}
                    </tbody>
               </Table>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
