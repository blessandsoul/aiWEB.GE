'use client';

import { WebBuildLive } from '@/features/showcase/WebBuildLive';
import { WebLiveUpdate } from '@/features/showcase/WebLiveUpdate';
import { WebSpeedDuel } from '@/features/showcase/WebSpeedDuel';
import { WebMobileLead } from '@/features/showcase/WebMobileLead';
import { WebPriceFlip } from '@/features/showcase/WebPriceFlip';

/* =========================================================================
   LandingShowcase: the aiWEB product slot.

   Five sections, in the order a business owner needs them:

     1. Watch a complete example site assemble and try another business type.
     2. Watch an owner request become the version customers can actually see.
     3. Compare a blocked page with a ready-to-use page, without invented revenue claims.
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
