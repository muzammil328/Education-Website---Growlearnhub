import { Label } from '@muzammil328/ui/forms';

export default function BookModalView({
  formValues,
}: {
  formValues: {
    name: string;
    code?: string;
    classId?: string | string[];
    className?: string;
    class?: { classId: string; className: string };
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
        <p className="font-medium">{formValues.name || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Code</span>
        <p className="font-medium">{formValues.code || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Class</span>
        <p className="font-medium">
          {formValues.class?.className ||
            formValues.className ||
            (Array.isArray(formValues.classId)
              ? formValues.classId.join(', ')
              : formValues.classId || '-')}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <p className="font-medium">{formValues.description || '-'}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Credit Hours</span>
          <p className="font-medium">{formValues.creditHours ?? '-'}</p>
        </div>
        <div>
          <span className="text-gray-500">Pages</span>
          <p className="font-medium">{formValues.pages ?? '-'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Total Weight</span>
          <p className="font-medium">{formValues.totalWeight ?? '-'}</p>
        </div>
      </div>
      <div>
        <span className="text-gray-500">Image URL</span>
        <p className="font-medium">{formValues.image || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">File ID</span>
        <p className="font-medium">{formValues.fileId || '-'}</p>
      </div>
      {formValues.components && formValues.components.length > 0 && (
        <div className="space-y-2">
          <Label>Assessment Components</Label>
          {formValues.components.map((comp, index) => (
            <div key={index} className="rounded border p-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Title</span>
                <p className="font-medium">{comp.title || '-'}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weight</span>
                <p className="font-medium">{comp.weight ?? '-'}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Description</span>
                <p className="font-medium">{comp.description || '-'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <span className="text-gray-500">Status</span>
        <p className="font-medium">{formValues.status || '-'}</p>
      </div>
    </div>
  );
}
