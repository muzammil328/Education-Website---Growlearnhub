import { Label } from '@muzammil328/ui';

export default function McqModalView({
  formValues,
}: {
  formValues: {
    classId?: string;
    bookId?: string;
    chapterId?: string;
    headingId?: string;
    subHeadingId?: string;
    status?: string;
    questions?: {
      question: string;
      options: string[];
      correctOption: number;
      explanation?: string;
      difficulty?: string;
      status?: string;
    }[];
  };
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">Class</span>
        <p className="font-medium">{formValues.classId || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Book</span>
        <p className="font-medium">{formValues.bookId || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Chapter</span>
        <p className="font-medium">{formValues.chapterId || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Heading</span>
        <p className="font-medium">{formValues.headingId || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Sub Heading</span>
        <p className="font-medium">{formValues.subHeadingId || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Status</span>
        <p className="font-medium">{formValues.status || '-'}</p>
      </div>

      {formValues.questions && formValues.questions.length > 0 && (
        <div className="space-y-4">
          <Label>Questions</Label>
          {formValues.questions.map((question, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div>
                <span className="text-gray-500">Question {index + 1}</span>
                <p className="font-medium">{question.question || '-'}</p>
              </div>
              <div>
                <span className="text-gray-500">Options</span>
                <ul className="list-disc pl-5">
                  {question.options?.map((option, optIndex) => (
                    <li
                      key={optIndex}
                      className={
                        optIndex === question.correctOption ? 'font-semibold text-green-600' : ''
                      }
                    >
                      {option} {optIndex === question.correctOption && '(Correct)'}
                    </li>
                  ))}
                </ul>
              </div>
              {question.explanation && (
                <div>
                  <span className="text-gray-500">Explanation</span>
                  <p className="font-medium">{question.explanation}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">Difficulty</span>
                  <p className="font-medium">{question.difficulty || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <p className="font-medium">{question.status || '-'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
