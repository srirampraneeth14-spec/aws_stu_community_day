import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://rvyqhvljgegtqboihbsu.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXFodmxqZ2VndHFib2loYnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NzIxMzEsImV4cCI6MjEwNDI0ODEzMX0._kiV88xqfIwpf0R-EmebhifawKIM1xfTEEbI-CPMqxY";

const envUrl = (import.meta.env.VITE_SUPABASE_URL as string)?.trim().replace(/\/+$/, "");
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string)?.trim();

const supabaseUrl =
  envUrl && !envUrl.includes("YOUR_PROJECT") ? envUrl : DEFAULT_SUPABASE_URL;
const supabaseAnonKey =
  envKey && !envKey.includes("your-anon-key") ? envKey : DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
