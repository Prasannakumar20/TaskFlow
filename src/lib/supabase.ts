
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ehycjlklfndsiiaafqty.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeWNqbGtsZm5kc2lpYWFmcXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTEwMjksImV4cCI6MjA2NjY4NzAyOX0.IgKkDXlmMQSSbBJOVrX5YS3qcaOz38ZpgXStkiZjUbY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
