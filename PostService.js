import FileServices from "./FileServices.js";
import Post from "./Post.js";

class PostService {
    async create(post, picture) {
        const fileName = FileServices.saveFile(picture)
        const createdPost = await Post.create({...post, picture: fileName}) 
        
        return createdPost;
    }

    async getAll() {
        const posts = await Post.find();
             
        return posts
    }

    async getOne(id) {
        if(!id) {
            throw new Error("не указан ID")
        }

        const post = await Post.findById(id);
        
        return post;
    }

    async update(post) {
        if(!post._id) {
            throw new Error("не указан ID")
        }

        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})

        return updatedPost
    }

    async delete(id) {
        const post = await Post.findByIdAndDelete(id);
            
        if(!id) {
            res.status(400).json({message: "Id не указан"})
        }
            
        return post
    }
}

export default new PostService;