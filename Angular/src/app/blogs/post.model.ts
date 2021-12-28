export class Post 
{
    blogs: {
        _id: string;
        user: string;
        topic: string;
        blogContent: string;
        comments: [
            {
                whoCommented: string,
                comment: string,
            },
        ];
        likes: string;
        createdAt: Date;
        updatedAt: Date;
    };
    code: Number;
    status: string;
    message: string;
}