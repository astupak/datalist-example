import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';
/**
 *  Вход - список рекомендуемых значений, выход - результат ввода.
 *  Значения предлагаются по вхождению подстроки.
 */
@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css'],
})
export class DatalistComponent {
  /**
   * Входной список строк
   */
  @Input() items: Array<string> = [];

  /**
   * Аутпут результата
   */
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Массив строк, фильтрующийся при изменении инпута в шаблоне, отображается в дропдауне
   */
  filteredItems: Array<string> = this.items;

  /**
   * Значение, отображаемое в инпуте
   */
  displayedValue: string = '';

  /**
   * Состояние дропдауна
   */
  isOpen = false;

  /**
   *
   * Обработчик внешнего клика, если таргет не из datalist-компонента — вызываем closeDropdown
   */
  @HostListener('document:click', ['$event']) onBlur(event: Event): void {
    if (
      !(this.elementRef.nativeElement as HTMLElement).contains(
        event.target as HTMLElement
      )
    ) {
      this.closeDropdown();
    }
  }

  constructor(private elementRef: ElementRef) {}
  /**
   *
   * Ресетит filteredItems = items, сбрасывает displayedValue
   */
  ngOnChanges({ items }: { items: SimpleChange }): void {
    this.displayedValue = '';
    this.filteredItems = items.currentValue;
  }
  /**
   *
   * Обработчик изменений инпута, достает из ивента значение инпута и вызывает setValue
   */
  onInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.setValue(query);
  }
  /**
   *
   * Обработчик выбора элемента в дропдауне, вызывает setValue(value) и closeDropdown()
   */
  onSelect(item: string): void {
    this.setValue(item);
    this.closeDropdown();
  }

  /**
   *
   * Метод установки значения. Сеттит displayValue, фильтрует items по value и сеттит filteredItems
   */
  setValue(value: string): void {
    this.displayedValue = value;
    this.filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    this.onChange.emit(value);
  }

  /**
   * Открывает дропдаун, т.е сеттит isOpen = true
   */
  openDropdown(): void {
    this.isOpen = true;
  }

  /**
   * Закрывает дропдаун, т.е сеттит isOpen = false
   */
  closeDropdown(): void {
    this.isOpen = false;
  }
}
