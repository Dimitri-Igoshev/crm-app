import { Component, Input, OnInit } from '@angular/core'
import { Order } from '../../common/interfaces/order'

@Component({
  selector: 'app-history-dialog-list',
  templateUrl: './history-dialog-list.component.html',
  styleUrls: ['./history-dialog-list.component.scss']
})
export class HistoryDialogListComponent implements OnInit {

  @Input() order: Order
  displayedColumns: string[] = ['title', 'quantity', 'cost']
  dataSource = []

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.order.list
  }


}
