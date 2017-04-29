/**
 * 侧边栏导航
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {Icon} from '../../../../common';
const SubMenu = Menu.SubMenu;
const routerConfig = require('../../../../../config/router.json');
import './style.scss';

export class SidebarNav extends React.Component {
	linkTo (item) {
		this.props.history.push(item.key);
	}

	render () {
		return (
			<Menu className="sidebar-nav" theme='dark' mode="inline" onClick={this.linkTo.bind(this)}>
				{ routerConfig.map((module, index) => (
					module.modules ? (
						<SubMenu key={index} title={ 
							<span className="sidebar-title">
								<Icon icon={ module.icon }></Icon> 
								<span>{ module.title }</span>
							</span>
						}>
							{ module.modules.map((sub_module, sub_index) => (
								<Menu.Item key={`/${sub_module.path}`}>
									{ sub_module.title }
								</Menu.Item>
							)) }
						</SubMenu>
					) : (<Menu.Item key={ index } key={`/${module.path}`}>
						<span className="sidebar-title">
							<Icon icon={ module.icon }></Icon>
							<span>{ module.title }</span>
						</span>
					</Menu.Item>)
				)) }
			</Menu>
		);
	}
}
