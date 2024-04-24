"use client";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  github_url: string;
  preview_url: string;
  difficulty: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const getData = async () => {
    const res = await fetch("./data.json");
    const data = await res.json();
    setProjects(data.projects);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="mt-10 max-w-screen-xl mx-auto  lg:px-20">
      <h1 className="text-5xl text-center">
        PROJECTS DE
        <Link href="https://devchallenges.io/" target="_blank">
          <strong> devchallenges</strong>
        </Link>
      </h1>
      <div className="grid grid-cols-1 md:lg:grid-cols-2 lg:grid-cols-3  py-10 gap-10">
        {projects.map((project) => (
          <Card
            key={project.id}
            image={project.image_url}
            title={project.name}
            github_url={project.github_url}
            slug={project.slug}
          />
        ))}
      </div>
    </main>
  );
}
