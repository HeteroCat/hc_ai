import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: 'HeteroCat',
        description: 'A Next.js based portfolio and playground for testing new AI interactions and 3D web technologies.',
        tags: ['Next.js', 'React Three Fiber', 'TailwindCSS', 'AI Integration'],
        link: 'https://github.com/HeteroCat',
        github: 'https://github.com/HeteroCat',
    },
    {
        title: 'Jason\'s AI Fantasy World',
        description: 'An interactive Streamlit application showcasing various AI capabilities and demos.',
        tags: ['Streamlit', 'Python', 'LLM', 'Generative AI'],
        link: 'https://jasonai.streamlit.app/',
        github: '',
    },
    {
        title: 'AI Knowledge Base',
        description: 'A comprehensive collection of AI articles and tutorials shared on Zhihu.',
        tags: ['Technical Writing', 'Knowledge Sharing', 'Community'],
        link: 'https://zhuanlan.zhihu.com/p/706412327',
        github: '',
    },
];

export default function ProjectSection() {
    return (
        <section className="py-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors duration-300">
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
                                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> Code
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
                ))}
            </div>
        </section>
    );
}
