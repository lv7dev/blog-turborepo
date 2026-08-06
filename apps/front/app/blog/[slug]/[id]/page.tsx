import { fetchPostById } from "@/lib/actions/post";
import Image from "next/image";
import NoImage from "@/public/no-image.png";
// import DOMPurify from "dompurify";
import SanitizedContent from "./_components/SanitizedContent";
// import Comments from "./_components/comments";
// import { getSession } from "@/lib/session";
// import Like from "./_components/like";

type Props = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  //   const session = await getSession();

  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="relative w-80 h-60">
        <Image
          src={post.thumbnail ?? NoImage}
          alt={post.title}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
      </div>

      <SanitizedContent content={post.content} />

      {/* <Like postId={post.id} user={session?.user} /> */}
      {/* Todo: Put the Post Comments Here */}
      {/* <Comments user={session?.user} postId={post.id} /> */}
    </main>
  );
};

export default PostPage;
