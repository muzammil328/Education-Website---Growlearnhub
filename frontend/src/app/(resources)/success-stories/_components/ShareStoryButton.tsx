'use client';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  useIsMobile,
} from '@muzammil328/ui';
import ShareStoryForm from '@/components/forms/ShareStoryForm';

export default function ShareStoryButton() {
  const isMobile = useIsMobile();

  return (
    <Drawer key={isMobile ? 'mobile' : 'desktop'} direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90">
          Share Your Story
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share Your Success Story</DrawerTitle>
          <DrawerDescription>
            Tell us how Growlearnhub helped you achieve academic success.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-8" style={{ maxHeight: 'calc(85dvh - 120px)' }}>
          <ShareStoryForm variant="drawer" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

