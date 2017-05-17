/**
 * demand componet .
 */
import React from 'react';
import { Upload } from '../upload';
import { Icon } from '../icon';

export class Demand extends React.Component {
    constructor(props) {
        super(props);

        this.state = { newData: '' };
    }
    render() {
        let { value, onChange } = this.props;
        console.log(value);
        return (
            <div className="_demand">
                { value.map((item, index) => (
                    <div>
                        <Upload value={ item } key={ index } onChange={ this.edit.bind(this, index) }></Upload>
                        <Icon icon="close"></Icon>
                    </div>
                )) }
                <Upload value={ this.state.newData } onChange={ this.add.bind(this) }></Upload>
            </div>
        );
    }

    add(id) {
        let { value, onChange } = this.props;
        onChange(value.concat(id));
        this.setState({ newData: ' ' });
        this.setState({ newData: '' });
    }

    edit(...args) {
        console.log(args);
    }
}