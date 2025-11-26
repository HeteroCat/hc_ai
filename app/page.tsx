'use client';

import dynamic from 'next/dynamic';
import SplashCursor from '@/components/SplashCursor';
import StaggeredMenu from '@/components/StaggeredMenu';
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
    { label: 'TikTok', link: 'https://www.douyin.com/user/MS4wLjABAAAAvBkZt534BdaLk_KUZpdWBa3CzGgL-nvlMNZKWHD054U' },
    { label: 'GitHub', link: 'https://github.com/HeteroCat' },
    { label: 'Bilibili', link: 'https://space.bilibili.com/629561876?spm_id_from=333.33.0.0' },
  ];

  return (
    <main className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* 你的 Hyperspeed 背景 */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed preset="two" />
      </div>

      {/* SplashCursor 放在文字或任意元素上方 */}
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          JasonHuang
        </h1>
        {/* 在文字上叠加光标效果 */}
        <SplashCursor />
      </div>

      <div style={{ height: '100vh', background: '#1a1a1a' }}>
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
