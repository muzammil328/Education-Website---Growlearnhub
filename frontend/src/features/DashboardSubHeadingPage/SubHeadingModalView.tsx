export default function SubHeadingModalView({
  formValues,
}: {
  formValues: {
    name?: string;
    classId?: string | string[];
    bookId?: string | string[];
    chapterId?: string | string[];
    headingId?: string | string[];
    className?: string;
    bookName?: string;
    chapterName?: string;
    headingName?: string;
    status?: string;
    order?: number;
    class?: { classId: string; name: string };
    book?: { bookId: string; name: string };
    chapter?: { chapterId: string; name: string };
    heading?: { headingId: string; name: string };
  };
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">Name</span>
        <p className="font-medium">{formValues.name || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Class</span>
        <p className="font-medium">
          {formValues.class?.name || formValues.className || formValues.classId || '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Book</span>
        <p className="font-medium">
          {formValues.book?.name || formValues.bookName || formValues.bookId || '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Chapter</span>
        <p className="font-medium">
          {formValues.chapter?.name || formValues.chapterName || formValues.chapterId || '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Heading</span>
        <p className="font-medium">
          {formValues.heading?.name || formValues.headingName || formValues.headingId || '-'}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Order</span>
          <p className="font-medium">{formValues.order ?? '-'}</p>
        </div>
        <div>
          <span className="text-gray-500">Status</span>
          <p className="font-medium">{formValues.status || '-'}</p>
        </div>
      </div>
    </div>
  );
}
