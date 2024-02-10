import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://mixslnrlhqsusrwmoodf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1peHNsbnJsaHFzdXNyd21vb2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NjgxMjEsImV4cCI6MjAyMjQ0NDEyMX0.Pt8mLEG1DvFdP0kdZ19WsAeCc8vPJyzRwsAKSjyo4I8"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;