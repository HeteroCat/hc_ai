import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';

const products = [
    {
        name: 'PromptMarket',
        description: 'PromptMarket 是一个AI提示广场，发现、分享和创建高质量的AI提示词模板。为电商、金融、教育工作者提供专业的提示词资源，提升AI使用效率和创作质量',
        status: 'Live',
        users: '',
        link: 'https://prompt.heterocat.com.cn',
    },
    {
        name: 'StarShadows.AI',
        description: 'StarShadowsAI设计师，利用人工智能技术，为您提供专业的服装、珠宝、美妆服务。让创意与科技完美融合打造独一无二的时尚作品。',
        status: 'Beta',
        users: '',
        link: 'https://ssn.heterocat.com.cn',
    },
    {
        name: 'Supeflow Canvas',
        description: 'Supeflow Canvas 是一个AI智能体系统，可以自动构建和优化AI内容创作流程，为用户提供全流程全自动的AI内容创作服务。',
        status: 'Development',
        users: '',
        link: 'https://superflow.heterocat.com.cn',
    },
    {
        name: 'MicroTouch',
        description: 'MicroTouch 是一个AI搜索智能体，可以自动构建搜索资料和可插拔的AI分析搜索工具，为用户提供全个性全自主全掌握的AI搜索服务。',
        status: 'Development',
        users: '',
        link: 'https://microtouch.heterocat.com.cn',
    }
];

export default function ProductSection() {
    return (
        <section id="products" className="py-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                AI Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product, index) => {
                    const CardWrapper = product.link ? 'a' : 'div';
                    const cardProps = product.link ? { href: product.link, target: '_blank', rel: 'noopener noreferrer' } : {};

                    return (
                        <CardWrapper key={index} {...cardProps} className={product.link ? 'block no-underline' : ''}>
                            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-white overflow-hidden relative group hover:border-purple-500/50 transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Rocket size={100} />
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl text-purple-300">{product.name}</CardTitle>
                                        <Badge variant={product.status === 'Live' ? 'default' : 'secondary'} className={product.status === 'Live' ? 'bg-green-600' : ''}>
                                            {product.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400 mb-4">{product.description}</p>
                                    <div className="text-sm text-gray-500">
                                        Active Users: <span className="text-white font-medium">{product.users}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardWrapper>
                    );
                })}
            </div>
        </section>
    );
}
