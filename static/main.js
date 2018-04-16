let h = React.createElement;


let main = document.querySelector('.main');


let Title = ( {title} ) => <h1 className="header">{`${title}`}</h1>;
let Image = ( {image} ) => <img src={`${image}`}/>;
let Author = ( {author} ) => <h3>{`Written By: ${author}`}</h3>;
let PostDate = ( {date} ) => <h3>{`Date: ${date}`}</h3>;
let Body = ( {body} ) => <p>{`${body}`}</p>;
let DeleteBlogButton = (props) => <button onClick= {() => props.removeBlog(props.blog)}>Remove Blog</button>;
let EditBlogButton = (props) => <button onClick= {() => props.editBlog(props.blog)}>Edit Blog</button>;
let SaveBlogButton = (props) => <button onClick= {() => props.saveBlog(props.blog)}>Save Blog</button>;


let BlogPost = ( {blog, removeBlog, editBlog} ) => <div>
    <Title title={ blog.title}/>
    <Image image={blog.image}/>
    <Author author={blog.author}/>
    <PostDate date={blog.date}/>
    <Body body={blog.body}/>
    <DeleteBlogButton blog={blog} removeBlog={removeBlog}/>
    <EditBlogButton blog={blog} editBlog={editBlog}/>
    </div>

let EditableBlogPost = ({blog, removeBlog, editBlog, saveBlog, updateActions}) => 
    <form className="edit-form"> 
        <input name="title" value={`${blog.title}`} onChange={ (event) => updateActions.updateTitle(blog, event)}></input>
        <input name="image" value={`${blog.image}`} onChange={ (event) => updateActions.updateImage(blog, event)}></input>
        <input name="author" value={`${blog.author}`} onChange={ (event) => updateActions.updateAuthor(blog, event)}></input>
        <PostDate date={blog.date}/>
        <input name="body" value={`${blog.body}`} onChange={ (event) => updateActions.updateBody(blog, event)}></input>
        <DeleteBlogButton blog={blog} removeBlog={removeBlog}/>
        <SaveBlogButton blog={blog} saveBlog={saveBlog}/>
    </form>;

let BlogList = ({blogs}) => h('div', {className: 'post-list'}, blogs);



class Page extends React.Component {
    constructor (props) {
		super(props);
		this.state = {blogs: [], blogBeingEdited: null}
    }

    componentDidMount() {
        this.fetchData();   
    } 
    
    fetchData () {
        fetch('http://localhost:3000/blogs')
            .then(res => res.json())
            .then(res => this.setState({blogs: res}) )
    }

    render () {
        let {blogs, blogBeingEdited} = this.state;
        
        let removeBlog = (blogToDelete) => {
            let { id } = blogToDelete;
            let removeBlogList = blogs.filter( (blog) => blog.id !== id);
            return this.setState({blogs: removeBlogList});
        }

        let editBlog = (blogToEdit) => {
            let editedBlog = blogs.find( (blog) => blog.id === blogToEdit.id);
            return this.setState({blogBeingEdited : editedBlog});
        }

        let saveBlog = (blogToSave) => {
            return this.setSetate({blogBeingEdited : null})
        }

        let updateTitle = (blogToUpdate, event) => {
            let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
            blog.title = event.target.value;
            return this.setState({blogBeingEdited:blogToUpdate})
        };
        
        let updateAuthor = (blogToUpdate, event) => {
            let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
            blog.author = event.target.value;
            return this.setState({blogBeingEdited:blogToUpdate})
        };
        
        let updateBody = (blogToUpdate, event) => {
            let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
            blog.body = event.target.value;
            return this.setState({blogBeingEdited:blogToUpdate})
        };
        
        let updateImage = (blogToUpdate, event) => {
            let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
            blog.image = event.target.value;
            return this.setState({blogBeingEdited:blogToUpdate})
        };

        let updateActions = {
            'updateTitle': updateTitle,
            'updateAuthor': updateAuthor,
            'updateImage': updateImage,
            'updateBody': updateBody
        }

        let newBlogList = [];
        blogs.forEach( (blog) => {
        if (blog === blogBeingEdited ) {
            let newBlog = <EditableBlogPost key={blog.id} blog={blog} removeBlog={removeBlog} editBlog={editBlog} saveBlog={saveBlog} updateActions={updateActions} />;
            newBlogList.push(newBlog);
        } else {
            let newBlog = <BlogPost key={blog.id} blog={blog} removeBlog={removeBlog} editBlog={editBlog} saveBlog={saveBlog} updateActions={updateActions} />;
            newBlogList.push(newBlog);
        }
        });
        let allBlogs = h(BlogList, {blogs: newBlogList});
        return allBlogs;
    };
};

ReactDOM.render(<Page/>, main);
