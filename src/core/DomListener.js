export class DomListener {
 
    constructor($root) {
        if (!$root) {
            throw new Error(`No $root priver`);
        }
        
        this.$root = $root;
    }
}