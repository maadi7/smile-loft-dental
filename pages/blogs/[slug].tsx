import React from 'react';
import { gql } from 'graphql-request';
import { graphQLClient } from "../../lib/graphqlClient";
import Image from 'next/image';
import { RichText } from "@graphcms/rich-text-react-renderer";
import { calculateReadingTime } from '@/utils/blurhash';

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
      <h1 className='md:text-5xl text-3xl font-bold  font-playfair uppercase mb-10'>{blog.title}</h1>
     
     
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
