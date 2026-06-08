import Image from 'next/image';
import { Container } from '@muzammil328/ui';
import { Heading1, Para } from '@muzammil328/ui';

interface ServiceCard {
  title: string;
  image: string;
}

const services: ServiceCard[] = [
  {
    title: 'Personalized Learning Plans',
    image: '/home-banner-top.webp',
  },
  {
    title: 'Experienced Tutors & Coaches',
    image: '/home-banner-top.webp',
  },
  {
    title: 'Flexible Scheduling',
    image: '/home-banner-top.webp',
  },
];

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block mb-4 px-4 py-2 bg-purple-100 text-purple-700 text-xs font-bold uppercase rounded tracking-wider">
            Our Services
          </span>

          <div className="flex items-center gap-3 mb-4">
            <Heading1 className="" weight="extrabold" family="inter" size="lg">
              How Our Homeschooling Services Work
            </Heading1>
            <span className="text-3xl">✨</span>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Learn how our homeschooling services provide personalized, flexible learning tailored to
            your child&apos;s needs, all from the comfort of home!
          </Para>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              {/* Purple Card Background */}
              <div className="relative bg-linear-to-br from-purple-600 to-purple-700 rounded-3xl overflow-hidden shadow-lg h-96 flex flex-col justify-between p-6">
                {/* Service Title */}
                <div className="relative z-10 flex items-start justify-between">
                  <h3 className="text-white font-bold text-xl md:text-2xl max-w-50 leading-tight">
                    {service.title}
                  </h3>

                  {/* Yellow Arrow Button */}
                  <button className="shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-md">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M7 16l4-4m0 0l4-4m-4 4H3m12 0h4"
                      />
                    </svg>
                  </button>
                </div>

                {/* Service Image */}
                <div className="relative z-10 flex justify-center items-end h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    height={300}
                    width={250}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
