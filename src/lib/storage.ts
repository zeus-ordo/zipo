import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { v4 as uuidv4 } from 'uuid';

let supabase: SupabaseClient | null = null;

if (config.storage.url && config.storage.key) {
  supabase = createClient(config.storage.url, config.storage.key);
}

export interface UploadResult {
  url: string;
  key: string;
}

export async function uploadProductImage(
  tenantId: string,
  productId: string,
  base64Data: string,
  contentType: string = 'image/jpeg'
): Promise<UploadResult> {
  if (!supabase) {
    throw new Error('Storage not configured');
  }

  const ext = contentType.split('/')[1] || 'jpg';
  const fileName = `${uuidv4()}.${ext}`;
  const key = `products/${tenantId}/${productId}/${fileName}`;

  const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');

  const { data, error } = await supabase.storage.from('products').upload(key, buffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const path = typeof data === 'string' ? data : data?.path;
  if (!path) {
    throw new Error('Upload failed: no path returned');
  }

  const { data: urlData } = supabase.storage.from('products').getPublicUrl(path);

  return {
    url: urlData.publicUrl,
    key: path,
  };
}

export async function deleteProductImage(key: string): Promise<void> {
  if (!supabase) return;

  await supabase.storage.from('products').remove([key]);
}

export function getImageUrl(key: string): string {
  if (!supabase) return '';
  const { data } = supabase.storage.from('products').getPublicUrl(key);
  return data.publicUrl;
}
