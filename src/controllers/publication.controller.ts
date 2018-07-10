import { inject } from '@loopback/core'
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
  del
} from '@loopback/rest'
import {
  AuthenticationBindings,
  UserProfile,
  authenticate
} from '@loopback/authentication'

export class PublicationController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
    @repository(PublicationRepository) protected repo: PublicationRepository
  ) {}

  @authenticate('BasicStrategy')
  @get('/whoami')
  whoAmI(): string {
    return this.user.id
  }

  @get('/publications')
  async findPublications(): Promise<Publication[]> {
    return await this.repo.find()
  }

  @get('/publications/{pmid}')
  async findPublicationByPmid(
    @param.path.number('pmid') pmid: number
  ): Promise<Publication> {
    return await this.repo.findById(pmid)
  }

  @post('/publications')
  async createPublication(
    @requestBody() publication: Publication
  ): Promise<Publication> {
    if (!publication.title) {
      throw new HttpErrors.BadRequest('title is required')
    }
    return await this.repo.create(publication)
  }

  @put('/publications')
  async updatePublication(
    @requestBody() publication: Publication
  ): Promise<boolean> {
    return await this.repo.update(publication)
  }

  @patch('/publications/{pmid}')
  async updatePublicationByPmid(
    @param.path.number('pmid') pmid: number,
    @requestBody() publication: Publication
  ): Promise<boolean> {
    return await this.repo.updateById(pmid, publication)
  }

  @del('/publications/{pmid}')
  async deletePublicationByPmid(
    @param.path.number('pmid') pmid: number
  ): Promise<boolean> {
    return await this.repo.deleteById(pmid)
  }
}
