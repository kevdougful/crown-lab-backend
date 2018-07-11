import { repository } from '@loopback/repository'
import { PersonRepository } from '../repositories'
import { Person } from '../models'
import {
  HttpErrors,
  post,
  param,
  requestBody,
  get,
  put,
  patch,
  del
} from '@loopback/rest'

export class PersonController {
  constructor(@repository(PersonRepository) protected repo: PersonRepository) {}

  @get('/people')
  async findPeople(): Promise<Person[]> {
    return await this.findPersons()
  }

  @get('/persons')
  async findPersons(): Promise<Person[]> {
    return await this.repo.find()
  }

  @get('/persons/{id}')
  async findPersonById(@param.path.number('id') id: number): Promise<Person> {
    return await this.repo.findById(id)
  }

  @post('/persons')
  async createPerson(@requestBody() person: Person): Promise<Person> {
    if (!person.lastName) {
      throw new HttpErrors.BadRequest('lastName is required')
    }
    return await this.repo.create(person)
  }

  @put('/persons')
  async updatePerson(@requestBody() person: Person): Promise<boolean> {
    return await this.repo.update(person)
  }

  @patch('/persons/{id}')
  async updatePersonById(
    @param.path.number('id') id: number,
    @requestBody() person: Person
  ): Promise<boolean> {
    return await this.repo.updateById(id, person)
  }

  @del('/persons/{id}')
  async deletePersonById(
    @param.path.number('id') id: number
  ): Promise<boolean> {
    return await this.repo.deleteById(id)
  }
}
