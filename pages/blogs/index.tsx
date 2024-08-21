import React from 'react';

const BlogPage = () => {
  const featuredBlog = {
    title: "Featured Blog Title",
    description: "This is the description of the featured blog. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi maiores, perferendis repudiandae excepturi nemo nobis autem cupiditate harum, expedita animi modi quos, aliquam sit consequuntur ipsam nesciunt laboriosam voluptate provident deleniti libero! ",
    image: "https://res.cloudinary.com/dgpd9qgst/image/upload/v1718271348/cld-sample.jpg",
    date: "August 21, 2024",
  };

  const otherBlogs = [
    {
      title: "Blog Post 1",
      description: "This is a brief description of Blog Post 1.",
      image: "blog-post-1-image-url.jpg",
      date: "August 20, 2024",
    },
    {
      title: "Blog Post 2",
      description: "This is a brief description of Blog Post 2.",
      image: "blog-post-2-image-url.jpg",
      date: "August 19, 2024",
    },
    {
      title: "Blog Post 3",
      description: "This is a brief description of Blog Post 3.",
      image: "blog-post-3-image-url.jpg",
      date: "August 18, 2024",
    },
    {
      title: "Blog Post 3",
      description: "This is a brief description of Blog Post 3.",
      image: "blog-post-3-image-url.jpg",
      date: "August 18, 2024",
    },
    // Add more blog posts as needed
  ];

  return (
    <div className=" mx-auto  pt-24 pb-10 bg-bgtop">
      {/* Featured Blog Section */}
      <div className="featured-blog flex flex-col items-center lg:flex-row bg-box1 md:py-24 md:px-16 px-4 py-8 w-full min-h-[40vh] mb-8">
        <div className="featured-image lg:w-1/2">
          <img src={featuredBlog.image} alt={featuredBlog.title} className="rounded-lg w-full h-full object-cover" />
        </div>
        <div className="featured-content lg:w-1/2 md:pl-10 mt-4 md:mt-0">
          <h2 className="md:text-5xl text-3xl font-bold mb-2 font-playfair">{featuredBlog.title}</h2>
          <p className="text-gray-600 lg:mb-10 mb-6 font-raleway">{featuredBlog.date}</p>
          <p className="md:text-2xl text-lg font-nunito lg:mb-10 mb-4">{featuredBlog.description}</p>
          <button className='mb-2 sm:px-8 px-6 py-3 sm:text-xl text-sm font-nunito  transition-all duration-300 text-[#F7F6F3] bg-primary rounded-lg shadow-xl  hover:bg-box2 hover:text-primary'>
              {"READ MORE"}
            </button>
        </div>
      </div>

      {/* Other Blogs Section */}
      <div className="other-blogs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-20 px-6">
        {otherBlogs.map((blog, index) => (
          <div key={index} className="blog-post p-4 rounded-lg ">
            <img src={blog.image} alt={blog.title} className="rounded-lg mb-4 w-full h-48 object-cover" />
            <h3 className="text-2xl font-semibold mb-2 font-playfair">{blog.title}</h3>
            <p className="text-gray-600 mb-2 font-raleway">{blog.date}</p>
            <p className="text-base font-nunito">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
