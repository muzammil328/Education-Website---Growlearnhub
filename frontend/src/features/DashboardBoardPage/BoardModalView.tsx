import { Para } from '@muzammil328/ui';
export default function BoardModalView({
  formValues,
}: {
  formValues: {
    name?: string;
    slug?: string;
    classId?: string | string[];
    description?: string;
    status?: string;
  };
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">Name</span>
        <Para className="font-medium">{formValues.name || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Slug</span>
        <Para className="font-medium">{formValues.slug || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Class</span>
        <Para className="font-medium">
          {Array.isArray(formValues.classId)
            ? formValues.classId.join(', ')
            : formValues.classId || '-'}
        </Para>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <Para className="font-medium">{formValues.description || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Status</span>
        <Para className="font-medium">{formValues.status || '-'}</Para>
      </div>
    </div>
  );
}
