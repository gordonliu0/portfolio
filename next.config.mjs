import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-gfm"],
		rehypePlugins: [
			"rehype-slug",
			[
				"rehype-pretty-code",
				{
					theme: "github-light",
					keepBackground: false,
				},
			],
		],
	},
});

export default withMDX(nextConfig);
