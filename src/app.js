/**
 * project entry.
 */
import React from 'react';
import { render } from 'react-dom';
import { App } from './modules/app/pages';

const rootElement = document.getElementById('app');

render(
    <App></App>,
    rootElement
);