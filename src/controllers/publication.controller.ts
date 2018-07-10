import { repository } from '@loopback/repository'
import { PublicationRepository } from '../repositories'
import { Publication } from '../models'
import {
  HttpErrors,
  post,
  param,
  requestBody,
  get,
  put,
  patch,
  del,
  api
} from '@loopback/rest'
import { def } from './publication.controller.api'

@api(def)
export class PublicationController {
  constructor(
    @repository(PublicationRepository) protected repo: PublicationRepository
  ) {}

  @get('/publications')
  async findPublications(): Promise<Publication[]> {
    return await this.repo.find()
  }

  @post('/publications')
  async createPublication(@requestBody() publication: Publication) {
    if (!publication.title) {
      throw new HttpErrors.BadRequest('title is required')
    }
    return await this.repo.create(publication)
  }
}
