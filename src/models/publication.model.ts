import { Entity, property, model } from '@loopback/repository'

@model()
export class Publication extends Entity {
  @property({
    type: 'number',
    id: true,
    description: 'PubMed ID'
  })
  pmid: number
  
  @property({
    type: 'string',
    description: 'digital object identifier (doi.org)'
  })
  doi: string

  @property({
    type: 'string',
    description: 'PubMed Central ID'
  })
  pmcid: string

  @property({
    type: 'string',
    description: 'Title of the publication'
  })
  title: string

  @property.array(String, {
    description: 'Authors appearing on the publication'
  })
  authors: string[]

  @property.array(String, {
    description: 'Essential terms related to the publication'
  })
  keywords: string[]

  getId() {
    return this.id
  }

  constructor(data?: Partial<Publication>) {
    super(data)
  }
}
