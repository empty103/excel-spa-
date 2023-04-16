import { Formula } from './components/formula/Formula';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';

import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

import './scss/index.scss'
import { storage } from './core/utils';
import { initialState } from './redux/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe(state => {
    storage('excel-state', state);
})


const excel = new Excel('#app', {
    components: [Header, Formula, Table, Toolbar],
    store
});

excel.render();

