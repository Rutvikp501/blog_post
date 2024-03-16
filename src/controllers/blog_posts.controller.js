const BlogPost = require('../models/blogpost.model');
const usermodel = require('../models/user.model');

exports.GetAllPost = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        if (!posts) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.CreatePost = async (req, res) => {
    const { title, content, author } = req.body;
    let  authorID =  await usermodel.find({ Email: author });
   
    try {
        if (authorID==null) {
            return res.status(404).json({ message: 'Author not found create account first' });
        }
        const post = new BlogPost({
            title: title,
            content: content,
            author:  authorID[0]._id,
        });
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.GetSinglePost = async (req, res) => {
let blogPostId = req.params.id;
let userId = req.params.id;
try {
    let post = await BlogPost.findById(blogPostId).populate('author');
    if (post == null) {
        const populatedPost = await BlogPost.findOne({ author: userId }).populate('author');
        if (populatedPost == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.status(200).json(populatedPost);
    } else {
        res.status(200).json(post);
    }
} catch (error) {
    return res.status(500).json({ message: error.message });
}

};

exports.UpdatePost = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        let post = await BlogPost.findById(req.params.id);
        // console.log(post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (req.body.title != null) {
            post.title = req.body.title;
        }
        if (req.body.content != null) {
            post.content = req.body.content;
        }
        if (req.body.author != null) {
            post.author = req.body.author;
        }

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.DeletePost = async (req, res) => {
    console.log(req.params.id);
    try {
        let post = await BlogPost.findById(req.params.id);
        console.log(post); // Check what post object is returned
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        let delete1 = await BlogPost.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
