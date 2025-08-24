import FeaturesSection from "@/components/features-section";
import Header from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
            </main>
        </>
    );
}

function HeroSection() {
    return (
        <section>
            <div className="relative pt-20">
                <div className="-z-10 absolute inset-0 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
                <MaxWidthWrapper className="">
                    <div className="sm:mx-auto lg:mt-0 lg:mr-auto">
                        {/* Desktop App Coming Soon Badge */}
                        <div className="flex justify-start">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 font-medium text-primary text-sm">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                                <span>تطبيق سطح المكتب قريباً</span>
                            </div>
                        </div>

                        <h1 className="mt-4 max-w-2xl text-balance font-medium text-5xl md:text-6xl lg:mt-8">
                            شجّر الأحاديث النبوية وتعلّم علم الإسناد بسهولة{" "}
                        </h1>
                        <p className="mt-8 max-w-2xl text-pretty text-lg">
                            أداة تفاعلية تساعدك على تشجير الأحاديث النبوية، فهم
                            الأسانيد، والتعرّف على الرواة بطريقة مرئية مبسطة
                            تعينك على دراسة علم الحديث بوضوح
                        </p>

                        <div className="mt-12 flex items-center gap-2">
                            <div className="rounded-[calc(var(--radius-xl)+0.125rem)] border bg-foreground/10 p-0.5">
                                <Link
                                    href="/login"
                                    className={buttonVariants({
                                        size: "lg",
                                        className: "rounded-xl px-5 text-base",
                                    })}
                                >
                                    <span className="text-nowrap">
                                        انشئ شجرتك الاولى
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>

                <div className="-mr-56 relative mt-8 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20">
                    <div
                        aria-hidden
                        className="absolute inset-0 z-10 bg-linear-to-b from-35% from-transparent to-background"
                    />
                    <div className="relative inset-shadow-2xs mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-lg shadow-zinc-950/15 ring-1 ring-background dark:inset-shadow-white/20">
                        <Image
                            className="relative hidden aspect-15/8 rounded-2xl bg-background dark:block"
                            src="/hero-dark.png"
                            alt="app screen"
                            width="2700"
                            height="1440"
                        />
                        <Image
                            className="relative z-2 aspect-15/8 rounded-2xl border border-border/25 dark:hidden"
                            src="/hero-light.png"
                            alt="app screen"
                            width="2700"
                            height="1440"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
