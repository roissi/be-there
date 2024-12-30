import { createClient } from '@supabase/supabase-js';

// URL et clé Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Créer un client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
