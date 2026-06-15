'use client';

import { useState } from 'react';
import { Heading1, Stepper, toast } from '@muzammil328/ui';
import { SteepperStep1 } from './SteeperStep1';
import { SteepperStep2 } from './SteeperStep2';
import { SteepperStep3 } from './SteeperStep3';
import { useCreateMcqs } from '@/hooks';
import { useRouter } from 'next/navigation';

interface Step1Data {
  classId: string;
  bookId: string;
  chapterId: string;
  headingId: string;
  subHeadingId: string;
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
}

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'inactive';
}

const steps = [
  { id: '1', title: 'Basic Info', description: 'Select class, book, chapter' },
  { id: '2', title: 'MCQ Questions', description: 'Add or import questions' },
  { id: '3', title: 'Review', description: 'Confirm and submit' },
];

type McqsPageProps = {
  title: string;
  image: string;
  canonical: string;
  url: string;
};

export default function McqsPage({ title, image, canonical, url }: McqsPageProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Data>({
    classId: '',
    bookId: '',
    headingId: '',
    subHeadingId: '',
    chapterId: '',
    className: '',
    bookName: '',
    chapterName: '',
    headingName: '',
    subHeadingName: '',
  });
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      explanation: '',
      difficulty: 'medium',
      status: 'active',
    },
  ]);

  const createMcqsMutation = useCreateMcqs();

  const handleStep1Next = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(1);
  };

  const handleStep2Next = (q: Question[]) => {
    setQuestions(q);
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    createMcqsMutation.mutate(
      {
        ...step1Data,
        questions: questions.map(
          ({ question, options, correctOption, explanation, difficulty, status }) => ({
            question,
            options,
            correctOption,
            explanation,
            difficulty,
            status,
          })
        ),
      },
      {
        onSuccess: response => {
          toast.success(response.message || 'MCQs created successfully');
          router.push('/dashboard/mcqs');
        },
        onError: error => {
          toast.error(error.message || 'Failed to create MCQs');
        },
      }
    );
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Heading1 className="text-2xl font-bold">Add New MCQs</Heading1>
      </div>

      <Stepper steps={steps} currentStep={currentStep} showButtons={false} className="mb-8" />

      {currentStep === 0 && <SteepperStep1 initialData={step1Data} onNext={handleStep1Next} />}

      {currentStep === 1 && (
        <SteepperStep2
          questions={questions}
          onNext={handleStep2Next}
          onBack={handleBack}
          step1Data={step1Data}
        />
      )}

      {currentStep === 2 && (
        <SteepperStep3
          step1Data={step1Data}
          questions={questions}
          onSubmit={handleSubmit}
          onBack={handleBack}
          isLoading={createMcqsMutation.isPending}
        />
      )}
    </div>
  );
}
