import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgbDate, NgbInputDatepicker } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "cc-input-datepicker-range",
  templateUrl: "./input-datepicker-range.component.html",
  styleUrls: ["./input-datepicker-range.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputDatepickerRangeComponent)
    }
  ]
})
export class InputDatepickerRangeComponent implements ControlValueAccessor {
  /** date hovered in date filter */
  public hoveredDate: NgbDate;
  /** значение контрола */
  public value: DateRangeSelection = null;
  /** disabled */
  public disabled = false;

  constructor() {}

  /** is date hovered? */
  public isHovered(date: NgbDate): boolean {
    return (
      this.value &&
      this.value.fromDate &&
      !this.value.toDate &&
      this.hoveredDate &&
      date.after(this.value.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  /** is date inside range? */
  public isInside(date: NgbDate): boolean {
    return (
      this.value &&
      date.after(this.value.fromDate) &&
      date.before(this.value.toDate)
    );
  }

  /** is date in range? */
  public isRange(date: NgbDate): boolean {
    return (
      this.value &&
      (date.equals(this.value.fromDate) ||
        date.equals(this.value.toDate) ||
        this.isInside(date) ||
        this.isHovered(date))
    );
  }

  /** ---------   Имплементируемые методы  ----------- */
  /** registerOnChange */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /** registerOnTouched */
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
  /** запись первого значения из ControlValueAccessor */
  public writeValue(outsideValue: DateRangeSelection): void {
    if (!outsideValue) {
      outsideValue = {
        fromDate: null,
        toDate: null
      };
    }
    // получить из Forms API
    this.value = outsideValue;
  }
  /** задизайблить */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** изменение значения */
  public updateValue(date: NgbDate): void {
    if (!this.disabled) {
      this.setRange(date);
      this.onChange(this.value); // уведомить Forms API
      this.onTouched();
    }
  }

  /** ---------   Имплементируемые методы  ----------- */

  /** изменение значения для  ControlValueAccessor*/
  private onChange = (value: any) => {};
  /** первый фокус на контроле */
  private onTouched = () => {};

  /** установить период/дату в зависимости от выбранной даты */
  private setRange(date: NgbDate): void {

    if (!this.value.fromDate && !this.value.toDate) {
      this.value.fromDate = date;
    } else if (this.value.fromDate && !this.value.toDate && date.after(this.value.fromDate)) {
      this.value.toDate = date;
    } else {
      this.value.toDate = null;
      this.value.fromDate = date;
    }
  }

  public getDate(date: NgbDate) {
    if (!date) {
      return null;
    }
    return new Date(date.year, date.month, date.day);
  }
}

export interface DateRangeSelection {
  /** fromDate of date filter */
  fromDate: NgbDate;
  /** toDate of date filter */
  toDate: NgbDate;
}
