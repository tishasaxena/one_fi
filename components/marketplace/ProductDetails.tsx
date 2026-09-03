import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/types";

/**
 * "Relevant product details" — highlights, full specs and the EMI terms, in an
 * accordion so the page stays scannable.
 */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="rounded-2xl border border-border bg-card px-4 shadow-card">
      <Accordion type="multiple" defaultValue={["highlights"]}>
        <AccordionItem value="highlights">
          <AccordionTrigger>Highlights</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="overview">
          <AccordionTrigger>Overview</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specs">
          <AccordionTrigger>Specifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {product.specs.map((group) => (
                <div key={group.group}>
                  <p className="section-label mb-1.5">{group.group}</p>
                  <dl className="divide-y divide-border">
                    {group.items.map((item) => (
                      <div key={item.label} className="flex justify-between gap-4 py-1.5 text-sm">
                        <dt className="text-muted-foreground">{item.label}</dt>
                        <dd className="text-right font-medium">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms">
          <AccordionTrigger>EMI terms</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                No-cost EMI plans carry 0% interest — you repay exactly the purchase amount.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                No processing fee, no down payment and no foreclosure charges.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                Your pledged mutual funds stay invested in your name throughout the tenure.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                Eligibility and limit are subject to your pledged portfolio value.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
