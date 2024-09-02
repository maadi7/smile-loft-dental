import { fileURLToPath } from 'url';
import path from 'path';

export default {
  images: {
    domains: ["res.cloudinary.com", "media.graphassets.com", "media.graphcms.com", "ap-south-1.graphassets.com"],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
};
