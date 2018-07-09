import { Entity, property, model } from '@loopback/repository'

@model()
export class Post extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number

  @property({
    type: 'string',
    required: true
  })
  title: string

  @property({
    type: 'string',
    required: true
  })
  body: string

  getId() {
    return this.id
  }
}
