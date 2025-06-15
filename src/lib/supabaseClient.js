
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mjiklgotgehmotdcjxpk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qaWtsZ290Z2VobW90ZGNqeHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTcyMTUsImV4cCI6MjA2NTQ3MzIxNX0.drA2W1gSwCXEEnPfMxoKwonVMZMs2uUn9jU5xBJVRhI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
