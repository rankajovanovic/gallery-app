import BaseService from './BaseService';

class CommentService extends BaseService {
  
    async addComment(comment) {
        console.log('usao u comment service');
         const { data } = await this.http.post('comments', comment )
         console.log(data);
         return data;
    }

    async removeComment(id) {
        const {data} = await this.http.delete(`comments/${id}`)
        return data;
    }
}

const commentService = new CommentService();
export default commentService;