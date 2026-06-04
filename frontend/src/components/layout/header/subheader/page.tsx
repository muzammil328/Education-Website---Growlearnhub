import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { Container } from '@muzammil328/ui';
import { Heading1 } from '@muzammil328/ui';

export default function SubHeader(props: { title: string }) {
  return (
    <section className="overlay relative z-0 overflow-hidden bg-stone-50 bg-cover bg-center bg-no-repeat pb-4 pt-12 dark:bg-stone-950 md:bg-fixed">
      <Container>
        <div className="relative isolate pt-8">
          <div className="mx-auto py-8 sm:py-20 md:py-32">
            <div className="mt-4 text-left md:text-center">
              <Heading1 className="mb-4" weight="extrabold" family="inter">
                {props.title}
              </Heading1>
            </div>
          </div>
        </div>
      </Container>
      <DynamicBreadcrumb />
    </section>
  );
}
