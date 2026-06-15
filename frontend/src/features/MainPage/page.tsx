import React from 'react';
import Header from '@/components/layout/header/page';
import {
  BookOpen,
  CheckSquare,
  Clock,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Book,
  FileQuestion,
  ListChecks,
  MonitorPlay,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/elements/Container';
import { Heading2, Heading3, Heading4, Para } from '@muzammil328/ui';

const categoryData = [
  {
    title: 'Books',
    icon: Book,
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/about-06.webp',
    count: '250+ Books',
  },
  {
    title: 'Notes',
    icon: FileText,
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/about-06.webp',
    count: '100+ Notes',
  },
  {
    title: 'Past Papers',
    icon: FileQuestion,
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/about-06.webp',
    count: '1000+ Papers',
    featured: true,
  },
  {
    title: 'Pairing Scheme',
    icon: ListChecks,
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/about-06.webp',
    count: '50+ Schemes',
  },
  {
    title: 'Online Quiz',
    icon: MonitorPlay,
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/about-06.webp',
    count: '300+ Quizzes',
  },
  {
    title: 'Live Classes',
    icon: Zap,
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/about-06.webp',
    count: '50+ Live Sessions',
    featured: true,
  },
];

const topicData = [
  { name: 'Understand The Background Of lms.', date: 'March 20, 2024' },
  { name: 'Understand The Background Of lms.', date: 'March 20, 2024' },
  { name: 'Understand The Background Of lms.', date: 'March 20, 2024' },
];

const feedbackData = [
  {
    name: 'Muzammil Safdar',
    description:
      'Histudy education, vulputate at sapien sit amet, auctor iaculis lorem. In vel hend rerit nisi. Vestibulum eget.',
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/client-1-sm-1.webp',
    career: 'Developer',
  },
  {
    name: 'Muzammil Safdar',
    description:
      'Histudy education, vulputate at sapien sit amet, auctor iaculis lorem. In vel hend rerit nisi. Vestibulum eget.',
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/client-1-sm-1.webp',
    career: 'Developer',
  },
  {
    name: 'Muzammil Safdar',
    description:
      'Histudy education, vulputate at sapien sit amet, auctor iaculis lorem. In vel hend rerit nisi. Vestibulum eget.',
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/client-1-sm-1.webp',
    career: 'Developer',
  },
  {
    name: 'Muzammil Safdar',
    description:
      'Histudy education, vulputate at sapien sit amet, auctor iaculis lorem. In vel hend rerit nisi. Vestibulum eget.',
    image: 'https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/03/client-1-sm-1.webp',
    career: 'Developer',
  },
];

function CategoryCard({
  category,
  className = '',
}: {
  category: (typeof categoryData)[0];
  className?: string;
}) {
  return (
    <Link
      href="#"
      className={`group relative overflow-hidden rounded-xl ${category.featured ? 'bg-red-500' : 'bg-gray-100'} ${className}`}
    >
      {!category.featured && (
        <Image
          src={category.image}
          alt={category.title}
          width={400}
          height={category.featured ? 620 : 300}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
      )}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center transition-colors ${category.featured ? 'bg-transparent' : 'bg-black/0 group-hover:bg-red-500/90'}`}
      >
        {category.icon && (
          <category.icon
            className={`h-12 w-12 ${category.featured ? 'text-white' : 'text-white opacity-0 transition-opacity group-hover:opacity-100'}`}
          />
        )}
        <div>
          <Heading3
            className={`text-xl font-bold ${category.featured ? 'text-white' : 'text-white opacity-0 transition-opacity group-hover:opacity-100'}`}
          >
            {category.title}
          </Heading3>
          <Para
            className={`mt-2 ${category.featured ? 'text-white/90' : 'text-white opacity-0 transition-opacity group-hover:opacity-100'}`}
          >
            {category.count}
          </Para>
        </div>
      </div>
    </Link>
  );
}

function TopicCard({ data }: { data: (typeof topicData)[0] }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <Heading4 className="mb-2 text-lg font-semibold">{data.name}</Heading4>
      <Para className="text-sm text-muted-foreground">{data.date}</Para>
    </div>
  );
}

function FeedbackCard({ data }: { data: (typeof feedbackData)[0] }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <Para className="mb-4 text-muted-foreground">{data.description}</Para>
      <div className="flex items-center gap-3">
        <Image src={data.image} alt={data.name} width={48} height={48} className="rounded-full" />
        <div>
          <Para className="font-semibold">{data.name}</Para>
          <Para className="text-sm text-muted-foreground">{data.career}</Para>
        </div>
      </div>
    </div>
  );
}

function CategoryGrid() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-6">
          <CategoryCard category={categoryData[0]} />
          <CategoryCard category={categoryData[1]} />
        </div>
        <div className="grid gap-6">
          <CategoryCard category={categoryData[2]} className="sm:row-span-2" />
        </div>
        <div className="grid gap-6">
          <CategoryCard category={categoryData[3]} />
          <CategoryCard category={categoryData[4]} />
        </div>
        <div className="grid gap-6">
          <CategoryCard category={categoryData[5]} className="sm:row-span-2" />
        </div>
      </div>
    </div>
  );
}

function Topics() {
  return (
    <div className="bt relative bg-linear-to-tl from-[#98ff98] via-[#3eb489] to-[#20c997] py-16">
      <Container>
        <div className="pb-20 md:py-16">
          <div className="grid grid-cols-1 items-center justify-between py-10 md:grid-cols-2">
            <div>
              <Heading3 className="mb-5 text-4xl font-bold text-white">Latest Topics</Heading3>
              <Para className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ab ipsum possimus
                quos totam voluptates accusamus mollitia facilis dolor ducimus.
              </Para>
            </div>
            <div className="mt-3 flex justify-start md:mt-0 md:justify-end">
              <button className="rounded-full border bg-transparent px-6 py-2">
                See All Topics
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topicData.map((data, index) => (
              <TopicCard key={index} data={data} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Feedback() {
  return (
    <section className="bt mb-20 pt-10 md:pt-20">
      <Container>
        <div>
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <Heading3 className="mb-4 text-3xl font-bold text-black dark:text-white lg:text-4xl">
              Student&apos;s Feedback
            </Heading3>
            <Para className="text-center">
              Learning communicate to global world and build a bright future and career development,
              increase your skill with our histudy.
            </Para>
          </div>
          <div className="my-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {feedbackData.map((data, index) => (
              <FeedbackCard key={index} data={data} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <React.Fragment>
      <header className="bg-hero bg-hero-2">
        <Header />
      </header>
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Heading2 className="mb-4 text-3xl font-bold">Our Learning Resources</Heading2>
            <Para>
              Everything you need to succeed in your academic journey, all in one place.
            </Para>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <BookOpen className="h-10 w-10 text-orange-500" />,
                title: 'Interactive Books',
                description:
                  'Engaging digital textbooks with interactive elements to enhance learning.',
              },
              {
                icon: <CheckSquare className="h-10 w-10 text-orange-500" />,
                title: 'MCQ Practice',
                description: 'Thousands of multiple-choice questions to test your knowledge.',
              },
              {
                icon: <FileText className="h-10 w-10 text-orange-500" />,
                title: 'Comprehensive Notes',
                description: 'Well-structured notes covering all topics in your curriculum.',
              },
              {
                icon: <Clock className="h-10 w-10 text-orange-500" />,
                title: 'Timed Tests',
                description: 'Simulate exam conditions with our timed online tests.',
              },
              {
                icon: <FileSpreadsheet className="h-10 w-10 text-orange-500" />,
                title: 'Past Papers',
                description: "Access to previous years' exam papers with detailed solutions.",
              },
              {
                icon: <GraduationCap className="h-10 w-10 text-orange-500" />,
                title: 'Learning Paths',
                description: 'Customized learning journeys based on your goals and progress.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4">{item.icon}</div>
                <Heading3 className="mb-2 text-xl font-semibold">{item.title}</Heading3>
                <Para>{item.description}</Para>
              </div>
            ))}
          </div>
        </div>
      </section>
      <main>
        <CategoryGrid />
        <Topics />
        <Feedback />
      </main>
    </React.Fragment>
  );
}
