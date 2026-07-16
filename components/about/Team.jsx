"use client";

import ScrollReveal from "../ScrollReveal";

const team1 =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80";
const team2 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80";
const team3 =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80";
const team4 =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80";

const team = [
  {
    image: team1,
    name: "Jane Doe",
    role: "Founder & CEO",
  },
  {
    image: team2,
    name: "Michael Scott",
    role: "Creative Director",
  },
  {
    image: team3,
    name: "Sarah Wilson",
    role: "Lead Designer",
  },
  {
    image: team4,
    name: "David Parker",
    role: "Senior Developer",
  },
];

export default function Team() {
  return (
    <section className="py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal animation="fade-up" className="text-center">
          <p className="uppercase tracking-[8px] text-orange-500">
            Meet Our Team
          </p>

          <h2 className="text-5xl font-bold mt-6">Passionate People</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
          {team.map((member, index) => (
            <ScrollReveal
              key={member.name}
              animation="fade-up"
              delay={index * 100}
              className="group overflow-hidden rounded-[30px] bg-white shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt=""
                  className="h-[420px] w-full object-cover group-hover:scale-110 duration-700"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold">{member.name}</h3>

                <p className="mt-3 text-gray-500">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
