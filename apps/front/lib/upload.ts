import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadImage(file: File, folder: string) {
  if (file.size === 0) {
    throw new Error("Empty file.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP are supported.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("The image must not exceed 5MB.");
  }

  const supabase = await createClient();

  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!extension) {
    throw new Error("File format could not be determined.");
  }

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const path = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(path, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

  return {
    path: data.path,
    url: publicUrlData.publicUrl,
  };
}
