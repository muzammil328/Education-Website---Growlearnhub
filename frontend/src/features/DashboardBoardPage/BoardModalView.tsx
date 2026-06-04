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
        <p className="font-medium">{formValues.name || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Slug</span>
        <p className="font-medium">{formValues.slug || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Class</span>
        <p className="font-medium">
          {Array.isArray(formValues.classId)
            ? formValues.classId.join(', ')
            : formValues.classId || '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <p className="font-medium">{formValues.description || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Status</span>
        <p className="font-medium">{formValues.status || '-'}</p>
      </div>
    </div>
  );
}
