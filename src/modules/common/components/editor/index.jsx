/**
 * editor component.
 */
import React from 'react';
import './style.scss';

export class Editor extends React.Component {
    componentDidMount() {
        let { id, height = 200, disabled = false, value, onChange } = this.props;

        var editor = UM.getEditor(id, {
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
            readonly: disabled,
            imageUrl: "http://baihaobio.com/Admin/admin/upload",
            imagePath: URL + "php/",
            imageFieldName: "photo",
            UMEDITOR_HOME_URL: 'http://ueditor.baidu.com/umeditor/',
            toolbar: [
                'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
                'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
                '| justifyleft justifycenter justifyright justifyjustify |',
                'link unlink | image',
                '| horizontal fullscreen', 'drafts', 'formula'
            ],
            filterRules: {},
            xssFilterRules: true,
            inputXssFilter: true,
            outputXssFilter: true,
            whiteList: {
                a: ['target', 'href', 'title', 'style', 'class', 'id'],
                abbr: ['title', 'style', 'class', 'id'],
                address: ['style', 'class', 'id'],
                area: ['shape', 'coords', 'href', 'alt', 'style', 'class', 'id'],
                article: ['style', 'class', 'id'],
                aside: ['style', 'class', 'id'],
                audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'style', 'class', 'id'],
                b: ['style', 'class', 'id'],
                bdi: ['dir'],
                bdo: ['dir'],
                big: [],
                blockquote: ['cite', 'style', 'class', 'id'],
                br: [],
                caption: ['style', 'class', 'id'],
                center: [],
                cite: [],
                code: ['style', 'class', 'id'],
                col: ['align', 'valign', 'span', 'width', 'style', 'class', 'id'],
                colgroup: ['align', 'valign', 'span', 'width', 'style', 'class', 'id'],
                dd: ['style', 'class', 'id'],
                del: ['datetime', 'style', 'class', 'id'],
                details: ['open', 'style', 'class', 'id'],
                div: ['style', 'class', 'id'],
                dl: ['style', 'class', 'id'],
                dt: ['style', 'class', 'id'],
                em: ['style', 'class', 'id'],
                embed: ['style', 'class', 'id', '_url', 'type', 'pluginspage', 'src', 'width', 'height', 'wmode', 'play', 'loop', 'menu', 'allowscriptaccess', 'allowfullscreen'],
                font: ['color', 'size', 'face', 'style', 'class', 'id'],
                footer: ['style', 'class', 'id'],
                h1: ['style', 'class', 'id'],
                h2: ['style', 'class', 'id'],
                h3: ['style', 'class', 'id'],
                h4: ['style', 'class', 'id'],
                h5: ['style', 'class', 'id'],
                h6: ['style', 'class', 'id'],
                header: ['style', 'class', 'id'],
                hr: ['style', 'class', 'id'],
                i: ['style', 'class', 'id'],
                iframe: ['style', 'class', 'id', 'src', 'frameborder', 'data-latex'],
                img: ['src', 'alt', 'title', 'width', 'height', 'style', 'class', 'id', '_url'],
                ins: ['datetime', 'style', 'class', 'id'],
                li: ['style', 'class', 'id'],
                mark: [],
                nav: [],
                ol: ['style', 'class', 'id'],
                p: ['style', 'class', 'id'],
                pre: ['style', 'class', 'id'],
                s: [],
                section: [],
                small: ['style', 'class', 'id'],
                span: ['style', 'class', 'id'],
                sub: ['style', 'class', 'id'],
                sup: ['style', 'class', 'id'],
                strong: ['style', 'class', 'id'],
                table: ['width', 'border', 'align', 'valign', 'style', 'class', 'id'],
                tbody: ['align', 'valign', 'style', 'class', 'id'],
                td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'style', 'class', 'id'],
                tfoot: ['align', 'valign', 'style', 'class', 'id'],
                th: ['width', 'rowspan', 'colspan', 'align', 'valign', 'style', 'class', 'id'],
                thead: ['align', 'valign', 'style', 'class', 'id'],
                tr: ['rowspan', 'align', 'valign', 'style', 'class', 'id'],
                tt: ['style', 'class', 'id'],
                u: [],
                ul: ['style', 'class', 'id'],
                svg: ['style', 'class', 'id', 'width', 'height', 'xmlns', 'fill', 'viewBox'],
                video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'style', 'class', 'id']
            }
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