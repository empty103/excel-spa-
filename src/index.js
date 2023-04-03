import { Formula } from './components/Formula/Formula';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';

import './scss/index.scss'


const excel = new Excel('#app', {
    components: [Header, Formula, Table, Toolbar]
});

excel.render();
console.log('excel', excel)

