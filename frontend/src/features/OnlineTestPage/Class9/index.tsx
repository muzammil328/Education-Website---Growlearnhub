import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import CardSmall from '@/components/card/SmallCard';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { config } from '@/config';

export const revalidate = 604800; // 7 days in seconds

interface BookItem {
  name: string;
  slug: string;
  bookId?: string;
}

async function getBooksByClassName(className: string): Promise<BookItem[]> {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.book.getByClassName.query({ className });
    return result || [];
  } catch {
    return [];
  }
}

interface ClassOnlineTestPageData {
  title: string;
  description: string;
  image: string;
  canonical: string;
  url: string;
  className: string;
  classNumber: string;
}

export default async function OnlineTestClass9Page({ data }: { data: ClassOnlineTestPageData }) {
  const books = await getBooksByClassName(data.className);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class {data.classNumber} Online Tests
          </Heading2>
          <p className="text-base">
            Assess your Class {data.classNumber} knowledge with chapter-wise quizzes, real-time
            scoring, instant feedback, and detailed performance analytics.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Benefits of Online Testing</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Real-time scoring:</strong> Get instant results and see your performance
            </li>
            <li>
              <strong>Detailed feedback:</strong> Understand why each answer is correct or wrong
            </li>
            <li>
              <strong>Timed practice:</strong> Build speed and accuracy with time-limited tests
            </li>
            <li>
              <strong>Progress tracking:</strong> Monitor your improvement over time
            </li>
            <li>
              <strong>Flexible learning:</strong> Practice anytime, anywhere on any device
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Test Features</h3>
          <ul className="list-inside space-y-1">
            <li>Chapter-wise quizzes for focused practice</li>
            <li>Multiple difficulty levels</li>
            <li>Instant answer review with explanations</li>
            <li>Performance analytics and progress reports</li>
            <li>Timed and untimed test options</li>
            <li>Mobile-friendly interface</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Subjects Available</h3>
          <ul className="list-inside space-y-1">
            <li>Biology</li>
            <li>Chemistry</li>
            <li>Physics</li>
          </ul>
        </section>

        <section className="mb-8">
          <Heading2>Subjects Wise Online Test</Heading2>
          {books.length > 0 ? (
            <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {books.map(book => (
                <CardSmall
                  key={book.bookId || book.slug}
                  title={book.name}
                  link={`${data.className}/online-test/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No books available for this class right now.</p>
          )}
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">Getting Started</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>1. Choose your subject:</strong> Biology, Chemistry, or Physics
            </li>
            <li>
              <strong>2. Select a chapter:</strong> Pick the chapter you want to test on
            </li>
            <li>
              <strong>3. Select test type:</strong> Chapter-wise or full-length practice exam
            </li>
            <li>
              <strong>4. Take the test:</strong> Answer questions with or without time limit
            </li>
            <li>
              <strong>5. Review results:</strong> Check your score and learn from mistakes
            </li>
            <li>
              <strong>6. Track progress:</strong> Monitor your improvement with analytics
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
