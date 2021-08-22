import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css'],
})
export class DatalistComponent implements OnInit {
  @Input() items: Array<string> = [];

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  isOpen = false;

  filteredItems: Array<string> = this.items;

  displayedValue: string = '';

  @HostListener('document:click', ['$event']) onBlur(event: Event) {
    if (
      !(this.elementRef.nativeElement as HTMLElement).contains(
        event.target as HTMLElement
      )
    ) {
      this.closeDropdown();
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngOnChanges({ items }: { items: SimpleChange }) {
    this.filteredItems = items.currentValue;
  }

  onInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.setValue(query);
  }

  openDropdown() {
    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectItem(item: string) {
    this.setValue(item);
    this.closeDropdown();
  }

  setValue(value: string) {
    this.displayedValue = value;
    this.filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    this.onChange.emit(value);
  }
}
