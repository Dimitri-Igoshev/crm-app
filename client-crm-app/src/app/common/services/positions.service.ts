import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Position } from '../interfaces/position'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  currentPosition: Position
  currentPositions: Position[] = []
  isNew: boolean = true

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position)
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position)
  }

  remove(position: Position): Observable<any> {
    return this.http.delete<any>(`/api/position/${position._id}`)
  }


  setCurrentPosition(position: Position) {
    this.currentPosition = position
  }

  getCurrentPosition(): Position {
    return this.currentPosition
  }

  setCurrentPositions(positions: Position[]) {
    this.currentPositions = positions
  }

  getCurrentPositions(): Position[] {
    return this.currentPositions
  }

  setIsNew(value: boolean) {
    this.isNew = value
  }

  getIsNew(): boolean {
    return this.isNew
  }

}
