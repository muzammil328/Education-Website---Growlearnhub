import { Para } from '@muzammil328/ui';
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
    class?: { classId: string; name: string };
    book?: { bookId: string; name: string };
  };
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">Name</span>
        <Para className="font-medium">{formValues.name || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Class</span>
        <Para className="font-medium">
          {formValues.class?.name || formValues.className || formValues.classId || '-'}
        </Para>
      </div>
      <div>
        <span className="text-gray-500">Book</span>
        <Para className="font-medium">
          {formValues.book?.name || formValues.bookName || formValues.bookId || '-'}
        </Para>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <Para className="font-medium">{formValues.description || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Content</span>
        <Para className="font-medium">{formValues.content || '-'}</Para>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Order</span>
          <Para className="font-medium">{formValues.order ?? '-'}</Para>
        </div>
        <div>
          <span className="text-gray-500">Status</span>
          <Para className="font-medium">{formValues.status || '-'}</Para>
        </div>
      </div>
    </div>
  );
}
