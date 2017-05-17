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
        this.state = { url: '', changed: false };
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange(info) {
        if (info.file.status === 'done') {
            this.props.onChange(info.file.response.result.id);
            this.getBase64(info.file.originFileObj, url => {
                this.setState({ url, changed: true });
            });
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