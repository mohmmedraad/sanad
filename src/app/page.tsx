import Header from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Header />
            <main className="pb-20">
                <div className="relative">
                    <MaxWidthWrapper className="relative py-20">
                        <Hero />
                    </MaxWidthWrapper>
                </div>
                <Features />
            </main>
        </div>
    );
}

function Hero() {
    return (
        <section>
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="mb-4 font-bold text-5xl text-foreground leading-[1.1] md:text-6xl">
                    شجّر الأحاديث النبوية وتعلّم علم الإسناد بسهولة
                </h1>
                <p className="mb-6 text-balance text-base text-muted-foreground md:text-xl">
                    أداة تفاعلية تساعدك على تشجير الأحاديث النبوية، فهم
                    الأسانيد، والتعرّف على الرواة بطريقة مرئية مبسطة تعينك على
                    دراسة علم الحديث بوضوح
                </p>
            </div>
            <div className="flex justify-center">
                <Link
                    href="/login"
                    className={buttonVariants({
                        size: "lg",
                    })}
                >
                    أنشئ أول شجرة لك
                </Link>
            </div>
        </section>
    );
}

const features = [
    {
        title: "إضافة الرواة",
        video: "/videos/1.mp4",
        description: "إضافة الراوي يدويًا أو من قائمة الرواة المتوفرة",
    },
    {
        title: "تمييز الرواة",
        video: "/videos/2.mp4",

        description: "تمييز الرواة تلقائيًا حسب درجتهم في علم الحديث",
    },
    {
        title: "كتابة الملاحظات",
        video: "/videos/3.mp4",
        description: "مسودة لكتابة أفكارك واستنتاجاتك حول السند",
    },
    {
        title: "الاستيراد من MindMup",
        video: "/videos/4.mp4",
        description: "استيراد المخططات من MindMup بسهولة",
    },
];

function Features() {
    return (
        <MaxWidthWrapper className="relative py-20">
            <div className="grid gap-8 md:grid-cols-2">
                {features.map((feature) => (
                    <Card key={feature.title} className="overflow-hidden pt-0">
                        <div className="relative aspect-video w-full">
                            <video
                                loop
                                muted
                                autoPlay
                                src={feature.video}
                                className="size-full object-cover"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>
                                {feature.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </MaxWidthWrapper>
    );
}
