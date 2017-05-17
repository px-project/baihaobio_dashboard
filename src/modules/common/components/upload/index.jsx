/**
 * upload component.
 */
import React from 'react';
import { xhttp } from '../../services';
import './style.scss';
import { Upload as AntUpload, Icon, message } from 'antd';

export class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };
    }

    handleChange(info) {
        let { status, response = {} } = info.file, { result } = response, { full, empty } = this.props;
        if (status === 'done') {
            this.props.onChange(full ? result : result.id);

            if (empty) return;
            this.setState({ url: '//www.baihaobio.com' + result.url });
        }
    }

    componentWillMount() {
        let { value } = this.props;
        if (value) {
            this.setState({ url: '//www.baihaobio.com' + value });
        }
    }

    render() {
        const { url } = this.state;
        return (
            <AntUpload className="_upload" name="photo" showUploadList={ false } action="//baihaobio.com/Admin/admin/upload" onChange={ this.handleChange.bind(this) }>
                { url
                    ? <img src={ url } />
                    : <Icon type="plus" className="uploader-trigger" /> }
            </AntUpload>
        );
    }
}