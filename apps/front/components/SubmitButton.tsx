"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ButtonProps } from "@base-ui/react";

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={"bg-blue-500"}
      type="submit"
      aria-disabled={pending}
      {...props}
    >
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
};

export default SubmitButton;
