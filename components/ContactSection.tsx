import { Button } from '@/components/ui/button';
import { Github, Mail, Twitter, Linkedin } from 'lucide-react';

export default function ContactSection() {
    return (
        <section className="py-12 w-full text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="flex justify-center gap-6">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 hover:bg-white/10 hover:text-white" asChild>
                    <a href="https://github.com/HeteroCat" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-5 w-5" />
                    </a>
                </Button>

                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 hover:bg-white/10 hover:text-white" asChild>
                    <a href="mailto:contact@jasonhuang.ai" aria-label="Email">
                        <Mail className="h-5 w-5" />
                    </a>
                </Button>

                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 hover:bg-white/10 hover:text-white" asChild>
                    <a href="https://zhuanlan.zhihu.com/p/706412327" target="_blank" rel="noopener noreferrer" aria-label="Zhihu">
                        {/* Using a generic icon for Zhihu as Lucide doesn't have it, or could import a custom SVG */}
                        <span className="font-bold text-lg">知</span>
                    </a>
                </Button>
            </div>

            <footer className="mt-16 text-sm text-gray-600">
                © {new Date().getFullYear()} JasonHuang. All rights reserved.
            </footer>
        </section>
    );
}
