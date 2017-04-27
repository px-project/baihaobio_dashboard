/**
 * 侧边栏组件
 */
import React from 'react';
import { SidebarNav } from '../nav/';
import { SidebarLogo } from '../logo/';
import './style.scss';

export const Sidebar = props => (
	<sidebar id="sidebar">
		<SidebarLogo {...props}></SidebarLogo>
		<SidebarNav {...props}></SidebarNav>
	</sidebar>
);