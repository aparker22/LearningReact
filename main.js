let h = React.createElement;

let blogs = [
    {id: '1', title: 'Learning React is Easy!', author: 'Ashley Parker', date: '4-11-18', body: `We've learned what React is NOT.  Now learn what it IS.`, image: 'https://images.readwrite.com/wp-content/uploads/2018/03/React-components.png', isBeingEdited: false},
    {id: '2', title: 'Yeah, but can you use vim?', author: 'Nick Wilson', date: '4-11-18', body: `I like to create complicated files that no one can access.`, image: './pokemon.jpg', isBeingEdited: false},
    {id: '3', title: 'How to write blog posts', author: 'Jonathan Martin', date: '4-11-18', body: `Mountains are nice.  I like to take pictures of them.`, image: 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/b8/98/20/640px-primo-piano-del-monte-bianco-al-lago-di-pietra-rossa.jpg', isBeingEdited: false},
    {id: '4', title: 'Headshots for Free', author: 'Tigbemileke Ojo', date: '4-11-18', body: `Hold this light.  Hold this board.  Voila!  A picture!`, image: 'http://proppms.com/wp-content/uploads/2013/10/Prop-PMS-Photo.jpg', isBeingEdited: false},
]


let main = document.querySelector('.main');

let removeBlog = (blogToDelete) => {
    let { id } = blogToDelete;
    blogs = blogs.filter( (blog) => blog.id !== id);
    renderToPage();
}

let editBlog = (blogToEdit) => {
    let blog = blogs.find( (blog) => blog.id === blogToEdit.id)
    blog.isBeingEdited = !blog.isBeingEdited;
    renderToPage();
}

let createEditBlog = ( { blog }) => h('input', {type: 'text', name: 'title', placeholder: `${blog.title}`} );

let Title = ( {title} ) => h('h1', {className: 'header'}, `${title}`);
let Image = ( {image} ) => h('img', {src: image});
let Author = ( {author} ) => h('h3', null, `Written By: ${author}`);
let PostDate = ( {date} ) => h('h3', null, `Date: ${date}`);
let Body = ( {body} ) => h('p', null, `${body}`);
let DeleteBlogButton = (blog) => h('button', {onClick: () => removeBlog(blog)}, 'Remove Blog');
let EditBlogButton = (blog) => h('button', {onClick: () => editBlog(blog)}, 'Edit Blog');

let BlogPost = ( blog ) => h('div', {className: 'post'}, [
    h(Title, {title: blog.title}),
    h(Image, {image: blog.image}),
    h(Author, {author: blog.author}, []),
    h(PostDate, {date: blog.date}, []),
    h(Body, {body: blog.body}, []),
    h(DeleteBlogButton, blog),
    h(EditBlogButton, blog),
    ]);

let updateTitle = (blogToUpdate, event) => {
    let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
    blog.title = event.target.value;
    renderToPage();
};

let updateAuthor = (blogToUpdate, event) => {
    let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
    blog.author = event.target.value;
    renderToPage();
};

let updateBody = (blogToUpdate, event) => {
    let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
    blog.body = event.target.value;
    renderToPage();
};

let EditableBlogPost = (blog) => h('form', {className: 'edit-form'}, [
    h('input', {name: 'title', value: blog.title, onChange: (event) => updateTitle(blog, event)}),
    h(Image, {image: blog.image}),
    h('input', {name: 'author', value: blog.author, onChange: (event) => updateAuthor(blog, event)}),
    h(PostDate, {date: blog.date}, []),
    h('input', {name: 'body', value: blog.body, onChange: (event) => updateBody(blog, event)}),
    h(DeleteBlogButton, blog),
    h(EditBlogButton, blog),
    ]);

let BlogList = ({blogs}) => h('div', {className: 'post-list'}, blogs);


let renderToPage = () => {
    let newBlogList = [];
    blogs.forEach( (blog) => {
        if (blog.isBeingEdited === false) {
        let newBlog = h(BlogPost, blog);
        newBlogList.push(newBlog);

        } else {
            let newBlog = h(EditableBlogPost, blog);
            newBlogList.push(newBlog);
        }
    });
    let allBlogs = h(BlogList, {blogs: newBlogList});
    ReactDOM.render(allBlogs, main);
};

renderToPage();
