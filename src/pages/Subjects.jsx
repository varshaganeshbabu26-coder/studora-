import { Atom, BookOpen, Dna, FlaskConical, Globe2, Languages, Sigma } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import Card from '../components/Card'
import mockSubjects from '../data/mockSubjects'

const iconMap = {
	Biology: Dna,
	Calculus: Sigma,
	'World History': Globe2,
	'Organic Chemistry': FlaskConical,
	Spanish: Languages,
	Physics: Atom,
}

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function Subjects() {
	return (
		<section className="mx-auto max-w-6xl">
			<div className="mb-6 flex items-end justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFFFFF]">Learning map</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">Your subjects</h1>
				</div>
				<Badge variant="primary">{mockSubjects.length} subjects</Badge>
			</div>

			<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
				{mockSubjects.map((subject) => {
					const Icon = iconMap[subject.name] || BookOpen

					return (
						<Link key={subject.name} to={`/app/subjects/${slugify(subject.name)}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
							<Card className="h-full border-[#C0C0C0] bg-[#000000] p-5 transition duration-200 hover:border-[#C0C0C0]">
								<div className="flex items-start justify-between gap-4">
									<div className="rounded-xl border border-[#C0C0C0] bg-[#000000] p-3">
										<Icon className="h-5 w-5 text-[#C0C0C0]" />
									</div>
									<span className="text-sm font-semibold text-[#FFFFFF]">{subject.progress}%</span>
								</div>
								<h2 className="mt-5 text-xl font-bold text-[#FFFFFF]">{subject.name}</h2>
								<div className="mt-4 h-2 overflow-hidden rounded-full border border-[#C0C0C0] bg-[#000000]">
									<div className="h-full bg-[#C0C0C0]" style={{ width: `${subject.progress}%` }} />
								</div>
								<p className="mt-3 text-sm text-[#FFFFFF]">Keep building your study rhythm.</p>
							</Card>
						</Link>
					)
				})}
			</div>
		</section>
	)
}
