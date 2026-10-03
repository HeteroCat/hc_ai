import Image from 'next/image';
import localFont from 'next/font/local';
import { Badge } from '@/components/ui/badge';
import avatar from '@/public/Jason-img.jpeg';

const signatureFont = localFont({
    src: '../app/fonts/Allura-Regular.ttf',
    weight: '400',
    display: 'swap',
});

export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 py-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
                <Image
                    src={avatar}
                    alt="JasonHuang"
                    fill
                    className="object-cover rounded-full border-4 border-white/10 shadow-2xl"
                    priority
                />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-2xl">
                <h1 className={`${signatureFont.className} hero-name text-6xl md:text-7xl font-normal`}>
                    JasonHuang
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-300 font-medium">
                    AI 工程师 & AI 导演
                </h2>

                <p className="text-lg text-gray-400 leading-relaxed">
                    专注于构建AI智能产品和效果，探索人工智能的奥秘。
                    致力于通过前沿AI技术为用户和观众提供无与伦比的奇妙AI体验。
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                    <Badge variant="secondary" className="px-3 py-1 text-sm">AI Researcher</Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">Product Builder</Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">Open Source Contributor</Badge>
                </div>

                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-400">Honors & Awards</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm text-left">
                        <li>现服装跨境电商AI工程师，Base 深圳</li>
                        <li>百度大模型挑战赛最佳创意奖、阿里百炼智能体签约作者、AI 微电影黑客松亚军</li>
                        <li>Datewhale意向成员、WaytoAGI超创、稀土掘金社区AI人气作者、上海交通大学AI访谈嘉宾</li>
                        <li>《ChatGPT原理与应用开发》共创作者、知名开源项目《Hello-Agents》核心贡献者之一</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
