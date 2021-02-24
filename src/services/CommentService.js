import BaseService from './BaseService';

export default class CommentService {
  
    addComment(comment) {
        return http.post('comments', comment)
    }

    removeComment(id) {
        return http.delete(`comments/${id}`)
    }
}

export const commentsService = new CommentService()