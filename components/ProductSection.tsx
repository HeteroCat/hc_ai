import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';

const products = [
    {
        name: 'AI Writing Assistant',
        description: 'A browser extension that helps users draft and edit content using advanced language models.',
        status: 'Live',
        users: '10k+',
    },
    {
        name: 'CodeGenius',
        description: 'An IDE plugin for intelligent code completion and refactoring suggestions.',
        status: 'Beta',
        users: '500+',
    },
    {
        name: 'DataInsight',
        description: 'Automated data analysis tool for small businesses to visualize trends.',
        status: 'Development',
        users: '-',
    },
];

export default function ProductSection() {
    return (
        <section className="py-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <Card key={index} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-white overflow-hidden relative group">
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
                ))}
            </div>
        </section>
    );
}
