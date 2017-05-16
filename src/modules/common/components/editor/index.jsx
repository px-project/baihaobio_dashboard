/**
 * editor component.
 */
import React from 'react';
import './style.scss';
const ReactQuill = require('react-quill');

export class Editor extends React.Component {


    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    _editorRef = null;

    //   ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    //   ['blockquote', 'code-block'],                    // blocks
    //   [{ 'header': 1 }, { 'header': 2 }],              // custom button values
    //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    //   [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    //   [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    //   [{ 'direction': 'rtl' }],                        // text direction
    //   [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    //   [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
    //   [{ 'font': [] }],                                // font family
    //   [{ 'align': [] }],                               // text align
    //   ['clean'],                                       // remove formatting

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
                    onChangeSelection={ this.focus.bind(this) }
                    modules={ this.modules }
                    formats={ this.formats }
                    ref={ el => this._editorRef = el }
                ></ReactQuill>
            </div>
        )
    }

    handleChange(data) {
        this.props.onChange(data);
    }

    focus(...args) {
        console.log(args);
    }

}