'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface Work {
    title: string;
    description: string;
    category: string;
    status?: string;
    link?: string;
    image?: string;
    tags?: string[];
}

const categories = ['产品', '视频', '智能体', '文章', '证书'];

const works: Work[] = [
    {
        title: 'PromptMarket',
        description: 'PromptMarket 是一个AI提示广场，发现、分享和创建高质量的AI提示词模板。为电商、金融、教育工作者提供专业的提示词资源，提升AI使用效率和创作质量',
        category: '产品',
        status: 'Live',
        link: 'https://prompt.heterocat.com.cn',
        tags: ['AI', 'Prompt', 'SaaS'],
    },
    {
        title: 'Supeflow Canvas',
        description: 'Supeflow Canvas 是一个AI智能体系统，可以自动构建和优化AI内容创作流程，为用户提供全流程全自动的AI内容创作服务。',
        category: '产品',
        status: 'Development',
        link: 'https://superflow.heterocat.com.cn',
        tags: ['AI Agent', 'Workflow'],
    },
    {
        title: 'MicroTouch',
        description: 'MicroTouch 是一个AI搜索智能体，可以自动构建搜索资料和可插拔的AI分析搜索工具，为用户提供全个性全自主全掌握的AI搜索服务。',
        category: '产品',
        status: 'Development',
        link: 'https://touch.heterocat.com.cn',
        tags: ['AI Search', 'Agent'],
    },
];

export default function AIWorksSection() {
    const [activeCategory, setActiveCategory] = useState('产品');

    const filteredWorks = works.filter((w) => w.category === activeCategory);

    return (
        <section id="works" className="py-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                AI Works
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant="ghost"
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-full px-5 transition-all ${
                            activeCategory === cat
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Works Grid */}
            {filteredWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorks.map((work, index) => {
                        const CardWrapper = work.link ? 'a' : 'div';
                        const cardProps = work.link
                            ? { href: work.link, target: '_blank' as const, rel: 'noopener noreferrer' }
                            : {};

                        return (
                            <CardWrapper
                                key={index}
                                {...cardProps}
                                className={work.link ? 'block no-underline' : ''}
                            >
                                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-white overflow-hidden relative group hover:border-purple-500/50 transition-all cursor-pointer">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Rocket size={100} />
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl text-purple-300">
                                                {work.title}
                                            </CardTitle>
                                            {work.status && (
                                                <Badge
                                                    variant={work.status === 'Live' ? 'default' : 'secondary'}
                                                    className={work.status === 'Live' ? 'bg-green-600' : ''}
                                                >
                                                    {work.status}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 mb-3">{work.description}</p>
                                        {work.tags && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {work.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="bg-white/10 text-gray-400 text-xs"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </CardWrapper>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-lg">暂无{activeCategory}类作品，敬请期待</p>
                </div>
            )}
        </section>
    );
}
