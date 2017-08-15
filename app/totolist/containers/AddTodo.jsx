import { PureComponent } from 'react';

class AddTodo extends PureComponent {
    constructor(props) {
        super(props);
        this.onAddTodo = this.onAddTodo.bind(this);
    }

    onAddTodo(e) {
        e.preventDefault();
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