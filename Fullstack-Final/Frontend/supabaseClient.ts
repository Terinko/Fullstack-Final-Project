import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mebapgnohqaubuvbeybi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lYmFwZ25vaHFhdWJ1dmJleWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODkxODcsImV4cCI6MjA3ODg2NTE4N30.B9VLKz6jB35QTByESTqvxX3zaE5N-KqvJFhOYGQTTA0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
