'use client';

import { WebBuildLive } from '@/features/showcase/WebBuildLive';
import { WebLiveUpdate } from '@/features/showcase/WebLiveUpdate';
import { WebSpeedDuel } from '@/features/showcase/WebSpeedDuel';
import { WebMobileLead } from '@/features/showcase/WebMobileLead';
import { WebPriceFlip } from '@/features/showcase/WebPriceFlip';

/* =========================================================================
   LandingShowcase: the aiWEB product slot.

   Five sections, and the order is the argument:

     1. Watch one get built. The signature, and the only place the boldness is spent.
        A stranger types his own business name and sees a site assemble while a speed
        gauge climbs. He now knows what we do and that it is fast, without reading.
     2. Watch an owner request become the version customers can actually see.
     3. Why speed is the argument, with the one number in this category that has real
        evidence behind it, and its source printed at the same size.
     4. Watch a phone booking arrive as an owner lead.
     5. Pay once or pay monthly, shown as a shape rather than argued as a price.
   ========================================================================= */

export function LandingShowcase() {
  return (
    <div id="showcase" className="landing-showcase">
      <WebBuildLive />
      <WebLiveUpdate />
      <WebSpeedDuel />
      <WebMobileLead />
      <WebPriceFlip />
    </div>
  );
}
