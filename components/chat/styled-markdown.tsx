import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface StyledMarkdownProps {
	content: string;
}

const StyledMarkdown: React.FC<StyledMarkdownProps> = ({ content }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-headings:text-primary prose-a:text-blue-600 prose-blockquote:border-l-4 prose-blockquote:border-foreground/30"
			components={{
				h1: ({ node, ...props }) => (
					<h1 className="text-3xl font-bold my-4" {...props} />
				),
				h2: ({ node, ...props }) => (
					<h2 className="text-2xl font-bold my-3" {...props} />
				),
				h3: ({ node, ...props }) => (
					<h3 className="text-xl font-semibold my-2" {...props} />
				),
				h4: ({ node, ...props }) => (
					<h4 className="text-lg font-semibold my-2" {...props} />
				),
				h5: ({ node, ...props }) => (
					<h5 className="text-base font-semibold my-1" {...props} />
				),
				h6: ({ node, ...props }) => (
					<h6 className="text-sm font-semibold my-1" {...props} />
				),
				p: ({ node, ...props }) => (
					<p className="text-base leading-relaxed my-2" {...props} />
				),
				a: ({ node, ...props }) => (
					<a className="text-primary hover:underline" {...props} />
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="border-l-4 pl-4 italic text-gray-600 my-4"
						{...props}
					/>
				),
				ul: ({ node, ...props }) => (
					<ul className="list-disc pl-6 my-2" {...props} />
				),
				ol: ({ node, ...props }) => (
					<ol className="list-decimal pl-6 my-2" {...props} />
				),
				code: ({ node, ...props }) => {
					const isInline = node!.tagName === "code";
					const language = props.className
						? props.className.replace("language-", "")
						: "plaintext";
					return isInline ? (
						<code
							className="bg-foreground/5 text-primary px-1 py-0.5 rounded"
							{...props}
						/>
					) : (
						<div className="my-2">
							<div className="text-xs font-semibold text-foreground/40 mb-1">
								{language}
							</div>
							<pre className="bg-foreground/5 text-foreground p-2 rounded block overflow-auto">
								<code
									className={`language-${language}`}
									{...props}
								>
									{props.children}
								</code>
							</pre>
						</div>
					);
				},
				pre: ({ node, ...props }) => (
					<pre
						className="bg-foreground/5 text-foreground p-4 rounded-lg overflow-auto"
						{...props}
					/>
				),
				hr: ({ node, ...props }) => (
					<hr
						className="border-t-2 border-gray-300 my-4"
						{...props}
					/>
				),
				strong: ({ node, ...props }) => (
					<strong className="font-semibold" {...props} />
				),
				em: ({ node, ...props }) => (
					<em className="italic" {...props} />
				),
				del: ({ node, ...props }) => (
					<del className="line-through text-gray-500" {...props} />
				),
				table: ({ node, ...props }) => (
					<table className="table-auto w-full my-4" {...props} />
				),
				thead: ({ node, ...props }) => (
					<thead className="bg-gray-200" {...props} />
				),
				tbody: ({ node, ...props }) => (
					<tbody className="bg-white" {...props} />
				),
				tr: ({ node, ...props }) => (
					<tr className="border-t border-gray-300" {...props} />
				),
				th: ({ node, ...props }) => (
					<th
						className="px-4 py-2 text-left font-semibold"
						{...props}
					/>
				),
				td: ({ node, ...props }) => (
					<td className="px-4 py-2" {...props} />
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
};

export default StyledMarkdown;
