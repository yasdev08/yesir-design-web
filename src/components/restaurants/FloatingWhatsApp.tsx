import type { RestaurantsCopy } from "@/content/restaurants-copy";
import { WaLink } from "./ContactLinks";

/** Always-visible WhatsApp button on phones (hidden from md up, where the header button is in view). */
export function FloatingWhatsApp({ copy }: { copy: RestaurantsCopy }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
        <WaLink message={copy.messages.base} track="floating" className="pointer-events-auto w-full rounded-full text-lg shadow-[0_12px_32px_-6px_rgb(0_0_0/0.7)]">
          {copy.floating}
        </WaLink>
      </div>
    </>
  );
}
