import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { Heading1 } from '@muzammil328/ui';

export default function SubHeader(props: { title: string }) {
  return (
    <section className="border-b md:h-100 h-70 flex flex-col">
      <div className="flex-1 flex items-center section">
        <Heading1 className="text-4xl font-bold">
          {props.title}
        </Heading1>
      </div>

      <div className="border-t sm:p-4 p-2">
        <DynamicBreadcrumb />
      </div>
    </section>
  );
}