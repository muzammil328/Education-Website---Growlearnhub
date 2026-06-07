export type ClassViewData = {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  serviceIds?: string[];
  keywords?: string[];
  status: string;
};

type ServiceItem = {
  serviceId: string;
  name: string;
};

export default function ClassModalView({
  formValues,
  services,
}: {
  formValues: ClassViewData;
  services?: ServiceItem[];
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">Name</span>
        <p className="font-medium">{formValues.name || '-'}</p>
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
        <span className="text-gray-500">Services</span>
        <p className="font-medium">
          {services?.length
            ? services.map(s => s.name).join(', ')
            : '-'}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Keywords</span>
        <p className="font-medium">{formValues.keywords?.join(', ') || '-'}</p>
      </div>
      <div>
        <span className="text-gray-500">Status</span>
        <p className="font-medium">{formValues.status || '-'}</p>
      </div>
    </div>
  );
}
