'use client';
import { useState, useEffect } from 'react';
import QuizPercentage from '@/features/MainPage/VU/Calculator/QuizPercentage';
import GDBPercentage from '@/features/MainPage/VU/Calculator/GDBPercentage';
import MidPercentages from '@/features/MainPage/VU/Calculator/MidPercentage';
import AssignmentPercentage from '@/features/MainPage/VU/Calculator/AssignmentPercentage';
import Image from 'next/image';
import { Wrapper1 } from '@/components/wrappers/Wrapper1';
import { Button, Heading2, Heading3, Para } from '@muzammil328/ui';
import { CommentForm } from '@/components/forms';

import { bookData } from '@/features/MainPage/VU/Calculator/SubjectSelect/bookData';

export default function VUCalculator({ url, data }: { url: string; data: unknown }) {
  const [calculatedAssignment, setCalculatedAssignment] = useState<number>(0);
  const [calculatedGDB, setCalculatedGDB] = useState<number>(0);

  const [calculatedMid, setCalculatedMid] = useState<number>(0);
  const [totalMidMark, setTotalMidMark] = useState<number>(0);
  const [MidPercentage, setMidPercentage] = useState<number>(0);

  const [quizPercentage, setQuizPercentage] = useState<number>(0);
  const [totalQuiz, setTotalQuiz] = useState<number>(0);
  const [calculatedQuiz, setCalculatedQuiz] = useState<number>(0);

  // Find the subject details based on selectedSubject
  const [selectedSubject] = useState<string>(data[0]?.name); // Default to the first subject
  const selectedSubjectData = bookData.find((subject: { name: string }) => subject.name === selectedSubject);

  useEffect(() => {
    if (selectedSubjectData) {
      setQuizPercentage(selectedSubjectData.quizPercentage || 0);
      setTotalQuiz(selectedSubjectData.totalQuiz || 0);
      setCalculatedQuiz(0);
      setMidPercentage(selectedSubjectData.midPercentage || 0);
      setTotalMidMark(selectedSubjectData.totalMid || 0);
      setCalculatedMid(0);
    }
  }, [selectedSubject, bookData]);

  const totalSum = calculatedAssignment + calculatedMid + calculatedGDB + calculatedQuiz;
  const roundedTotalSum = totalSum.toFixed(2); // Round to 2 decimal places

  return (
    <Wrapper1 title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <div className="my-10">
        <Heading2>Welcome to the Grow Learnhub Mid Term Mark Calculator</Heading2>
        <Para>
          Hey there! Welcome to our awesome Mark Calculator, It is created just for the students of
          Virtual University. This tool helps you track your grades, collecting marks in mid-exams,
          quizzes, assignments, and GDB. This <strong>VU Mid Mark Calculator</strong> is your new
          best friend for organizing grades and maintaining grades on your academic journey.
        </Para>{' '}
        <Image
          src={data[0]?.image}
          alt={data[0]?.title}
          title={data[0]?.title}
          height="720"
          width="1280"
        />
        <Heading3>Calculate your mid marks</Heading3>
        <Para>
          It’s got you covered for all subjects and semesters, making it super easy to calculate
          your marks accurately. Just fill in your scores for assignments, quizzes, midterms, and
          GDB. It’ll give you your overall percentage. And be aware you how many marks you are
          required in the final, to succeed in the final No problem! Our{' '}
          <i>VU Mid Mark Calculator’s</i>
          user-friendly interface makes it easy for everyone to use.
        </Para>
        <Para>If any features more, Plz Comment below, Thanks.</Para>
        {/* <SubjectSelect bookData={bookData} setSelectedSubject={setSelectedSubject} selectedSubject={selectedSubject} /> */}
        {/* The following components depend on the selected subject */}
        <QuizPercentage
          calculatedQuiz={calculatedQuiz}
          setCalculatedQuiz={setCalculatedQuiz}
          quizPercentage={quizPercentage}
          totalQuiz={totalQuiz}
          setQuizPercentage={setQuizPercentage}
          setTotalQuiz={setTotalQuiz}
        />
        <GDBPercentage calculatedGDB={calculatedGDB} setCalculatedGDB={setCalculatedGDB} />
        <AssignmentPercentage
          calculatedAssignment={calculatedAssignment}
          setCalculatedAssignment={setCalculatedAssignment}
        />
        <MidPercentages
          calculatedMid={calculatedMid}
          setCalculatedMid={setCalculatedMid}
          totalMidMark={totalMidMark}
          MidPercentage={MidPercentage}
          setTotalMidMark={setTotalMidMark}
          setMidPercentage={setMidPercentage}
        />
        <Button className="mt-5 w-full" variant="destructive_solid" title="Caluate Total Marks">
          <i>Here, You calculate total Mid Term Marks:</i> {roundedTotalSum}
        </Button>
        <CommentForm url={url} />
      </div>
    </Wrapper1>
  );
}
