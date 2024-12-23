import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mqpgdianwregtsjhlkae.supabase.co";

//With row level security (RLS) noone can hack our database, but they can do actions we allowed with RLS policies (read data... )
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xcGdkaWFud3JlZ3Rzamhsa2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NzMzNTQsImV4cCI6MjA0NzM0OTM1NH0.FqKmExvpiJOwZ2U5TTItgiKCII9GyF5Wma29QjyncKo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
