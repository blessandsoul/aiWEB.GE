'use client';

import { WebBuildLive } from '@/features/showcase/WebBuildLive';
import { WebSpeedDuel } from '@/features/showcase/WebSpeedDuel';
import { WebPriceFlip } from '@/features/showcase/WebPriceFlip';

/* =========================================================================
   LandingShowcase: the aiWEB product slot.

   Three sections, and the order is the argument:

     1. Watch one get built. The signature, and the only place the boldness is spent.
        A stranger types his own business name and sees a site assemble while a speed
        gauge climbs. He now knows what we do and that it is fast, without reading.
     2. Why speed is the argument, with the one number in this category that has real
        evidence behind it, and its source printed at the same size.
     3. Pay once or pay monthly, shown as a shape rather than argued as a price.

   There is no fourth section on purpose. The taste law is to spend the boldness once and
   keep everything around it quiet, and a fourth spectacle here would only make the first
   one read as decoration.
   ========================================================================= */

export function LandingShowcase() {
  return (
    <div id="showcase" className="landing-showcase">
      <WebBuildLive />
      <WebSpeedDuel />
      <WebPriceFlip />
    </div>
  );
}
