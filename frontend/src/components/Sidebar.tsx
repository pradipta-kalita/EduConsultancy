import {Link} from "@tanstack/react-router";


const staffPicks = [
    {
        author: 'Mark Shrime, MD, PhD',
        title: 'The dumbest decision I ever made (and the Nobel Prize that explains it)',
        date: 'Nov 21'
    },
    {
        author: 'Isabelle Andrews',
        title: 'Everyone wins when product managers work in the open',
        date: 'Nov 12'
    }
]

const topics = [
    'Angular',
    'Technology',
    'Make Money Online',
    'AWS',
    'Java',
    'Business',
    'UI'
]


export default function Sidebar({ className = '' }: Readonly<{ className?: string }>) {
    return (
        <aside className={className}>
            <div className="space-y-8">
                <section>
                    <h2 className="font-bold text-black mb-4">Staff Picks</h2>
                    <div className="space-y-4">
                        {staffPicks.map((pick, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="/images/testimonials/testimonials01.png"
                                        alt={pick.author}
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm">{pick.author}</span>
                                </div>
                                <Link to="/" className="block font-bold text-black hover:text-gray-700">
                                    {pick.title}
                                </Link>
                                <time className="text-sm text-gray-600">{pick.date}</time>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="font-bold text-black mb-4">Recommended topics</h2>
                    <div className="flex flex-wrap gap-2">
                        {topics.map((topic) => (
                            <Link
                                key={topic}
                                href="#"
                                className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                {topic}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </aside>
    )
}

