export class ActiveRoute {
    constructor(params) {
        this.params = params;
    }

    static get path() {
        return window.location.hash.slice(1);
    }

    static get param() {
        return ActiveRoute.path.split('/');
    }
}