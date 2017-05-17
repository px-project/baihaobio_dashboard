/**
 * demand componet .
 */
import React from 'react';
import { Upload } from '../upload';
import { Icon } from '../icon';
import './style.scss';

export class Demand extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newData: '' };
    }

    render() {
        let { value, onChange } = this.props;
        return (
            <div className="_demand">
                { value.map((item, index) => (
                    <div key={ index } className="item">
                        <Upload full={ true } value={ item } onChange={ this.edit.bind(this, index) }></Upload>
                        <Icon icon="close" onClick={ this.delete.bind(this, index) }></Icon>
                    </div>
                )) }
                <Upload full={ true } empty={ true } onChange={ this.add.bind(this) }></Upload>
            </div>
        );
    }

    add(result) {
        let { value, onChange } = this.props;
        onChange(value.concat([result.url]));
    }

    edit(index, result) {
        let { value, onChange } = this.props;
        value[index] = result.url;
        onChange(value);
    }

    delete(index) {
        let { value, onChange } = this.props;
        onChange(value.filter((item, i) => i !== index));
    }
}