import React, { Component } from 'react';
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles({
    list: {
        width: 150,
    },
    fullList: {
        width: 'auto',
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        float: "left",
        color: 'primary',
    }
});


export default class TemporaryDrawer extends Component {
    constructor() {
        super()

        this.state = {
            left: false,
            deleted: [],
        }

        this.deletedTasks = this.deletedTasks.bind(this)

    }

    deletedTasks = () => {
        axios.get('http://localhost:9000/data/getDeletedData')
            .then(res => {
                this.setState({
                    deleted: res.data
                })
                console.log(res.data);
            })
    }

    toggleDrawer = (anchor, open) => (event) => {
        this.setState({ ...this.state, [anchor]: open });
    };

    list = (anchor) => (
        <div
            onClick={this.toggleDrawer(anchor, false)}
        >
            <List>
                <div className={useStyles.button}>
                    <Button>Done</Button>
                    <Button>Pending</Button>
                    <Button onClick={this.deletedTasks}>Deleted</Button>
                </div>
            </List>
        </div>
    );
    render() {
        return (
            <div>
                <Button onClick={this.toggleDrawer(this.anchor, true)}>Menu</Button>
                <Drawer anchor={'right'} open={this.state[this.anchor]} onClose={this.toggleDrawer(this.anchor, false)}>
                    {this.list(this.anchor)}
                </Drawer>
                {/* <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Deleted at</th>
                            <th scope="col">Todo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deleted.map((deleted) =>
                            <tr>
                                <td>{deleted.id}</td>
                                <td>{deleted.task_added_at.toString().slice(0, 10)}</td>
                                <td>{deleted.task}</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
            </div >
        );
    }
}