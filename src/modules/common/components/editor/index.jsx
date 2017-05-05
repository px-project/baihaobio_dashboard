/**
 * editor component.
 */
import React from 'react';
import './style.scss';

export class Editor extends React.Component {
    componentDidMount() {
        let { id, height = 200, disabled = false, value, onChange } = this.props;

        var editor = UM.getEditor(id, {
            //工具栏
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'simpleupload',
                'horizontal', 'date', 'time',
            ]],
            lang: "zh-cn",
            //字体
            'fontfamily': [
                { label: '', name: 'songti', val: '宋体,SimSun' },
                { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' },
                { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' },
                { label: '', name: 'heiti', val: '黑体, SimHei' },
                { label: '', name: 'lishu', val: '隶书, SimLi' },
                { label: '', name: 'andaleMono', val: 'andale mono' },
                { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' },
                { label: '', name: 'arialBlack', val: 'arial black,avant garde' },
                { label: '', name: 'comicSansMs', val: 'comic sans ms' },
                { label: '', name: 'impact', val: 'impact,chicago' },
                { label: '', name: 'timesNewRoman', val: 'times new roman' }
            ],
            //字号
            'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
            enableAutoSave: false,
            autoHeightEnabled: false,
            initialFrameHeight: height,
            initialFrameWidth: '100%',
            readonly: disabled
        });

        editor.ready((ueditor) => {
            let _value = value || '';
            editor.setContent(_value);

            editor.addListener('afterSelectionChange', () => {
                onChange(editor.getContent());
            });
        });

    }

    render() {
        let { onChange } = this.props;
        return (
            <script id={ this.props.id } name="content" type="text/plain"></script>
        );
    }

    componentWillUnmount() {
        UM.getEditor(this.props.id).destroy();
        var dom = document.getElementById(this.props.id);
        if (dom) dom.parentNode.removeChild(dom);
    }

}