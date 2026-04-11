'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    image: string;
    repo: string;
}

const projects: Project[] = [
    {
        title: 'Hello-Agents #TOP1',
        description: '📚 《从零开始构建智能体》——从零开始的智能体原理与实践教程.从基础理论到实际应用，全面掌握智能体系统的设计与实现，Datawhale 社区的系统性智能体学习教程',
        tags: ['Python', 'OpenAI', 'LLM', 'Agents', "multiagent"],
        link: 'https://traehello-agents-aicookbookt5mr.vercel.app',
        github: 'https://github.com/datawhalechina/hello-agents',
        image: '/hello-agents.png',
        repo: 'datawhalechina/hello-agents',
    },
    {
        title: 'Hugging-LLM  蝴蝶书',
        description: 'HuggingLLM, Hugging Future.蝴蝶书是一个介绍 ChatGPT 原理、使用和应用的项目，降低使用门槛，让更多感兴趣的非NLP或算法专业人士能够无障碍使用LLM创造价值。',
        tags: ['Jupyter Notebook', 'OpenAI', 'Qwen', 'LLM'],
        link: 'https://datawhalechina.github.io/hugging-llm/#/',
        github: 'https://github.com/datawhalechina/hugging-llm',
        image: '/hugging-llm.jpeg',
        repo: 'datawhalechina/hugging-llm',
    },
    {
        title: 'AsyncTrader  最佳创意奖',
        description: '2023年百度大模型应用创新挑战赛最佳创意作品奖：用 ChatGPT 自动构建量化交易系统听起来很酷，不是吗？本项目使用 ChatGPT 自动编写和回测定量交易策略，并提供文档问答功能。',
        tags: ['Quant', 'OpenAI', 'Freqtrade', 'Vnpy', 'Langchain'],
        link: 'https://github.com/HeteroCat/AsyncTrader',
        github: 'https://github.com/HeteroCat/AsyncTrader',
        image: '/AsyncTrader.png',
        repo: 'HeteroCat/AsyncTrader',
    },
];

async function fetchStarCount(repo: string): Promise<number | null> {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.stargazers_count;
    } catch {
        return null;
    }
}

function ProjectCard({ project }: { project: Project }) {
    const [stars, setStars] = useState<number | null>(null);

    useEffect(() => {
        fetchStarCount(project.repo).then(setStars);
    }, [project.repo]);

    return (
        <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors duration-300 overflow-hidden">
            {project.image && (
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-xl text-blue-300">{project.title}</CardTitle>
                <CardDescription className="text-gray-400">
                    {project.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/20 text-gray-300">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {project.github && (
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            <span>GitHub</span>
                            {stars !== null && (
                                <span className="flex items-center gap-1 text-yellow-400">
                                    <Star className="h-3 w-3 fill-yellow-400" />
                                    {stars.toLocaleString()}
                                </span>
                            )}
                        </a>
                    </Button>
                )}
                {project.link && (
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 ml-auto" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> View Project
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default function ProjectSection() {
    return (
        <section id="projects" className="py-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Open-Source Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
}
