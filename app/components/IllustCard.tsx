"use client";

import Image from "next/image";
import Link from "next/link";
import type { Illust } from "@/data/illusts";

interface Props {
  work: Illust;
}

export default function IllustCard({ work }: Props) {
  return (
    <Link href={`/illust/${work.id}`} className="group block">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-gray-900">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className={`object-cover duration-500 ${
            work.image2
              ? "transition-opacity group-hover:opacity-0"
              : "transition-transform group-hover:scale-105"
          }`}
        />
        {work.image2 && (
          <Image
            src={work.image2}
            alt={work.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="whitespace-pre-line text-sm text-gray-300">
            {work.description}
          </p>
        </div>
      </div>
      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
        {work.title}
      </h3>
      <p className="text-gray-500">
        {work.category} {work.date}
      </p>
    </Link>
  );
}
