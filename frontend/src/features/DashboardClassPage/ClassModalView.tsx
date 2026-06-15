import { Para } from '@muzammil328/ui';
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
        <Para className="font-medium">{formValues.name || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Description</span>
        <Para className="font-medium">{formValues.description || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Image URL</span>
        <Para className="font-medium">{formValues.image || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Services</span>
        <Para className="font-medium">
          {services?.length
            ? services.map(s => s.name).join(', ')
            : '-'}
        </Para>
      </div>
      <div>
        <span className="text-gray-500">Keywords</span>
        <Para className="font-medium">{formValues.keywords?.join(', ') || '-'}</Para>
      </div>
      <div>
        <span className="text-gray-500">Status</span>
        <Para className="font-medium">{formValues.status || '-'}</Para>
      </div>
    </div>
  );
}
