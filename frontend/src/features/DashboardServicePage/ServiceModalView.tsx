
export default function ServiceModalView({
  formValues,
}: {
  formValues: {
    name?: string;
    slug?: string;
    classId?: string | string[];
    description?: string;
    image?: string;
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
        <span className="text-gray-500">Classes</span>
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
        <span className="text-gray-500">Image URL</span>
        <p className="font-medium">{formValues.image || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Status</span>
        <p className="font-medium">{formValues.status || '-'}</p>
      </div>
    </div>
  );
}
