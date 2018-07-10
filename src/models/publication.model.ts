import { Entity, property, model } from '@loopback/repository'

@model()
export class Publication extends Entity {
  @property({ type: 'string', id: true })
  id?: string

  @property({ type: 'string' })
  doi: string

  @property({ type: 'number' })
  pmid: number

  @property({ type: 'string' })
  pmcid: string

  @property({ type: 'string' })
  title: string

  @property.array(String) authors: string[]

  @property.array(String) keywords: string[]

  getId() {
    return this.id
  }

  constructor(data?: Partial<Publication>) {
    super(data)
  }
}
