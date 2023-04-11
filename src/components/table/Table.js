import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

import { $ } from '../../core/dom';
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./TableSelection";

import {
  isCell,
  matrix,
  shouldResize,
  nextSelector
} from "./table.function";

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
    });
  }

  toHTML() {
    return createTable(30);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select($cell);
  }


  onMousedown(event) {
    if (shouldResize(event)) {
      return resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      const { col, row } = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, col, row));
      this.selection.select($next);
    }
  }
}

