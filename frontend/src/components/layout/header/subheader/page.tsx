import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { Container } from '@muzammil328/ui';

export default function SubHeader(props: { title: string }) {
  return (
    <section className="border-b h-100 flex flex-col">
      <Container className="flex-1 flex items-center">
        <h1 className="main">
          {props.title}
        </h1>
      </Container>

      <div className="border-t p-4">
        <DynamicBreadcrumb />
      </div>
    </section>
  );
}