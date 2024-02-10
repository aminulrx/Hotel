import supabase, { supabaseUrl } from "./supabase";
export async function getCabins(){
    let { data: cabins, error } = await supabase
    .from('cabins')
    .select('*')

    if(error){
        console.error(error)
        throw new Error('cabins could not be loaded')
    }
    return cabins;
}

export async function createCabin(newCabin, id){
    //todo check url or not
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","")
    const imagePath = hasImagePath? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
 
    //todo old way
    //? A) CREATE
    // const { data, error } = await supabase
    // .from('cabins')
    // //! .select().single() need to retun data immediately
    // .insert([{...newCabin, image: imagePath}]).select().single();
    //? B) EDIT
    // const { data:renameData} = await supabase
    // .from('cabins')
    // .update({...newCabin, image: imagePath})
    // .eq('id', id)
    // .select()

    //todo new way for reuse
    let query = supabase.from('cabins');
    // A) CREATE
    if(!id)query = query.insert([{...newCabin, image: imagePath}]);
    // B) EDIT
    if(id)query = query.update({...newCabin, image: imagePath}).eq('id', id)

    const { data, error } = await query.select().single();

    //! not need to upload image again if we have path Url
    if(hasImagePath) return data

    if(error){
        console.error(error)
        throw new Error('cabins could not be created')
    }
    const { error:storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)
    if(storageError){
        await supabase.from('cabins').delete().eq('id', data.id)
        console.error(storageError)
        throw new Error('cabins image not be uploaded')
    }

    return data;
}

export async function deleteCabin(id){
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if(error){
        //console.error(error)
        throw new Error('cabins could not be deleted') 
    }
}