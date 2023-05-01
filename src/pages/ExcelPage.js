import { Excel } from '../components/excel/Excel';
import { Formula } from '../components/formula/Formula';
import { Toolbar } from '../components/Toolbar/Toolbar';
import { Header } from '../components/header/Header';
import { Table } from '../components/table/Table';

import { createStore } from '../core/createStore';
import { rootReducer } from '../redux/rootReducer';

import { normalizeInitialState } from '../redux/initialState';
import { StateProcessor } from '../core/page/StateProcessor';

import { Page } from "../core/page/Page";
import { localStorageClient } from '../shared/LocalStorageClient';


export class ExcelPage extends Page {
    constructor(param) {
        super(param);

        this.storeSub = null;
        this.processor = new StateProcessor(
            new localStorageClient(this.params)
        );
    }

    async getRoot() {
        const state = await this.processor.get();
        const store = createStore(rootReducer, normalizeInitialState(state));

        this.storeSub = store.subscribe(this.processor.listen);

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
        this.storeSub.unsubscribe();
    }
}