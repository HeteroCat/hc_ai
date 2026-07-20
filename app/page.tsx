import { AboutJason } from "@/components/home/about-jason"
import { HomeIntro } from "@/components/home/home-intro"
import { SayHello } from "@/components/home/say-hello"
import { SelectedNotes } from "@/components/home/selected-notes"
import { SelectedProjects } from "@/components/home/selected-projects"
import { getSelectedNotes, getSelectedProjects } from "@/lib/home-content"
import { articleItems, projectItems, socialLinks } from "@/lib/site-content"

const selectedProjects = getSelectedProjects(projectItems)
const selectedNotes = getSelectedNotes(articleItems)
const xiaohongshuHref = socialLinks.find((item) => item.title === "小红书")?.href ?? "/about"

export default function Home() {
  return (
    <main>
      <HomeIntro />
      <SelectedProjects items={selectedProjects} />
      <SelectedNotes items={selectedNotes} />
      <AboutJason />
      <SayHello xiaohongshuHref={xiaohongshuHref} />
    </main>
  )
}
