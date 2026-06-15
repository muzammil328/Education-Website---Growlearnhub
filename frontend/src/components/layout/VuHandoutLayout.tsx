import React from 'react';
import UserLayout from './UserLayout';
import PieChart from '@/components/elements/PieChart';
import Link from 'next/link';
import UnorderedList from '../elements/list/UnorderedList';
import PDFViewer from '../elements/PDFViewer';
import SimpleTable from '@/components/elements/table';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

export function VuHandoutLayout({
  data,
  bookName,
  bookNameAbbr,
  bookCode,
  totalPage,
  totalChapter,
  CreditHour,
  MidTermCoverage,
  FinalCoverage,
  Assignments,
  Quizzes,
  GDB,
  FinalTerm,
  MidTerm,
  fileId,
  combinedData,
  // children,
}: {
  bookName: string;
  bookNameAbbr: string;
  bookCode: string;
  totalPage: string;
  totalChapter: string;
  CreditHour: string;
  MidTermCoverage: string;
  FinalCoverage: string;
  fileId: string;
  Assignments: number;
  Quizzes: number;
  GDB: number;
  MidTerm: number;
  FinalTerm: number;
  // children?: React.ReactNode;
  combinedData: {
    id: number;
    link: string;
    title: string;
    content: string;
  }[];
  data: {
    title: string;
    image?: string;
    canonical: string;
    url: string;
  };
}) {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <Para className="p5">
        Welcome to your one-stop source for{' '}
        <em>
          {bookNameAbbr}
          {bookCode} PDF
        </em>{' '}
        from
        <Link href="https://vu.edu.pk/" className="ml-1" title="VU">
          Virtual University (VU)
        </Link>
        . Download the handouts in PDF format for free and study at your own pace.
      </Para>

      {/* PDF Viewer  */}
      <Heading2>
        PDF Download {bookNameAbbr}
        {bookCode} handouts Now
      </Heading2>
      <Para className="p5">
        Access the complete{' '}
        <strong>
          {bookNameAbbr}
          {bookCode}
        </strong>{' '}
        - {bookName}
        handouts in PDF format by clicking the download link below. Be sure to download and review
        the materials to prepare effectively for your assessments.
      </Para>
      <SimpleTable
        chapterTitleArray={[
          'Name',
          'Category',
          'Credit Hours',
          'Code',
          'Total Pages',
          'Total Chapter',
          'Mid Exam Coverage',
          'Final Exam Coverage',
        ]}
        contentArray={[
          bookName,
          bookNameAbbr,
          `${CreditHour} Credit`,
          bookCode,
          totalPage,
          totalChapter,
          MidTermCoverage,
          FinalCoverage,
        ]}
        headingArray={['Course Title', `${bookNameAbbr}${bookCode} Book`]}
      />

      <Heading3>Assessment Scheme:</Heading3>
      <UnorderedList
        items={[
          {
            description: `Assignments (${Assignments}%)`,
          },
          {
            description: `Quizzes (${Quizzes}%)`,
          },
          {
            description: `GDB (${GDB}%)`,
          },
          {
            description: `Mid Term (${MidTerm}%)`,
          },
          {
            description: `Final Term (${FinalTerm}%)`,
          },
        ]}
      />

      <PieChart
        labels={['GDB', 'Assignments', 'Quizzes', 'Mid Term', 'Final Term']}
        dataValues={[GDB, Assignments, Quizzes, MidTerm, FinalTerm]}
        bookName={`${bookNameAbbr} ${bookCode}`}
      />

      <PDFViewer pdfUrl={fileId} />

      <Heading2>
        Topics Covered in {bookName} ({bookNameAbbr}
        {bookCode} Handouts)
      </Heading2>
      <Para className="p5">
        Here are the key topics you&apos;ll find in the {bookNameAbbr}
        {bookCode} handouts:
      </Para>
      <SimpleTable
        chapterTitleArray={combinedData.map(item => item.title)}
        contentArray={combinedData.map(item => item.content)}
        chapterDATA={combinedData.map(item => ({
          id: item.id,
          link: item.link,
        }))}
        headingArray={[`${bookNameAbbr}${bookCode} Chapter`, `${bookNameAbbr}${bookCode} Topics`]}
      />
    </UserLayout>
  );
}

export function generateVuHandoutWrapperMetaData(data: {
  bookNameAbbr: string;
  bookCode: string;
  bookName: string;
}) {
  return {
    title: `${data.bookNameAbbr}${data.bookCode} Handouts PDF Download | VU | Growlearnhub`,
    description: `Download ${data.bookNameAbbr}${data.bookCode} handouts in PDF format for free! Access study material for ${data.bookName} (VU) and prepare effectively for your exams.`,
    canonical: `/vu/handouts/${data.bookNameAbbr.toLowerCase()}${data.bookCode}/`,
    image: `/vu/handouts/${data.bookNameAbbr.toLowerCase()}${data.bookCode}-handouts.webp`,
    url: `https://growlearnhub.com/vu/handouts/${data.bookNameAbbr.toLowerCase()}${data.bookCode}/`,
    keywords: [
      'growlearnhub',
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts`,
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts vu`,
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts pdf`,
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts pdf download`,
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts pdf free download`,
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} pdf download handouts`,
      `${data.bookNameAbbr.toLowerCase()}${data.bookCode} download handouts`,
      `growlearnhub ${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts`,
      `virtual university ${data.bookNameAbbr.toLowerCase()}${data.bookCode} handouts`,
    ],
  };
}
