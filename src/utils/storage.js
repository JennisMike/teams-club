import { supabase } from '../supabaseClient';

export const uploadProductImage = async (file, productId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload the file to the 'product-images' bucket
    const { data, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};

export const getProductImageUrl = (path) => {
  if (!path) return null;
  
  // If it's already a full URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Otherwise, assume it's a path in the storage bucket
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(path);
    
  return publicUrl;
};
