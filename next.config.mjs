import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          keepBackground: false,
          theme: "github-light",
        },
      ],
    ],
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
