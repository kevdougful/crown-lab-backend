import { repository } from '@loopback/repository'
import { PostRepository } from '../repositories'
import { Post } from '../models'
import { HttpErrors, post, param, requestBody, get, put, patch, del } from '@loopback/rest'

export class PostController {
  constructor(@repository(PostRepository) protected postRepo: PostRepository) {}

  @post('/posts')
  async createPost(@requestBody() post: Post) {
    if (!post.title) {
      throw new HttpErrors.BadRequest('title is required')
    }
    return await this.postRepo.create(post)
  }

  @get('/posts/{id}')
  async findPostById(@param.path.number('id') id: number): Promise<Post> {
    return await this.postRepo.findById(id)
  }
}
