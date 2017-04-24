/**
 * 侧边栏导航
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const routerConfig = require('../../../../../config/router.json');
import './style.scss';

export const SidebarNav = () => (
	<Menu className="sidebar-nav" theme='dark' mode="inline">
		{ routerConfig.map((module, index) => (
			module.module ? (
				<SubMenu title={ <span><Icon type={ module.icon }></Icon> <span>{ module.title }</span> </span> }>
					{ module.module.map((sub_module, sub_index) => (
						<Menu.Item key={ '' + index + sub_index }>
							{ sub_module.title }
						</Menu.Item>
					)) }
				</SubMenu>
			) : (<Menu.Item key={ index }>
				<span>
					<Icon type={ module.icon }></Icon>
					<span>{ module.title }</span>
				</span>
			</Menu.Item>)
		)) }
	</Menu>
);
