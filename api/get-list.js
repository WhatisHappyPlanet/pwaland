const PUBLIC_SUPABASE_URL = "https://fdbyzxxoixqrynwvajfo.supabase.co"
const PUBLIC_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkYnl6eHhvaXhxcnlud3ZhamZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE1ODg4MjUsImV4cCI6MTk3NzE2NDgyNX0.8X_u8aRq6l3MzOVW5yvd8BNxyglyzrqnQbG6MEkfMec"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

export default async function handler(req, res) {



  let { data, error } = await supabase.from('pwaland').select();

  console.log(data);
  
  if(error) {
    res.status(500).json({
      message: 'query fail',
      "error-message": error
    });
  } else {
    res.status(200).json({data});
  }

}
