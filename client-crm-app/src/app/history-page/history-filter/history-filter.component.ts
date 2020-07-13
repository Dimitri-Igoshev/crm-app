import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Filter } from '../../common/interfaces/filter'
import { Order } from '../../common/interfaces/order'
import { MatDatepickerModule } from '@angular/material/datepicker'

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Input() orders: Order[]
  @Input() rangePicker
  @Output() onFilter = new EventEmitter<Filter>()

  constructor() {
  }

  ngOnInit(): void {

  }

}
