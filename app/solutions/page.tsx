import Link from "next/link";

const solutionGroups = [
  {
    title: "Education",
    description: "Move from confusion to progress with guided learning tools.",
    items: [
      { name: "School Project Guides", href: "/venture/school-projects" },
      { name: "Exam Prep Preview", href: "/venture/exam-prep" },
    ],
  },
  {
    title: "Finance & SME Ops",
    description: "Reduce operational guesswork with simple, practical helpers.",
    items: [
      { name: "GST / HSN Helper", href: "/venture/gst-helper" },
      { name: "Student Finance Mentor (Future)", href: "/studio" },
    ],
  },
  {
    title: "Career",
    description: "Improve discoverability and clarity for job-seeking outcomes.",
    items: [{ name: "ATS Resume Checker", href: "/venture/ats-resume" }],
  },
];

export default function SolutionsPage() {
  return (
    <div className="space-y-10 pb-16">
      <section>
        <p className="eyebrow">Problem-led funnels</p>
        <h1>Start from the problem, not from the tool.</h1>
      </section>

      <div className="space-y-6">
        {solutionGroups.map((group) => (
          <section key={group.title} className="card">
            <h2>{group.title}</h2>
            <p>{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {group.items.map((item) => (
                <Link key={item.name} href={item.href} className="btn btn-secondary">
                  Start now · {item.name}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
