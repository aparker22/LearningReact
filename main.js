let h = React.createElement;

let blogs = [
    {title: 'Learning React is Easy!', author: 'Ashley Parker', date: '4-11-18', body: `We've learned what React is NOT.  Now learn what it IS.`, image: 'https://images.readwrite.com/wp-content/uploads/2018/03/React-components.png'},
    {title: 'Yeah, but can you use vim?', author: 'Nick Wilson', date: '4-11-18', body: `I like to create complicated files that no one can access.`, image: './pokemon.jpg'},
    {title: 'How to write blog posts', author: 'Jonathan Martin', date: '4-11-18', body: `Mountains are nice.  I like to take pictures of them.`, image: 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/b8/98/20/640px-primo-piano-del-monte-bianco-al-lago-di-pietra-rossa.jpg'},
    {title: 'Headshots for Free', author: 'Tigbemileke Ojo', date: '4-11-18', body: `Hold this light.  Hold this board.  Voila!  A picture!`, image: 'http://proppms.com/wp-content/uploads/2013/10/Prop-PMS-Photo.jpg'},
]


let main = document.querySelector('.main');

let Title = ( {title} ) => h('h1', {className: 'header'}, `${title}`);
let Image = ( {image} ) => h('img', {src: image});
let Author = ( {author} ) => h('h3', null, `Written By: ${author}`);
let PostDate = ( {date} ) => h('h3', null, `Date: ${date}`);
let Body = ( {body} ) => h('p', null, `${body}`);



let BlogPost = ( {title, author, date, body, image} ) => h('div', {className: 'post'}, [
    h(Title, {title}, []),
    h(Image, {image}),
    h(Author, {author}, []),
    h(PostDate, {date}, []),
    h(Body, {body}, []),

    ]);

let BlogList = (blogList) => h('div', {className: 'post-list'}, blogList);


let renderToPage = (blogs) => {
    let newBlogList = blogs.map( (blog) => h(BlogPost, blog));
    let allBlogs = BlogList(newBlogList)
    ReactDOM.render(allBlogs, main);
};

renderToPage(blogs);
