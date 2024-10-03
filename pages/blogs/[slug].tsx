import React from 'react';
import { gql } from 'graphql-request';
import { graphQLClient } from "../../lib/graphqlClient";
import Image from 'next/image';
import { RichText } from "@graphcms/rich-text-react-renderer";
import { calculateReadingTime } from '@/utils/blurhash';
import { IoShareSocialSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

interface Blog {
  title: string;
  blogImage: {
    url: string;
  };
  body: {
    raw: any;
    text: string;
  };
  slug: string;
}

interface BlogResponse {
  blogs: Blog[];
}

interface BlogDetailsProps {
  blog: Blog;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  return (
    <div className='bg-bgtop pt-40 flex flex-col justify-center items-center xl:px-24 px-4 pb-10'>
            <Toaster
        position="top-right"
        containerStyle={{
          position: "absolute",
          top: 80,
          right: 20,
        }}
      />

      <h1 className='md:text-5xl text-3xl font-bold font-playfair uppercase md:mb-10 mb-5 max-w-5xl mx-auto'>{blog.title}</h1>
      <div className="flex justify-between items-center lg:w-[70%] w-full">
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
              {calculateReadingTime(blog.body.text)} min
            </p>
      </div>
      <div className="relative">
                  <button 
                    onClick={() => {
                      let blogUrl = `https://smileloft.com/blogs/${blog.slug}`;
                      navigator.clipboard.writeText(blogUrl);
                      toast.success("Share link copied to clipboard!", {
                        duration: 3000,
                      });
                    }}
                    className="flex items-center text-sm text-gray-800 hover:text-gray-900"
                  >
                    <IoShareSocialSharp className="w-4 h-4 mr-1 xsm:mb-10 mb-6 " />
                    <p className='xsm:mb-10 mb-6 font-nunito uppercase text-bg1 font-semibold text-lg'>
share
                    </p>
                  </button>
</div>
      </div>
      <div className="max-w-5xl mx-auto">
            <Image
              src={blog.blogImage.url}
              alt={blog?.title}
              width={1600}
              height={900}
              // placeholder="blur"
              // blurDataURL={blurHashToDataURL(blog?.blurHash)}
              className="aspect-video object-cover rounded-md"
            />

          </div>
          <div className="prose prose-teal  pb-8 font-nunito mt-10 text-3xl text-primary text-[18px] sm:text-[24px]  font-semibold">
              <RichText content={blog?.body?.raw?.children} />
            </div>
      
      {/* <img src={blog.blogImage.url} alt={blog.title} />  */}
    </div>
  );
};

export default BlogDetails;

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const GET_BLOG_QUERY = gql`
    query GetBlog($slug: String!) {
      blogs(where: { slug: $slug }) {
        slug
        title
        blogImage {
          url
        }
        body {
          raw
          text
        }
      }
    }
  `;

  try {
    const blogResponse = await graphQLClient.request<BlogResponse>(
      GET_BLOG_QUERY,
      {
        slug: params.slug,
      }
    );

    const blogs = blogResponse.blogs;

    // Check if the blogs array contains at least one blog
    if (!blogs || blogs.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: blogs[0], // Pass the first blog to the component
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      notFound: true,
    };
  }
}
