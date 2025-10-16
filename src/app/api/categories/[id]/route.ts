import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  const { params } = context as { params: { id: string } };
  const { data, error } = await supabase
    .from("in_categories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  const { params } = context as { params: { id: string } };
  const body = await request.json();

  const { data, error } = await supabase
    .from("in_categories")
    .update(body)
    .eq("id", params.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}

export async function DELETE(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  const { params } = context as { params: { id: string } };
  const { error } = await supabase
    .from("in_categories")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
