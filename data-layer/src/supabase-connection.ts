import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

let supabaseClient: SupabaseClient | null = null;
let connected = false;

const config = {
  url: process.env.SUPABASE_URL || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
};

/**
 * Connect to Supabase (validates config and performs a test query)
 */
export async function connectToSupabase(): Promise<SupabaseClient> {
  if (supabaseClient && connected) {
    return supabaseClient;
  }

  if (!config.url || !config.serviceRoleKey) {
    throw new Error(
      "Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env",
    );
  }

  console.log("\n=== Supabase Connection Configuration ===");
  console.log(`URL: ${config.url}`);
  console.log("=========================================\n");

  supabaseClient = createClient(config.url, config.serviceRoleKey, {
    auth: { persistSession: false },
  });

  // Verify connection with a lightweight query
  const { error } = await supabaseClient.from("users").select("id").limit(1);
  if (error && error.code !== "PGRST116") {
    throw new Error(`Supabase connection failed: ${error.message}`);
  }

  connected = true;
  console.log("✅ Supabase connection established successfully");
  return supabaseClient;
}

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    throw new Error(
      "Supabase client not initialized. Call connectToSupabase() first.",
    );
  }
  return supabaseClient;
}

export async function closeSupabase(): Promise<void> {
  supabaseClient = null;
  connected = false;
  console.log("Supabase client closed");
}

export function isConnected(): boolean {
  return connected;
}
