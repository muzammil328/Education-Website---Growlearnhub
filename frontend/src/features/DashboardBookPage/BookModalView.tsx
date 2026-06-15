import { Label, Para } from '@muzammil328/ui';

export default function BookModalView({
  formValues,
}: {
  formValues: {
    name: string;
    code?: string;
    classId?: string | string[];
    className?: string;
    class?: { classId: string; name: string };
    description?: string;
    status: string;
    creditHours?: number;
    pages?: number;
    image?: string;
    fileId?: string;
    order?: number;
    totalWeight?: number;
    components?: { title: string; weight: number; description?: string }[];
  };
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">Name</span>
        <Para className="font-medium">{formValues.name || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Code</span>
        <Para className="font-medium">{formValues.code || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Class</span>
        <Para className="font-medium">
          {formValues.class?.name ||
            formValues.className ||
            (Array.isArray(formValues.classId)
              ? formValues.classId.join(', ')
              : formValues.classId || '-')}
        </Para>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <Para className="font-medium">{formValues.description || '-'}</Para>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Credit Hours</span>
          <Para className="font-medium">{formValues.creditHours ?? '-'}</Para>
        </div>
        <div>
          <span className="text-gray-500">Pages</span>
          <Para className="font-medium">{formValues.pages ?? '-'}</Para>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Total Weight</span>
          <Para className="font-medium">{formValues.totalWeight ?? '-'}</Para>
        </div>
      </div>
      <div>
        <span className="text-gray-500">Image URL</span>
        <Para className="font-medium">{formValues.image || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">File ID</span>
        <Para className="font-medium">{formValues.fileId || '-'}</Para>
      </div>
      {formValues.components && formValues.components.length > 0 && (
        <div className="space-y-2">
          <Label>Assessment Components</Label>
          {formValues.components.map((comp, index) => (
            <div key={index} className="rounded border p-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Title</span>
                <Para className="font-medium">{comp.title || '-'}</Para>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weight</span>
                <Para className="font-medium">{comp.weight ?? '-'}</Para>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Description</span>
                <Para className="font-medium">{comp.description || '-'}</Para>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <span className="text-gray-500">Status</span>
        <Para className="font-medium">{formValues.status || '-'}</Para>
      </div>
    </div>
  );
}
