import { Badge } from '@/components/ui/badge';

const skills = {
    "AI & Machine Learning": [
        "Large Language Models", "PyTorch", "TensorFlow", "Computer Vision", "NLP", "LangChain", "RAG"
    ],
    "Frontend Development": [
        "React", "Next.js", "TypeScript", "TailwindCSS", "Three.js", "Framer Motion"
    ],
    "Backend & Cloud": [
        "Python", "Node.js", "FastAPI", "PostgreSQL", "Docker", "AWS", "Vercel"
    ],
    "Tools & Others": [
        "Git", "Linux", "Streamlit", "Figma", "Agile Methodologies"
    ]
};

export default function SkillSection() {
    return (
        <section className="py-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200 border-b border-white/10 pb-2">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="bg-white/10 hover:bg-white/20 text-gray-300 transition-colors cursor-default"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
