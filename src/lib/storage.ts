import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

/** Upload a file to Firebase Storage and return the public download URL. */
export async function uploadFile(file: File, path: string): Promise<string> {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return await getDownloadURL(fileRef);
}

/** Upload a product image. Returns the public URL. */
export async function uploadProductImage(productId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `products/${productId}/${Date.now()}.${ext}`;
  return uploadFile(file, path);
}

/** Upload a banner image. Returns the public URL. */
export async function uploadBanner(slug: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `banners/${slug}-${Date.now()}.${ext}`;
  return uploadFile(file, path);
}

/** Delete a file by its storage path. */
export async function deleteFile(path: string): Promise<void> {
  await deleteObject(ref(storage, path));
}