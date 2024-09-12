import React, { useEffect, useState } from 'react';
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';
import { calculateReadingTime } from '@/utils/helper';
import Link from 'next/link';

interface Blog {
  title: string;
  description: string;
  blogImage: {
    url: string
  }
  blog: {
    body: {
      raw: any;
      text: string;
    }
  };
  slug: string;
  featuredBlog: boolean;
}

interface Blogs {
  ourBlogs: Blog[];
}

const BlogPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await graphQLClient.request<Blogs>(
          gql`
            query MyQuery {
              ourBlogs {
                title
                description
                blog {
                  body {
                    text
                    raw
                  }
                }
                blogImage{
                  url
                }
                featuredBlog
                slug
              }
            }
          `
        );

        if (response && response.ourBlogs) {
          const featured = response.ourBlogs.find(blog => blog.featuredBlog);
          console.log(featured?.slug);
          setFeaturedBlog(featured || null);
          const remainigBlogs = response.ourBlogs.filter(blog => blog.featuredBlog)
          setBlogs(remainigBlogs)
        }
      } catch (error) {
        console.error("GraphQL Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center space-x-4 z-50">
        <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    );
  }

  if (!featuredBlog) {
    return <div className="text-center mt-10">No featured blog found.</div>;
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <div className="mx-auto pt-24 pb-10 bg-bgtop">
      <div className="featured-blog flex flex-col items-center lg:flex-row bg-box1 md:py-24 xl:px-24 px-4 py-8 w-full min-h-[40vh] mb-8">
        <div className="featured-image lg:w-1/2 h-[500px] flex-1">
          <img src={featuredBlog.blogImage.url} alt={featuredBlog.title} className="rounded-lg object-cover w-full h-full" />
        </div>
        <div className="featured-content lg:w-1/2 lg:pl-10 pl-0 mt-4 lg:mt-0">
          <h2 className="md:text-5xl text-3xl font-bold mb-2 font-playfair uppercase">{featuredBlog.title}</h2>
          <div className='flex items-start'>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mt-1 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <p className='xsm:mb-10 mb-6 font-nunito uppercase text-bg1 font-semibold text-lg'>
              {calculateReadingTime(featuredBlog.blog.body.text)} minute reading
            </p>
          </div>
          <p className="md:text-2xl text-lg font-nunito lg:mb-10 mb-4">{featuredBlog.description}</p>
          <Link href={`/blogs/${featuredBlog.slug}`} >
          <button  className='mb-2 sm:px-8 px-6 py-3 sm:text-xl text-sm font-nunito transition-all duration-300 text-[#F7F6F3] bg-primary rounded-lg shadow-xl hover:bg-box2 hover:text-primary'>
            READ MORE
          </button>
          </Link>
        </div>
      </div>

       <div className="other-blogs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-20 px-4">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-post p-4 rounded-lg ">
            <img src={blog.blogImage.url} alt={blog.title} className="rounded-lg mb-4 w-full h-48 object-cover" />
            <h3 className="text-2xl font-semibold mb-2 font-playfair">{blog.title}</h3>
            <div className='flex items-start'>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mt-1 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <p className='mb-2 font-nunito uppercase text-bg1 font-semibold text-lg'>
              {calculateReadingTime(blog.blog.body.text)} minute reading
            </p>
          </div>
            {/* <p className="text-gray-600 mb-2 font-raleway">{blog.description}</p> */}
            <p className="text-base font-nunito">{truncateText(blog.description, 15)}</p>
            <button className='mb-2 sm:px-4 px-3 py-3 sm:text-sm text-sm font-nunito transition-all duration-300 text-[#F7F6F3] bg-primary rounded-lg shadow-xl hover:bg-box2 hover:text-primary mt-2'>
            READ MORE
          </button>
          </div>
        ))}
      </div>
    
    
    </div>
  );
};

export default BlogPage;