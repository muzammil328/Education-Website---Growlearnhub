export default function ChapterModalView({
  formValues,
}: {
  formValues: {
    name?: string;
    classId?: string | string[];
    bookId?: string | string[];
    description?: string;
    content?: string;
    status?: string;
    order?: number;
    className?: string;
    bookName?: string;
    class?: { classId: string; className: string };
    book?: { bookId: string; bookName: string };
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
          {formValues.class?.className || formValues.className || formValues.classId || '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Book</span>
        <p className="font-medium">
          {formValues.book?.bookName || formValues.bookName || formValues.bookId || '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <p className="font-medium">{formValues.description || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Content</span>
        <p className="font-medium">{formValues.content || '-'}</p>
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
