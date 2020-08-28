import React, { Component } from 'react';
import axios from 'axios'
import '../App.css';
import Swal from 'sweetalert2'
import Navbar from './BodyComponent/Header'



class TodoForm extends Component {
    constructor() {
        super()

        this.state = {
            task: "",
            response: [],
            loading: false,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9000/data/getdata')
            .then(res => {
                this.setState({ response: res.data })
            })
    }

    taskChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    addTask(ev) {
        ev.preventDefault()
        const task = this.state.task

        this.setState({
            loading: true
        })

        const data = {
            task
        }

        axios.post('http://localhost:9000/data', data)
            .then(response => {
                Swal.fire({
                    title: 'Successfully Submitted!',
                    text: 'Do you want to continue?',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                this.setState({
                    response: response.data
                })
                console.log(this.state.response, 1);
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    title: 'Not Submitted!',
                    text: 'Your input should be more than 5 letters.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                })
                this.setState({
                    loading: false
                })
            })


    }
    deleteTodo = (event) => {
        const { name } = event.target;
        axios.delete('http://localhost:9000/data/delete', {
            data: {
                id: parseInt(name)
            }
        }).then(() => {
            const updatedTodo = this.state.response.filter(item => item.id != name)
            this.setState({
                response: updatedTodo
            });
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                
                <div className="container my-5">
                    {/* <Nav /> */}
                    <form onSubmit={this.addTask.bind(this)}>
                        <div className="form-group">
                            <label for="">Todo Task</label>
                            <input type="text" class="form-control mb-4" name="task" value={this.state.task} onChange={this.taskChange.bind(this)} />
                            <button type="submit" class="btn btn-outline-dark">Add</button>
                        </div>
                    </form>
                    <div>
                        <table class="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col">Todo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.response.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.task_added_at.toString().slice(0, 10)}</td>
                                        <td>{item.task}</td>
                                        <a type="button" class="btn text-light" name={item.id} onClick={((e) => {
                                            console.log("Editing")
                                            e.preventDefault();
                                            const task = {
                                                name: this.state.task,
                                                id: item.id
                                            }
                                            axios.put('http://localhost:9000/data/update/', task)
                                                .then(res => this.setState({
                                                    loading: true
                                                }));

                                        })} >Edit</a>
                                        <button
                                            type="submit"
                                            name={item.id}
                                            class="btn text-light"
                                            onClick={this.deleteTodo}>Delete</button>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default TodoForm;