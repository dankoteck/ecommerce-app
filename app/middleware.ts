import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // TODO: add <Database> generic here
  const supabase = createMiddlewareSupabaseClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
