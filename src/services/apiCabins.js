import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

/**
 * @param newCabin cabin to be created OR cabin to be updated
 * @param id for updating sessions
 */
export async function createORUpdateCabin(newCabin, id) {
  console.log(newCabin);

  //Image has already been uploaded for this cabin (for updating session)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  /* / => folder */
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create a cabin
  let query = supabase.from("cabins");

  // a) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // b) UPDATE
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    toast("Cabin image could not be uploaded and the cabin was not created", {
      icon: "⚠️",
    });
    console.error(storageError);
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
