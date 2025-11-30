'use client';

import dynamic from 'next/dynamic';
import SplashCursor from '@/components/SplashCursor';
import StaggeredMenu from '@/components/StaggeredMenu';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';
import ProductSection from '@/components/ProductSection';
import SkillSection from '@/components/SkillSection';
import ContactSection from '@/components/ContactSection';
import { Separator } from '@/components/ui/separator';

const Hyperspeed = dynamic(() => import('@/components/Hyperspeed'), {
  ssr: false,
});

export default function Home() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
  ];

  const socialItems = [
    { label: 'RedBook', link: 'https://www.xiaohongshu.com/user/profile/5f43082c00000000010079c8?xsec_token=YB2_yPn0gUQnikW-PCbURMzcIXeLuikSFLytmYFOQBMBg%3D&xsec_source=app_share&xhsshare=CopyLink&shareRedId=N0w2MzM9Nkw2NzUyOTgwNjY0OTc7PklB&apptime=1764504808&share_id=caea373b46684abca09ee6dd3bee09a4&share_channel=copy_link' },
    { label: 'DouYin', link: 'https://www.douyin.com/user/MS4wLjABAAAAvBkZt534BdaLk_KUZpdWBa3CzGgL-nvlMNZKWHD054U' },
    { label: 'Bilibili', link: 'https://space.bilibili.com/629561876?spm_id_from=333.33.0.0' },
    { label: 'X', link: "https://x.com/HeteroCat0011?t=otYpxGFel3LaTvMhQsVUCw&s=09" },
  ];

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Hyperspeed preset="two" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-16">
        <SplashCursor />

        <HeroSection />
        <Separator className="bg-white/10" />
        <ProjectSection />
        <Separator className="bg-white/10" />
        <ProductSection />
        <Separator className="bg-white/10" />
        <SkillSection />
        <Separator className="bg-white/10" />
        <ContactSection />
      </div>

      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', zIndex: 50 }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
          accentColor="#FACC15"
          isFixed={true}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </main>
  );
}
