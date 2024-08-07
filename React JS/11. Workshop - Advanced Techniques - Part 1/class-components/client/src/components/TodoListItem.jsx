import { Component } from "react";
import { Button, Card, Space } from 'antd';

export default class TodoListItem extends Component {
    componentDidUpdate() {
        console.log(`${this.props.text} - Did update`);
    }

    componentWillUnmount() {
        console.log(`${this.props.text} - Will unmount`);
    }

    render() {
        return (
            <>
                <Space direction="vertical" size={16}>
                    <Card
                        title={this.props.text}
                        style={{
                            width: 300,
                            backgroundColor: this.props.isCompleted ? 'red' : 'green'
                        }}
                    >
                        <p>{this.props.isCompleted ? 'Completed' : 'Pending'}</p>
                        <Button type="primary" onClick={() => this.props.toggleTodo(this.props._id)}>Done</Button>
                        <Button type="primary" danger onClick={() => this.props.deleteTodo(this.props._id)}>Remove</Button>
                    </Card>
                </Space>
            </>
        );
    }
}