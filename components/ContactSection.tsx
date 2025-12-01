import { Button } from '@/components/ui/button';
import { siXiaohongshu, siTiktok, siBilibili } from 'simple-icons';

export default function ContactSection() {
    return (
        <section className="py-12 w-full text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch/联系方式</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="flex justify-center gap-6">
                {/* RedBook - 小红书 */}
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 hover:bg-[#FF2442]/10 hover:border-[#FF2442]/30 transition-all" asChild>
                    <a href="https://www.xiaohongshu.com/user/profile/5f43082c00000000010079c8?xsec_token=YB2_yPn0gUQnikW-PCbURMzcIXeLuikSFLytmYFOQBMBg%3D&xsec_source=app_share&xhsshare=CopyLink&shareRedId=N0w2MzM9Nkw2NzUyOTgwNjY0OTc7PElB&apptime=1764504808&share_id=caea373b46684abca09ee6dd3bee09a4&share_channel=copy_link" target="_blank" rel="noopener noreferrer" aria-label="RedBook">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill={`#${siXiaohongshu.hex}`}>
                            <path d={siXiaohongshu.path} />
                        </svg>
                    </a>
                </Button>

                {/* DouYin - 抖音 */}
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 bg-white hover:bg-white/90 transition-all" asChild>
                    <a href="https://www.douyin.com/user/MS4wLjABAAAAvBkZt534BdaLk_KUZpdWBa3CzGgL-nvlMNZKWHD054U" target="_blank" rel="noopener noreferrer" aria-label="DouYin">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#000000">
                            <path d={siTiktok.path} />
                        </svg>
                    </a>
                </Button>

                {/* Bilibili - B站 */}
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 hover:bg-[#FB7299]/10 hover:border-[#FB7299]/30 transition-all" asChild>
                    <a href="https://space.bilibili.com/629561876?spm_id_from=333.33.0.0" target="_blank" rel="noopener noreferrer" aria-label="Bilibili">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill={`#${siBilibili.hex}`}>
                            <path d={siBilibili.path} />
                        </svg>
                    </a>
                </Button>
            </div>

            <footer className="mt-16 text-sm text-gray-600">
                © {new Date().getFullYear()} JasonHuang. All rights reserved.
            </footer>
        </section>
    );
}
