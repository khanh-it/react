import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import * as redux from 'redux';
//import { Provider, connect } from 'react-redux';

// Comp: AddTodo
class AddTodo extends PureComponent {
    constructor(props) {
        super(props);
        this.onAddTodo = this.onAddTodo.bind(this);
    }

    onAddTodo(e) {
        e.preventDefault();
        //console.log(this.eleText);
        let data = {
            'text': this.eleText.value.trim()
        };
        if (data.text) {
            this.props.onAddTodo(data);
        }
    }

    render() {
        let comp = <form onSubmit={e => this.onAddTodo(e)}>
            <input 
                className="form-control input-sm"
                ref={ele => this.eleText = ele}
            />
        </form>;
        return comp;
    }
}
//AddTodo = connect()(AddTodo);
// #end

// Todo Item
class TodoItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props;
        let text = !item.done ? item.text : <i style={{textDecoration: 'line-through'}}>{item.text}</i>;
        let comp = <li onClick={item.onClick}>{text}</li>;
        return comp;
    }
}
// #end

// Comp: ListTodo
class ListTodo extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let comp = <div>
            <h2>Todo List:</h2>
            <ul>{this.props.todos.map((item, index) => {
                return <TodoItem key={index} onClick={e => this.props.onToggleTodo(index)} {...item} />
            })}</ul>
        </div>;
        return comp;
    }
}
// #end

// Comp: View mode link
function VModeLink(props) {
    let text = (props.vmode === props.value)
        ? <i>{props.name}</i>
        : <a href="#" onClick={e => { e.preventDefault(); props.onClick(props.value); }}>{props.name}</a>
    ;
    return <span> {text} </span>;
}

// #end

// Comp: Footer
class Footer extends PureComponent {

    static get VMODE_SHOW_ALL() {
        return 'SHOW_ALL';
    }

    static get VMODE_SHOW_COMPLETED() {
        return 'SHOW_COMPLETED'
    }

    static get VMODE_SHOW_ACTIVE() {
        return 'SHOW_ACTIVE';
    }

    static returnViewModes() {
        return [
            {'name': 'All', 'value': Footer.VMODE_SHOW_ALL},
            {'name': 'Show Completed', 'value': Footer.VMODE_SHOW_COMPLETED},
            {'name': 'Show Active', 'value': Footer.VMODE_SHOW_ACTIVE},
        ];
    }

    constructor(props) {
        super(props);
    }

    render() {
        let vmodes = Footer.returnViewModes();
        let comp = <div className="clearfix">
            Toggle view modes: {vmodes.map(item => {
                return <VModeLink key={item.value} vmode={this.props.vmode} onClick={this.props.onSetViewMode} {...item} />;
            })}.
        </div>;
        return comp;
    }
}
// #end

// Comp: TotoApp
class TodoApp extends PureComponent {

    constructor(props) {
        super(props);
        //
        let store = props.store;
        // +++ Set initial state
        this.state = store.getState();

        //
        this.addTodo        = this.addTodo.bind(this);
        this.setViewMode = this.setViewMode.bind(this);
        this.onToggleTodo   = this.onToggleTodo.bind(this);
    }

    addTodo(todo) {
        let actions = {
            'type': 'ADD_TODO',
            'text': todo.text,
            'done': false
        }; // console.log('actions: ', actions);
        this.props.store.dispatch(actions);
        this.setState(this.props.store.getState());
    }

    onToggleTodo(index) {
        let actions = {
            'type': 'TOGGLE_TODO',
            'index': index
        }; // console.log('actions: ', actions);
        this.props.store.dispatch(actions);
        this.setState(this.props.store.getState());
    }

    setViewMode(vmode) {
        let actions = {
            'type': 'SET_VIEW_MODE',
            'vmode': vmode
        }; // console.log('actions: ', actions);
        this.props.store.dispatch(actions);
        this.setState(this.props.store.getState());
    }

    render() {
        let vmode = this.state.vmode;
        let todos = this.state.todos.filter((todo, index) => {
            if (Footer.VMODE_SHOW_COMPLETED == vmode) {
                return todo.done;
            }
            if (Footer.VMODE_SHOW_ACTIVE == vmode) {
                return !todo.done;
            }
            return true;
        });

        let comp = <div>
            <AddTodo onAddTodo={this.addTodo} />
            <ListTodo todos={todos} onToggleTodo={this.onToggleTodo} />
            <Footer onSetViewMode={this.setViewMode} vmode={vmode} />
        </div>;
        return comp;
    }
}

// #end

//
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            return state.concat([{
                text: action.text,
                done: action.done
            }]);
        } break;
        case 'TOGGLE_TODO': {
            return state.map((todo, index) => {
                if (index === action.index && undefined != action.index) {
                    return Object.assign({}, todo, {
                        done: !todo.done
                    });
                }
                return todo;
            });
        } break;
    
        default:
            return state;
            break;
    }
    return state;
};
const vmode = (state = Footer.VMODE_SHOW_ALL, action) => {
    switch (action.type) {
        case 'SET_VIEW_MODE':
            return action.vmode
        default:
            return state
    }
    return state;
};
const todoApp = redux.combineReducers({
    todos, vmode
});
let store = redux.createStore(todoApp);
//console.log('todoApp: ', todoApp);
// #end

//
ReactDOM.render(
    //<Provider store={store}>
        <TodoApp store={store} />
    //</Provider>
    , document.getElementById('root')
);