'use client';

import { useState } from 'react';
import Image from 'next/image';
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

const categories = ['作品', '视频', '智能体', '文章', '证书'];

const videos = [
    {
        title: '《穿越时光的信》',
        embedUrl: 'https://www.youtube.com/embed/d74PhGIwCl4',
        link: 'https://youtu.be/d74PhGIwCl4',
        tags: ['YouTube', 'AI video', 'Short Drama'],
        platform: 'youtube' as const,
    },
    {
        title: '《Shadow Walker》',
        embedUrl: 'https://www.youtube.com/embed/OGkZCy_l2EA',
        link: 'https://youtube.com/shorts/OGkZCy_l2EA',
        tags: ['YouTube','AI music', 'POP'],
        platform: 'youtube' as const,
    },
    {
        title: '《BobCAT》',
        embedUrl: 'https://www.youtube.com/embed/NXCB2IWmp4c',
        link: 'https://youtube.com/shorts/NXCB2IWmp4c',
        tags: ['YouTube', 'AI music', 'Trap EDM'],
        platform: 'youtube' as const,
    },
];

const agents = [
    {
        title: 'AI News',
        description: 'AI新闻智能体，实时追踪全球AI行业动态，为你精选最有价值的AI资讯。',
        link: 'https://www.coze.cn/s/p3_tHTt4UCc/',
        image: '/agents/ai-news.png',
        tags: ['Coze', 'AI News'],
    },
    {
        title: 'HeteroCat AI Clone',
        description: '个人AI分身智能体，基于个人知识库构建，可以代替你回答问题和互动。',
        link: 'https://www.coze.cn/s/koTm1d_0mOE/',
        image: '/agents/heterocat.jpg',
        tags: ['Coze', 'AI Clone'],
    },
    {
        title: 'AI Music Hub',
        description: 'AI音乐工作台，专门用于AI音乐创作，包含多种音乐创作工具。',
        link: 'https://www.coze.cn/s/8-txhAy1YQ8/',
        image: '/agents/aimusichub.png',
        tags: ['Coze', 'AI Music'],
    },
    {
        title: 'AI Poster Studio',
        description: 'AI海报设计工作台，智能生成各类创意海报，提升设计效率。',
        link: 'https://www.coze.cn/s/OsJ0tbhkZes/',
        image: '/agents/AIhuabu.png',
        tags: ['Coze', 'AI Design'],
    },
    {
        title: 'AI Daily Reflection',
        description: 'AI每日反思智能体应用，帮助你进行每日复盘和自我提升。',
        link: 'https://gx6jh4jbmr.coze.site',
        image: '/agents/ai-review.png',
        tags: ['Coze', 'Self-improvement'],
    },
];

const certificates = [
    { src: '/certificate/1.png', alt: '证书 1' },
    { src: '/certificate/2.png', alt: '证书 2' },
    { src: '/certificate/3.png', alt: '证书 3' },
    { src: '/certificate/4.png', alt: '证书 4' },
    { src: '/certificate/5.jpg', alt: '证书 5' },
    { src: '/certificate/6.jpg', alt: '证书 6' },
    { src: '/certificate/7.jpg', alt: '证书 7' },
    { src: '/certificate/8.jpg', alt: '证书 8' },
    { src: '/certificate/9.jpg', alt: '证书 9' },
];

const works: Work[] = [
    {
        title: 'PromptMarket',
        description: 'PromptMarket 是一个AI提示广场，发现、分享和创建高质量的AI提示词模板。为电商、金融、教育工作者提供专业的提示词资源。',
        category: '作品',
        status: 'Live',
        link: 'https://prompt.heterocat.com.cn',
        tags: ['AI', 'Prompt', 'Community'],
    },
    {
        title: 'Muses-System',
        description: 'Muses-System 是一个AI智能体系统，可以自动构建和优化AI内容创作流程，为用户提供全流程全自动的AI内容创作服务。',
        category: '作品',
        status: 'Live',
        link: 'https://musesos.ai-magic.top',
        tags: [ 'AIGC', 'AI Agent', 'Workflow'],
    },
    {
        title: 'MicroTouch',
        description: 'MicroTouch 是一个AI搜索智能体，可以自动构建搜索资料和可插拔的AI分析搜索工具，为用户提供全个性全自主全掌握的AI搜索服务。',
        category: '作品',
        status: 'Development',
        link: 'https://touch.heterocat.com.cn',
        tags: ['AI Search', 'Agent'],
    },
    {
        title: '黄佩林的 AI 成长之路',
        description: '从AI启蒙到提示词工程师，分享我学习AI、参与开源项目、参加比赛获奖的成长故事。发布于Datawhale。',
        category: '文章',
        link: 'https://mp.weixin.qq.com/s/Lj_Wje3B4CkpH6SQT8fd1Q',
        tags: ['AI成长', 'Datawhale', '个人故事'],
    },
    {
        title: '我眼中的ChatGPT',
        description: '介绍ChatGPT的模型原理、想象空间以及误区与乱象，从GPT1到ChatGPT的发展历程和对AI未来的展望。',
        category: '文章',
        link: 'https://juejin.cn/post/7198426159478669373',
        tags: ['ChatGPT', 'GPT', 'AI'],
    },
    {
        title: 'AI爆发的一年2023总结',
        description: '回顾2023年AI的爆发性发展，从GPT到AIGC全面爆发的思考与总结，涵盖文本、图像、音频、视频等领域的AI应用实践。',
        category: '文章',
        link: 'https://juejin.cn/post/7317908960756662306',
        tags: ['AI', 'AIGC', '年度总结'],
    },
    {
        title: '一些更丰富的prompt技巧',
        description: '从GitHub上学习整理的高阶Prompt技巧，涵盖思维链(CoT)、思维树(ToT)、ReAct框架、大模型超参数以及提示词安全等领域。',
        category: '文章',
        link: 'https://juejin.cn/post/7283426137968525312',
        tags: ['Prompt', 'ChatGPT', '技巧'],
    },
];

export default function AIWorksSection() {
    const [activeCategory, setActiveCategory] = useState('作品');

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

            {/* Videos Grid */}
            {activeCategory === '视频' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-white/10 bg-white/5 overflow-hidden hover:border-purple-500/50 transition-all"
                        >
                            {video.embedUrl ? (
                                <div className="aspect-video w-full relative">
                                    <iframe
                                        src={video.embedUrl}
                                        title={video.title}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            ) : (
                                <a
                                    href={video.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center aspect-video w-full bg-gradient-to-br from-red-900/30 to-red-600/10 text-white hover:from-red-900/50 hover:to-red-600/20 transition-all"
                                >
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto mb-2 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                        <p className="text-sm text-gray-300">点击前往 YouTube 观看</p>
                                    </div>
                                </a>
                            )}
                            <div className="p-4">
                                <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {video.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-white/10 text-gray-400 text-xs"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : activeCategory === '智能体' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, index) => (
                        <a
                            key={index}
                            href={agent.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block no-underline"
                        >
                            <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden hover:border-purple-500/50 transition-all group">
                                <div className="aspect-video w-full relative overflow-hidden">
                                    <Image
                                        src={agent.image}
                                        alt={agent.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white font-semibold mb-2">{agent.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{agent.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {agent.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="bg-white/10 text-gray-400 text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : activeCategory === '证书' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all aspect-[3/2]"
                        >
                            <Image
                                src={cert.src}
                                alt={cert.alt}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            ) : filteredWorks.length > 0 ? (
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
