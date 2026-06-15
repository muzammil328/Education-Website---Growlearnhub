import { CheckIcon } from "@/components/svg";
import { Heading2, Heading3, Para } from '@muzammil328/ui';

export default function StatsSection() {
  return (
    <section className="w-full bg-[#edfaf3] px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-275">
        {/* Heading */}
        <div className="mb-14 text-center md:mb-16">
          <Heading2 className="text-3xl font-extrabold leading-[1.2] tracking-[-0.8px] text-[#0f1f1a] md:text-[42px]">
            Join{" "}
            <span className="relative inline-block text-[#1abf8a]">
              Largest NGO
              <svg
                className="absolute -bottom-1.5 left-0 h-3 w-full"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 Q50 2, 100 7 Q150 12, 198 5"
                  stroke="#f5a623"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Learning Platform Today
          </Heading2>

          <Para className="mx-auto mt-4 max-w-125 text-base leading-[1.7] text-[#6b7c74]">
            Access world-class study materials, expert facilitators, and a
            thriving community of learners - completely free of cost.
          </Para>
        </div>

        {/* Content */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              icon="🎓"
              value="1000+"
              label="Total Learners"
              cardClassName="bg-[#d4f5e2]"
              valueClassName="text-[#0a7a45]"
              labelClassName="text-[rgba(15,31,26,0.55)]"
            />

            <StatCard
              icon="👨‍🏫"
              value="150+"
              label="Total Facilitators"
              cardClassName="bg-[#ffe0c2]"
              valueClassName="text-[#c05a00]"
              labelClassName="text-[rgba(192,90,0,0.6)]"
            />

            <StatCard
              icon="📚"
              value="2000+"
              label="Study Material"
              cardClassName="bg-[#e2deff]"
              valueClassName="text-[#4a2ea0]"
              labelClassName="text-[rgba(74,46,160,0.6)]"
            />

            <StatCard
              icon="🎬"
              value="5000+"
              label="Learning Content"
              cardClassName="bg-[#fdf5b0]"
              valueClassName="text-[#7a6800]"
              labelClassName="text-[rgba(122,104,0,0.6)]"
            />
          </div>

          {/* Right Content */}
          <div className="lg:pl-5">
            <span className="mb-5 inline-block rounded-full bg-[#d0f5e8] px-3.5 py-1.25 text-xs font-semibold uppercase tracking-[1px] text-[#1abf8a]">
              Why Choose Us
            </span>

            <Heading3 className="text-[30px] font-extrabold leading-tight tracking-[-0.5px] text-[#0f1f1a]">
              Empowering Every
              <br />
              Aspiring Learner
            </Heading3>

            <div className="mb-5 mt-5 h-0.75 w-12 rounded-full bg-linear-to-r from-[#1abf8a] to-[#0fa06e]" />

            <div className="space-y-4 text-[15px] leading-[1.8] text-[#5a7068]">
              <Para>
                We believe quality education should be accessible to all. Our
                platform brings together expert facilitators, structured content,
                and a supportive community to help you reach your goals.
              </Para>

              <Para>
                Whether you&apos;re preparing for civil services or upskilling
                yourself, we have everything you need - all at zero cost.
              </Para>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              <FeatureItem text="Curated notes & mock tests by experts" />
              <FeatureItem text="Live sessions and recorded video lectures" />
              <FeatureItem text="100% free - no hidden fees, ever" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type StatCardProps = {
  icon: string;
  value: string;
  label: string;
  cardClassName: string;
  valueClassName: string;
  labelClassName: string;
};

function StatCard({
  icon,
  value,
  label,
  cardClassName,
  valueClassName,
  labelClassName,
}: StatCardProps) {
  return (
    <div
      className={`cursor-default overflow-hidden rounded-[20px] px-7 py-8 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] ${cardClassName}`}
    >
      <span className="mb-3.5 block text-[22px] leading-none">{icon}</span>

      <Heading3
        className={`mb-2 text-[38px] font-black leading-none tracking-[-1px] ${valueClassName}`}
      >
        {value}
      </Heading3>

      <Para
        className={`text-[13px] font-semibold uppercase tracking-[0.3px] ${labelClassName}`}
      >
        {label}
      </Para>
    </div>
  );
}

type FeatureItemProps = {
  text: string;
};

function FeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3 text-[14.5px] font-medium text-[#2d4a3e]">
      <CheckIcon />
      <span>{text}</span>
    </li>
  );
}