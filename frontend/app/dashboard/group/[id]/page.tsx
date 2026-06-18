import { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import GroupClient from "./GroupClient"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  if (!supabase) {
    return {
      title: "Group Detail — JointSave",
    }
  }

  try {
    const { data: pool } = await supabase
      .from("pools")
      .select("name")
      .eq("id", id)
      .single()

    if (pool?.name) {
      return {
        title: `${pool.name} — JointSave`,
      }
    }
  } catch (err) {
    console.error("Error generating metadata:", err)
  }

  return {
    title: "Group Detail — JointSave",
  }
}

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  return <GroupClient params={params} />
}

