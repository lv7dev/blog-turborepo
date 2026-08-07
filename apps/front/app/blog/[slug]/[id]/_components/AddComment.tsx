"use client";

import SubmitButton from "@/components/SubmitButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { saveComment } from "@/lib/actions/comment";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { useActionState, useEffect, useState } from "react";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);
  const [open, setOpen] = useState(false);
  const { className, postId, refetch, user } = props;

  useEffect(() => {
    if (state?.message)
      toast.add({
        title: state?.ok ? "Success" : "Oops!",
        description: state?.message,
      });

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (typeof state?.open === "boolean") {
      const nextOpen = state.open;
      timeoutId = setTimeout(() => setOpen(nextOpen), 0);
    }

    if (state?.ok) refetch();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [state, refetch]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-blue-500 px-4 py-2 text-white rounded-xl my-2 cursor-pointer">
        Leave Your Comment
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={action} className={cn(className)}>
          <input hidden name="postId" defaultValue={postId} />
          <Label htmlFor="comment">Your Comment</Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">{user.name}</span>
          </p>
          <SubmitButton className="mt-2">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
