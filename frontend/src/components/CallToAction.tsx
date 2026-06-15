'use client';
import { Button, DrawerContent, DrawerDescription, Drawer, DrawerHeader, DrawerTitle, DrawerTrigger, Heading3, Para, useIsMobile } from '@muzammil328/ui';
import { Bug, Sparkles } from 'lucide-react';
import ReportBugForm from '@/components/forms/ReportBugForm';
import RequestFeatureForm from '@/components/forms/RequestFeatureForm';

export default function CallToAction() {
    const isMobile = useIsMobile();

    return (
        <section className="relative my-16 overflow-hidden rounded-2xl px-6 py-14 text-center">
            {/* gradient background */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        'linear-gradient(135deg, oklch(92% 0.08 176 / 0.25) 0%, oklch(96% 0.04 176 / 0.10) 50%, oklch(90% 0.06 200 / 0.20) 100%)',
                }}
            />

            {/* decorative rings */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-primary/15" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-primary/20" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full border border-primary/15" />

            {/* eyebrow */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                We&apos;re always improving
            </span>

            <Heading3 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                Can&apos;t Find What You&apos;re Looking For?
            </Heading3>
            <Para className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                We&apos;re constantly adding new subjects and resources. Let us know what you need
                and we&apos;ll make it available as soon as possible.
            </Para>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                {/* Report a Bug */}
                <Drawer
                    key={isMobile ? 'report-mobile' : 'report-desktop'}
                    direction={isMobile ? 'bottom' : 'right'}
                >
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            className="gap-2 rounded-full border-border px-6 py-2.5 font-semibold"
                        >
                            <Bug className="h-4 w-4" />
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
                        <div
                            className="overflow-y-auto px-4 pb-8"
                            style={{
                                maxHeight: isMobile
                                    ? 'calc(85dvh - 120px)'
                                    : 'calc(100dvh - 120px)',
                            }}
                        >
                            <ReportBugForm variant="drawer" />
                        </div>
                    </DrawerContent>
                </Drawer>

                {/* Request a Feature */}
                <Drawer
                    key={isMobile ? 'feature-mobile' : 'feature-desktop'}
                    direction={isMobile ? 'bottom' : 'right'}
                >
                    <DrawerTrigger asChild>
                        <Button className="gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-white hover:opacity-90">
                            <Sparkles className="h-4 w-4" />
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
                        <div
                            className="overflow-y-auto px-4 pb-8"
                            style={{
                                maxHeight: isMobile
                                    ? 'calc(85dvh - 120px)'
                                    : 'calc(100dvh - 120px)',
                            }}
                        >
                            <RequestFeatureForm variant="drawer" />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </section>
    );
}
