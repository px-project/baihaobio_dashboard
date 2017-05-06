/**
 * home page.
 */
import React from 'react';
import { PageDetail, Loader, xhttp } from '../../../common';
import './style.scss';

export class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { total: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/flow/counts').then(res => {
            this.setState({ total: res, loading: false });
        });
    }

    render() {
        let { loading, total } = this.state;
        return (
            <PageDetail className="home-page">
                <Loader loading={ loading }>

                    <ul className="total">
                        <li>
                            <div className="cover" style={ { background: '#00ffa9' } }>D</div>
                            <div className="info">
                                <h6>今日</h6>
                                <p>{ total.today }</p>
                            </div>
                        </li>

                        <li>
                            <div className="cover" style={ { background: '#ffb800' } }>M</div>
                            <div className="info">
                                <h6>本月</h6>
                                <p>{ total.month }</p>
                            </div>
                        </li>

                        <li>
                            <div className="cover" style={ { background: '#ff6666' } }>Y</div>
                            <div className="info">
                                <h6>年度</h6>
                                <p>{ total.year }</p>
                            </div>
                        </li>
                    </ul>
                </Loader>
            </PageDetail>
        );
    }
}