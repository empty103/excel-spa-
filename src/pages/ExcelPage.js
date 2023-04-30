import { Excel } from '../components/excel/Excel';
import { Formula } from '../components/formula/Formula';
import { Toolbar } from '../components/Toolbar/Toolbar';
import { Header } from '../components/header/Header';
import { Table } from '../components/table/Table';

import { createStore } from '../core/createStore';
import { rootReducer } from '../redux/rootReducer';

import { storage, debounce } from '../core/utils';
import { initialState } from '../redux/initialState';

import { Page } from "../core/routes/Page";

export class ExcelPage extends Page {
    getRoot() {
        const store = createStore(rootReducer, initialState);

        const stateListener = debounce((state) => {
            storage('excel-state', state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}