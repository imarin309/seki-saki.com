import { works } from "@/data/works";
import WorkDetailClient from "./WorkDetailClient";

export function generateStaticParams() {
  return works.map((work) => ({ id: work.id }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkDetailClient id={id} />;
}
