'use client';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    Button,
    useIsMobile,
} from '@muzammil328/ui';
import ReportBugForm from '@/components/forms/ReportBugForm';
import RequestFeatureForm from '@/components/forms/RequestFeatureForm';

export default function CallToAction() {
    const isMobile = useIsMobile();

    return (
        <section className="my-16 mx-2 rounded-xl bg-linear-to-r from-primary/10 to-primary/5 lg:px-8 md:px-6 sm:px-4 px-2 py-4 text-center">
            <h3>
                Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className="sm mb-4">
                We&apos;re constantly adding new subjects and resources. Let us know what you need and
                we&apos;ll make it available.
            </p>
            <div className="flex justify-center gap-4">
                <Drawer key={isMobile ? 'report-mobile' : 'report-desktop'} direction={isMobile ? 'bottom' : 'right'}>
                    <DrawerTrigger asChild>
                        <Button className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90">
                            Report a Bug
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className={isMobile ? '' : 'h-dvh'}>
                        <DrawerHeader>
                            <DrawerTitle>Report a Bug</DrawerTitle>
                            <DrawerDescription>
                                Help us improve by reporting any bugs you encounter.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="overflow-y-auto px-4 pb-8" style={{ maxHeight: isMobile ? 'calc(85dvh - 120px)' : 'calc(100dvh - 120px)' }}>
                            <ReportBugForm variant="drawer" />
                        </div>
                    </DrawerContent>
                </Drawer>
                <Drawer key={isMobile ? 'feature-mobile' : 'feature-desktop'} direction={isMobile ? 'bottom' : 'right'}>
                    <DrawerTrigger asChild>
                        <Button variant="outline">
                            Request a Feature
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className={isMobile ? '' : 'h-dvh'}>
                        <DrawerHeader>
                            <DrawerTitle>Request a Feature</DrawerTitle>
                            <DrawerDescription>
                                Let us know what features you&apos;d like to see.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="overflow-y-auto px-4 pb-8" style={{ maxHeight: isMobile ? 'calc(85dvh - 120px)' : 'calc(100dvh - 120px)' }}>
                            <RequestFeatureForm variant="drawer" />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </section>
    )
}
