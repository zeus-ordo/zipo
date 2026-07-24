"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = uploadProductImage;
exports.deleteProductImage = deleteProductImage;
exports.getImageUrl = getImageUrl;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("../config");
const uuid_1 = require("uuid");
let supabase = null;
if (config_1.config.storage.url && config_1.config.storage.key) {
    supabase = (0, supabase_js_1.createClient)(config_1.config.storage.url, config_1.config.storage.key);
}
async function uploadProductImage(tenantId, productId, base64Data, contentType = 'image/jpeg') {
    if (!supabase) {
        throw new Error('Storage not configured');
    }
    const ext = contentType.split('/')[1] || 'jpg';
    const fileName = `${(0, uuid_1.v4)()}.${ext}`;
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
async function deleteProductImage(key) {
    if (!supabase)
        return;
    await supabase.storage.from('products').remove([key]);
}
function getImageUrl(key) {
    if (!supabase)
        return '';
    const { data } = supabase.storage.from('products').getPublicUrl(key);
    return data.publicUrl;
}
