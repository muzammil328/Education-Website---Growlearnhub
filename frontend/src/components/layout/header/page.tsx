import Image from 'next/image';
import { Button } from '@muzammil328/ui';
import { Container } from '@muzammil328/ui';
import Link from 'next/link';
import { Heading1, Para } from '@muzammil328/ui';

export default function Header() {
  return (
    <section className="relative py-12 md:py-20 bg-gray-50">
      <Container>
        <div className="relative grid gap-8 md:gap-12 items-center md:grid-cols-3">
          {/* Left character image with decorative elements */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-8 -left-8 text-4xl">✨</div>
            <Image
              src="/home-banner-top.webp"
              alt="Student with books"
              height={400}
              width={300}
              className="relative z-10"
            />
            <div className="absolute -bottom-12 -right-8 text-5xl">🎈</div>
          </div>

          {/* Center content */}
          <div className="text-center px-4 md:px-0">
            <Heading1 className="mb-6" weight="extrabold" family="inter" size="2xl">
              Shaping Future Innovators with Personalized Learning
            </Heading1>

            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-pink-500 text-2xl">✨</span>
            </div>

            <Para lineHeight="7" className="mb-8 max-w-[550px] mx-auto text-gray-700">
              Discover flexible, engaging, and expert-led homeschooling services that put your
              child&apos;s learning first.
            </Para>

            <Button
              className="rounded-full px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              asChild
            >
              <Link href="#introduction">▶ Watch Introduction</Link>
            </Button>
          </div>

          {/* Right character image with purple circle background */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-6 -right-6 text-3xl">☀️</div>
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-linear-to-b from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
              <Image
                src="/home-banner-top.webp"
                alt="Student studying"
                height={350}
                width={280}
                className="relative z-10"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 text-4xl">💍</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
