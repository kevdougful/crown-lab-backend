import { Entity, property, model } from '@loopback/repository'

@model()
export class Person extends Entity {
  @property({
    type: 'number',
    description: 'User ID'
  })
  id: number

  @property({
    type: 'string',
    description: 'given name'
  })
  firstName: string

  @property({
    type: 'string',
    description: 'surname'
  })
  lastName: string

  @property({
    type: 'string',
    description: 'Twitter handle'
  })
  twitterUser: string

  @property({
    type: 'string',
    description: 'email address'
  })
  email: string

  @property.array(String, {
    type: 'string',
    description: 'functions this person fulfills'
  })
  roles: string[]
}
