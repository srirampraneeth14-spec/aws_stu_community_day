import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQ as FAQS } from "@/data/event";

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="9"
            eyebrow="FAQ"
            title={
              <>
                Answers, <span className="text-gradient-cool">before you ask.</span>
              </>
            }
            subtitle="Missing something? Drop us a line in the contact section below."
          />
          <Accordion.Root type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <Accordion.Item
                key={f.q}
                value={`item-${i}`}
                className="glass overflow-hidden rounded-2xl"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-white transition-colors hover:bg-white/5 data-[state=open]:bg-white/5">
                    <span className="text-base font-semibold">{f.q}</span>
                    <Plus className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm text-white/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-5 pb-5 pt-1 leading-relaxed">{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
