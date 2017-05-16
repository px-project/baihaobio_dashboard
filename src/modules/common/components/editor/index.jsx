/**
 * editor component.
 */
import React from 'react';
import './style.scss';
const ReactQuill = require('react-quill');
import { xhttp } from '../../services';

export class Editor extends React.Component {

    modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                'image': this.imageHandler.bind(this)
            }
        }
    }

    _editorRef = null;

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    render() {
        let { value, height = 300 } = this.props;
        return (
            <div className="_editor" style={ { height } }>
                <ReactQuill
                    value={ value }
                    onChange={ this.handleChange.bind(this) }
                    modules={ this.modules }
                    formats={ this.formats }
                    ref={ el => this._editorRef = el }
                ></ReactQuill>
            </div>
        )
    }
    imageHandler(...args) {
        var fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');

        let ele = document.createElement('input');
        ele.setAttribute('type', 'file');
        ele.click();

        ele.addEventListener('change', e => {
            let file = e.path[0].files[0];
            let newData = new FormData();
            newData.append('photo', file);
            xhttp.post('/admin/upload', newData).then(({ url }) => {
                this._editorRef.getEditor().insertEmbed(10, 'image', `//www.baihaobio.com${url}`);
            });
        });
    }

    handleChange(data) {
        this.props.onChange(data);
    }
}