"use client";

import { saveNewPost } from "@/lib/actions/post";
import { useActionState } from "react";
import UpsertPostForm from "./UpsertPostForm";

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined);

  return <UpsertPostForm state={state} formAction={action} />;
};

export default CreatePostContainer;
