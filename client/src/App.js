import React, { Component } from "react";
import "./App.css";
import TodoForm from './components/todoTaskes'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <TodoForm />
            </div>
        );
    }
}

export default App;



// import React, { Component } from 'react';
// import './App.css';
// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };
//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }
//   callApi = async () => {
//     const response = await fetch('/api/hello');
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
//     return body;
//   };
//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await console.log(response.text());
//     this.setState({ responseToPost: body });
//   };
// render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//             Learn React
//         </header>
//         <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p>
//       </div>
//     );
//   }
// }
// export default App;