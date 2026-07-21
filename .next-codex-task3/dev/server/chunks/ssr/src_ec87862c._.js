module.exports = [
"[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDemoLoop",
    ()=>createDemoLoop
]);
function createDemoLoop({ target, reducedMotion = false, threshold = 0.35, cycleMs, holdMs = 2000, play, showFinal, reset, stop, Observer = globalThis.IntersectionObserver, pageDocument = globalThis.document, schedule = globalThis.setTimeout, cancelScheduled = globalThis.clearTimeout }) {
    let observer = null;
    let repeatTimer = null;
    let generation = 0;
    let inViewport = false;
    let active = false;
    let detachedReplay = false;
    let controlled = false;
    let cleaned = false;
    const staticFinalState = reducedMotion || typeof Observer !== 'function';
    const pageIsHidden = ()=>Boolean(pageDocument?.hidden);
    const invalidateCallbacks = ()=>{
        generation += 1;
    };
    const clearRepeatTimer = ()=>{
        if (repeatTimer === null) return;
        cancelScheduled(repeatTimer);
        repeatTimer = null;
    };
    const canRepeat = ()=>!cleaned && !controlled && inViewport && !pageIsHidden();
    const scheduleRepeat = ()=>{
        if (!canRepeat()) return;
        const callbackGeneration = generation;
        const scheduledTimer = schedule(()=>{
            if (repeatTimer === scheduledTimer) repeatTimer = null;
            if (callbackGeneration !== generation || !canRepeat()) return;
            active = false;
            stop();
            reset();
            if (!canRepeat()) return;
            active = true;
            play();
            scheduleRepeat();
        }, cycleMs + holdMs);
        repeatTimer = scheduledTimer;
    };
    const stopAndReset = ()=>{
        invalidateCallbacks();
        clearRepeatTimer();
        active = false;
        detachedReplay = false;
        stop();
        reset();
    };
    const startVisiblePass = ()=>{
        if (!canRepeat()) return;
        if (detachedReplay) stopAndReset();
        if (active) return;
        invalidateCallbacks();
        active = true;
        play();
        scheduleRepeat();
    };
    const handleVisibilityChange = ()=>{
        if (cleaned) return;
        if (pageIsHidden()) {
            if (controlled) {
                stop();
                return;
            }
            if (active) stopAndReset();
            return;
        }
        if (!controlled) startVisiblePass();
    };
    const replay = ()=>{
        if (cleaned) return;
        controlled = false;
        invalidateCallbacks();
        clearRepeatTimer();
        active = false;
        stop();
        if (staticFinalState) {
            showFinal();
            return;
        }
        reset();
        active = true;
        play();
        detachedReplay = !canRepeat();
        scheduleRepeat();
    };
    const takeControl = ()=>{
        if (cleaned || controlled) return;
        controlled = true;
        invalidateCallbacks();
        clearRepeatTimer();
        active = false;
        detachedReplay = false;
        stop();
    };
    const cleanup = ()=>{
        if (cleaned) return;
        cleaned = true;
        invalidateCallbacks();
        clearRepeatTimer();
        active = false;
        detachedReplay = false;
        observer?.disconnect();
        pageDocument?.removeEventListener?.('visibilitychange', handleVisibilityChange);
        stop();
    };
    if (staticFinalState) {
        showFinal();
        return {
            replay,
            takeControl,
            cleanup
        };
    }
    observer = new Observer((entries)=>{
        if (cleaned) return;
        const entry = entries.find((candidate)=>candidate.target === target) ?? entries[0];
        if (!entry) return;
        const wasInViewport = inViewport;
        inViewport = entry.isIntersecting !== false && entry.intersectionRatio >= threshold;
        if (controlled) {
            if (wasInViewport && !inViewport) stop();
            return;
        }
        if (!inViewport) {
            if (wasInViewport || active) stopAndReset();
            return;
        }
        if (!pageIsHidden()) startVisiblePass();
    }, {
        threshold
    });
    observer.observe(target);
    pageDocument?.addEventListener?.('visibilitychange', handleVisibilityChange);
    return {
        replay,
        takeControl,
        cleanup
    };
}
}),
"[project]/src/features/showcase/HeroProof.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroProof",
    ()=>HeroProof
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
/* The hero shows a small example site assembling. The ring is build progress,
   not a performance score or a promise about a visitor's future website. */ const CYCLE_MS = 6_200;
const PROGRESS_COMPLETE = 100;
function HeroProof() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.proof');
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }, []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setStage(0);
        setProgress(0);
    }, [
        stop
    ]);
    const play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        reset();
        [
            900,
            1_900,
            3_200,
            4_800
        ].forEach((milliseconds, index)=>{
            timersRef.current.push(setTimeout(()=>setStage(index + 1), milliseconds));
        });
        const startedAt = performance.now();
        const tick = ()=>{
            const sequenceProgress = Math.min((performance.now() - startedAt) / 5_600, 1);
            setProgress(Math.round(PROGRESS_COMPLETE * (1 - Math.pow(1 - sequenceProgress, 3))));
            if (sequenceProgress < 1) rafRef.current = requestAnimationFrame(tick);
            else rafRef.current = null;
        };
        rafRef.current = requestAnimationFrame(tick);
    }, [
        reset
    ]);
    const showFinal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setStage(4);
        setProgress(PROGRESS_COMPLETE);
    }, [
        stop
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const target = rootRef.current;
        if (!target) return;
        const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDemoLoop"])({
            target,
            reducedMotion: Boolean(reduced),
            threshold: 0.35,
            cycleMs: CYCLE_MS,
            holdMs: 2_000,
            play,
            showFinal,
            reset,
            stop
        });
        controllerRef.current = controller;
        return ()=>{
            controller.cleanup();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [
        play,
        reduced,
        reset,
        showFinal,
        stop
    ]);
    const C = 2 * Math.PI * 26;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: "flex min-w-0 items-start gap-3 sm:gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_28px_60px_-40px_rgba(0,0,0,0.5)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 border-b border-[#ececec] bg-[#fafafa] px-3.5 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex gap-1.5",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full bg-[#e5e5e5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full bg-[#e5e5e5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full bg-[#e5e5e5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 min-w-0 flex-1 truncate rounded-md bg-white px-2.5 py-1 font-mono text-[10.5px] text-neutral-900/35 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
                                children: t('url')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[248px] px-5 py-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chunk, {
                                on: stage >= 1,
                                reduced: reduced,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-[#f0f0f0] pb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-display text-[13px] font-extrabold tracking-tight text-neutral-900",
                                            children: t('brand')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden gap-4 text-[10.5px] text-neutral-900/45 sm:flex",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t('nav1')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t('nav2')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chunk, {
                                on: stage >= 2,
                                reduced: reduced,
                                delay: 0.05,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-5 text-balance font-display text-[21px] font-extrabold leading-[1.14] tracking-tight text-neutral-900",
                                        children: t('h1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-pretty text-[12px] leading-relaxed text-[#525252]",
                                        children: t('sub')
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4",
                                children: [
                                    [
                                        1,
                                        2
                                    ].map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chunk, {
                                            on: stage >= 3,
                                            reduced: reduced,
                                            delay: i * 0.08,
                                            className: i === 0 ? 'col-span-2' : '',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-lg bg-[#fafafa] p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mb-2 block h-1 w-6 rounded-full",
                                                        style: {
                                                            background: 'var(--brand)'
                                                        },
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-semibold text-neutral-900",
                                                        children: t(`s${n}`)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        }, n, false, {
                                            fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chunk, {
                                        on: stage >= 4,
                                        reduced: reduced,
                                        delay: 0.06,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full min-h-[54px] items-center justify-center rounded-lg px-2 text-center text-[11px] font-bold text-white",
                                            style: {
                                                background: 'var(--brand)'
                                            },
                                            children: t('cta')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 flex-col items-center rounded-2xl bg-[#0e0e11] px-2.5 py-3 text-center sm:px-3 sm:py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative inline-flex items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "64",
                                height: "64",
                                viewBox: "0 0 64 64",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "32",
                                        cy: "32",
                                        r: "26",
                                        fill: "none",
                                        stroke: "rgba(255,255,255,0.1)",
                                        strokeWidth: "6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "32",
                                        cy: "32",
                                        r: "26",
                                        fill: "none",
                                        stroke: "var(--brand)",
                                        strokeWidth: "6",
                                        strokeLinecap: "round",
                                        strokeDasharray: C,
                                        strokeDashoffset: C - C * progress / 100,
                                        transform: "rotate(-90 32 32)",
                                        style: {
                                            transition: 'stroke-dashoffset 90ms linear'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute font-display text-[17px] font-extrabold tabular-nums text-white",
                                children: progress
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-2 block text-[9px] uppercase leading-tight tracking-wide text-white/35",
                        children: t('speed')
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>controllerRef.current?.replay(),
                        "aria-label": t('replay'),
                        className: "mt-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/55 transition-[transform,color] duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] md:hover:text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                            name: "solar:refresh-bold-duotone",
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/HeroProof.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/HeroProof.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/HeroProof.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/showcase/HeroProof.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function Chunk({ on, reduced, delay = 0, className, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: false,
        animate: on ? {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
        } : {
            opacity: 0,
            y: 10,
            filter: 'blur(4px)'
        },
        transition: {
            delay: reduced ? 0 : delay,
            duration: 0.3,
            ease: [
                0.23,
                1,
                0.32,
                1
            ]
        },
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/features/showcase/HeroProof.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/home/components/LandingHero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingHero",
    ()=>LandingHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$MagneticButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/MagneticButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
// PER-SITE. The one thing in this shared component that every landing must supply for itself:
// the product, in a single frame, above the fold. See src/features/showcase/HeroProof.tsx.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$HeroProof$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/HeroProof.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
/* hex -> normalized [r,g,b] for the WebGL grainient uniforms */ const hexToRgb = (hex)=>{
    const n = hex.replace('#', '');
    return [
        parseInt(n.slice(0, 2), 16) / 255,
        parseInt(n.slice(2, 4), 16) / 255,
        parseInt(n.slice(4, 6), 16) / 255
    ];
};
/* Hero, ported 1:1 from ainow_handoff/index.html (#hero section).
   Copy is i18n-ized via the home.hero namespace. The typewriter word list and
   its prefill are a single comma-joined string per locale. */ /* Hero-lead text style (stable reference so the memoized SplitText below never
   re-renders and the imperative split is never clobbered). */ const HERO_LEAD_STYLE = {
    fontFamily: "var(--font-noto-georgian), 'Noto Sans Georgian', sans-serif",
    fontWeight: 300,
    fontStyle: 'normal',
    color: '#0a0a0a',
    background: 'none',
    WebkitTextFillColor: '#0a0a0a',
    display: 'block',
    letterSpacing: '-0.01em'
};
/* Letter-by-letter rise reveal, ports the handoff's split() verbatim
   (ainow_handoff/index.html, script #1). SSR renders the plain text; on mount
   we split it into .split-char spans via createElement, exactly like the
   handoff's DOMContentLoaded JS, so the CSS `split-rise` fires in-view. */ const SplitText = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function SplitText({ text, className }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = ref.current;
        if (!root || root.querySelector('.split-char')) return; // already split
        const split = (node)=>{
            if (node.nodeType === 3) {
                const value = node.nodeValue ?? '';
                const frag = document.createDocumentFragment();
                const tokens = value.split(/(\s+)/);
                for (const tok of tokens){
                    if (!tok) continue;
                    if (/^\s+$/.test(tok)) {
                        frag.appendChild(document.createTextNode(' '));
                    } else {
                        const wordSpan = document.createElement('span');
                        wordSpan.className = 'split-word';
                        for (const ch of tok){
                            const s = document.createElement('span');
                            s.className = 'split-char';
                            s.textContent = ch;
                            wordSpan.appendChild(s);
                        }
                        frag.appendChild(wordSpan);
                    }
                }
                node.parentNode?.replaceChild(frag, node);
            } else if (node.nodeType === 1 && node.tagName !== 'BR') {
                Array.from(node.childNodes).forEach(split);
            }
        };
        Array.from(root.childNodes).forEach(split);
        root.querySelectorAll('.split-char').forEach((c, i)=>{
            c.style.animationDelay = i * 22 + 'ms';
        });
    }, [
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: className,
        style: HERO_LEAD_STYLE,
        children: text
    }, void 0, false, {
        fileName: "[project]/src/features/home/components/LandingHero.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
});
function LandingHero() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.hero');
    const typewriterWords = t('typewriterWords');
    const typewriterPrefill = t('typewriterPrefill');
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typewriterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [heroScrolled, setHeroScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // When true, the always-on WebGL shader is skipped and a static CSS gradient
    // is shown instead (phones/tablets, low-power, reduced-motion, or after a
    // GPU context loss). See the WebGL effect below for the rationale.
    const [staticBg, setStaticBg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Big hero wordmark fades out on scroll (crossfade with nav logo)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setHeroScrolled(window.scrollY > 30);
        onScroll();
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', onScroll);
    }, []);
    // Typewriter cycler (ported from source)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = typewriterRef.current;
        if (!el) return;
        // Split on ASCII comma plus CJK 、 and Arabic ،, machine translation
        // localizes the list separators (zh/fa), which used to collapse the whole
        // list into one giant "word".
        const words = (el.dataset.words || '').split(/[,、،]/).map((s)=>s.trim()).filter(Boolean);
        if (!words.length) return;
        const textEl = el.querySelector('.tw-text');
        if (!textEl) return;
        const prefill = el.dataset.prefill;
        let startIdx = 0;
        if (prefill && words.includes(prefill)) {
            startIdx = words.indexOf(prefill);
            textEl.textContent = prefill;
        }
        let cancelled = false;
        let timer;
        const measureMaxWidth = ()=>{
            let max = 0;
            const orig = textEl.textContent;
            words.forEach((w)=>{
                textEl.textContent = w;
                const width = textEl.getBoundingClientRect().width;
                if (width > max) max = width;
            });
            textEl.textContent = orig;
            return max;
        };
        const applyMaxWidth = ()=>{
            document.fonts.ready.then(()=>{
                if (cancelled) return;
                const maxW = measureMaxWidth();
                const caret = el.querySelector('.tw-caret');
                const caretW = caret ? caret.getBoundingClientRect().width + 2 : 8;
                el.style.minWidth = `${Math.ceil(maxW + caretW)}px`;
            });
        };
        const onResize = ()=>{
            el.style.minWidth = '';
            applyMaxWidth();
        };
        applyMaxWidth();
        window.addEventListener('resize', onResize);
        const TYPE_MS = 80;
        const DELETE_MS = 40;
        const PAUSE_END = 1800;
        const PAUSE_START = 240;
        let wi = startIdx;
        let ci = prefill ? prefill.length : 0;
        let typing = !prefill;
        const tick = ()=>{
            if (cancelled) return;
            const word = words[wi];
            if (typing) {
                ci += 1;
                textEl.textContent = word.slice(0, ci);
                if (ci >= word.length) {
                    typing = false;
                    timer = setTimeout(tick, PAUSE_END);
                    return;
                }
                timer = setTimeout(tick, TYPE_MS);
            } else {
                ci -= 1;
                textEl.textContent = word.slice(0, ci);
                if (ci <= 0) {
                    typing = true;
                    wi = (wi + 1) % words.length;
                    timer = setTimeout(tick, PAUSE_START);
                    return;
                }
                timer = setTimeout(tick, DELETE_MS);
            }
        };
        timer = setTimeout(tick, PAUSE_END);
        return ()=>{
            cancelled = true;
            if (timer) clearTimeout(timer);
            window.removeEventListener('resize', onResize);
        };
    }, []);
    // Grainient WebGL2 animated gradient background (ported from source).
    // Colors come from the active product's shader; a stable comma-joined key
    // drives the dep array so the effect re-inits only when the product changes,
    // not on every render.
    const shaderKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].shader.join(',');
    const shader = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].shader;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Phones/tablets, low-power and reduced-motion get a static CSS gradient
        // instead of the always-on WebGL shader. iOS Safari & Chrome both run on
        // WebKit and share strict per-tab GPU-memory / WebGL-context limits; on
        // older devices a rotation reallocates this canvas at high DPR and trips
        // webglcontextlost, which broke the whole page. The static fallback is
        // visually near-identical at 0.42 opacity.
        const mq = (q)=>("TURBOPACK compile-time value", "undefined") !== 'undefined' && !!window.matchMedia && window.matchMedia(q).matches;
        if (mq('(max-width: 900px)') || mq('(pointer: coarse)') || mq('(prefers-reduced-motion: reduce)')) //TURBOPACK unreachable
        ;
        const gl = canvas.getContext('webgl2', {
            antialias: false,
            premultipliedAlpha: false
        });
        if (!gl) {
            console.warn('WebGL2 not supported - grainient skipped');
            return;
        }
        const PARAMS = {
            color1: hexToRgb(shader[0]),
            color2: hexToRgb(shader[1]),
            color3: hexToRgb(shader[2]),
            timeSpeed: 0.25,
            colorBalance: 0,
            warpStrength: 1,
            warpFrequency: 5,
            warpSpeed: 2,
            warpAmplitude: 50,
            blendAngle: 0,
            blendSoftness: 0.05,
            rotationAmount: 500,
            noiseScale: 2,
            grainAmount: 0.1,
            grainScale: 2,
            grainAnimated: 0,
            contrast: 1.5,
            gamma: 1,
            saturation: 1,
            centerX: 0,
            centerY: 0,
            zoom: 0.9
        };
        const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
        const FRAG = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  vec3 colLav=uColor1; vec3 colOrg=uColor2; vec3 colDark=uColor3;
  float b=uColorBalance; float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s; float edge1=0.2-b+s;
  float v0=0.5-b+s; float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  o=vec4(col,1.0);
}
void main(){vec4 o=vec4(0.0); mainImage(o,gl_FragCoord.xy); fragColor=o;}`;
        const compile = (type, src)=>{
            const sh = gl.createShader(type);
            if (!sh) return null;
            gl.shaderSource(sh, src);
            gl.compileShader(sh);
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(sh));
                gl.deleteShader(sh);
                return null;
            }
            return sh;
        };
        const vs = compile(gl.VERTEX_SHADER, VERT);
        const fs = compile(gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;
        const prog = gl.createProgram();
        if (!prog) return;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(prog));
            return;
        }
        gl.useProgram(prog);
        // Fullscreen triangle
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1,
            -1,
            3,
            -1,
            -1,
            3
        ]), gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(prog, 'position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        const U = {};
        [
            'iResolution',
            'iTime',
            'uTimeSpeed',
            'uColorBalance',
            'uWarpStrength',
            'uWarpFrequency',
            'uWarpSpeed',
            'uWarpAmplitude',
            'uBlendAngle',
            'uBlendSoftness',
            'uRotationAmount',
            'uNoiseScale',
            'uGrainAmount',
            'uGrainScale',
            'uGrainAnimated',
            'uContrast',
            'uGamma',
            'uSaturation',
            'uCenterOffset',
            'uZoom',
            'uColor1',
            'uColor2',
            'uColor3'
        ].forEach((n)=>{
            U[n] = gl.getUniformLocation(prog, n);
        });
        const resize = ()=>{
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const rect = canvas.getBoundingClientRect();
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);
        let raf = 0;
        let cancelled = false;
        let running = false;
        const t0 = performance.now();
        const render = ()=>{
            if (cancelled || gl.isContextLost()) {
                running = false;
                return;
            }
            const t = (performance.now() - t0) / 1000;
            gl.uniform2f(U.iResolution, canvas.width, canvas.height);
            gl.uniform1f(U.iTime, t);
            gl.uniform1f(U.uTimeSpeed, PARAMS.timeSpeed);
            gl.uniform1f(U.uColorBalance, PARAMS.colorBalance);
            gl.uniform1f(U.uWarpStrength, PARAMS.warpStrength);
            gl.uniform1f(U.uWarpFrequency, PARAMS.warpFrequency);
            gl.uniform1f(U.uWarpSpeed, PARAMS.warpSpeed);
            gl.uniform1f(U.uWarpAmplitude, PARAMS.warpAmplitude);
            gl.uniform1f(U.uBlendAngle, PARAMS.blendAngle);
            gl.uniform1f(U.uBlendSoftness, PARAMS.blendSoftness);
            gl.uniform1f(U.uRotationAmount, PARAMS.rotationAmount);
            gl.uniform1f(U.uNoiseScale, PARAMS.noiseScale);
            gl.uniform1f(U.uGrainAmount, PARAMS.grainAmount);
            gl.uniform1f(U.uGrainScale, PARAMS.grainScale);
            gl.uniform1f(U.uGrainAnimated, PARAMS.grainAnimated);
            gl.uniform1f(U.uContrast, PARAMS.contrast);
            gl.uniform1f(U.uGamma, PARAMS.gamma);
            gl.uniform1f(U.uSaturation, PARAMS.saturation);
            gl.uniform2f(U.uCenterOffset, PARAMS.centerX, PARAMS.centerY);
            gl.uniform1f(U.uZoom, PARAMS.zoom);
            gl.uniform3fv(U.uColor1, PARAMS.color1);
            gl.uniform3fv(U.uColor2, PARAMS.color2);
            gl.uniform3fv(U.uColor3, PARAMS.color3);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = requestAnimationFrame(render);
        };
        const start = ()=>{
            if (running || cancelled || gl.isContextLost()) return;
            running = true;
            raf = requestAnimationFrame(render);
        };
        const stop = ()=>{
            running = false;
            cancelAnimationFrame(raf);
        };
        // If the GPU context is lost (older iOS under memory pressure, e.g. after a
        // rotation), stop the loop and fall back to the static gradient instead of
        // hammering a dead context every frame, the bug that broke the page.
        const onContextLost = (e)=>{
            e.preventDefault();
            cancelled = true;
            stop();
            setStaticBg(true);
        };
        canvas.addEventListener('webglcontextlost', onContextLost, false);
        // Pause when the tab is backgrounded or the hero scrolls out of view ,
        // frees GPU/battery and keeps memory headroom on weak devices.
        const onVisibility = ()=>{
            if (document.hidden) stop();
            else start();
        };
        document.addEventListener('visibilitychange', onVisibility);
        let io = null;
        if (typeof IntersectionObserver !== 'undefined') {
            io = new IntersectionObserver((entries)=>{
                const visible = entries.some((en)=>en.isIntersecting);
                if (visible && !document.hidden) start();
                else stop();
            }, {
                threshold: 0
            });
            io.observe(canvas);
        } else {
            start();
        }
        return ()=>{
            cancelled = true;
            stop();
            canvas.removeEventListener('webglcontextlost', onContextLost);
            document.removeEventListener('visibilitychange', onVisibility);
            io?.disconnect();
            window.removeEventListener('resize', resize);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteBuffer(buf);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        shaderKey
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "hero",
        className: "pt-24 md:pt-32 pb-10 md:pb-12 px-6 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                id: "grainient-canvas",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('grainient-canvas', staticBg && 'grainient-canvas--static')
            }, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingHero.tsx",
                lineNumber: 505,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grainient-fade"
            }, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingHero.tsx",
                lineNumber: 510,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1180px] mx-auto relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-x-16 lg:gap-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 text-center lg:order-0 lg:col-start-1 lg:row-start-1 lg:text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center lg:items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('wordmark-3d hero-wordmark text-[clamp(1.75rem,4vw,2.75rem)] leading-none', heroScrolled && 'scrolled'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "wm-prefix",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].wordmark.prefix
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "wm-mark",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].wordmark.mark
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "wm-accent",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 547,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                            lineNumber: 539,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('hero-tagline', heroScrolled && 'scrolled'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ht-text",
                                                    children: [
                                                        t('taglinePrefix'),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ht-works",
                                                            children: t('taglineWorks')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ht-rule",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                    lineNumber: 538,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "hero-audience mt-7 text-[13px] font-semibold uppercase tracking-[0.09em] text-neutral-900/45 md:text-[13.5px]",
                                    children: t('audience')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    "data-split-text": "1",
                                    className: "mt-3 text-balance leading-[1.12] tracking-tight text-[clamp(1.85rem,3.6vw,3.1rem)] text-neutral-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SplitText, {
                                            className: "hero-lead",
                                            text: t('lead')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                            lineNumber: 569,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            ref: typewriterRef,
                                            className: "typewriter",
                                            "data-words": typewriterWords,
                                            "data-prefill": typewriterPrefill,
                                            /* THE INK, NOT THE FILL. This is the single biggest word on the page and it
                   was painted in --brand, which measured 1.51:1 on aiAPP's lime and 1.60:1 on
                   aiTAXI's yellow: below even the large-text bar, and it read like a highlighter
                   that had run out. --brand-ink is the same hue, darkened until a letterform
                   survives on the page. On aiDOCS and vibecoding, whose brands are already dark
                   enough, the two tokens are the same colour and nothing changes. */ style: {
                                                fontFamily: "'DachiLynx', var(--font-noto-georgian), 'Noto Sans Georgian', sans-serif",
                                                color: 'var(--brand-ink, var(--brand))',
                                                WebkitTextFillColor: 'var(--brand-ink, var(--brand))'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tw-text",
                                                    children: typewriterPrefill
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tw-caret",
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                            lineNumber: 570,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                    lineNumber: 565,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative order-2 lg:order-0 lg:col-start-2 lg:row-start-1 lg:row-span-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$HeroProof$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroProof"], {}, void 0, false, {
                                fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                lineNumber: 602,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                            lineNumber: 601,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-3 text-center lg:order-0 lg:col-start-1 lg:row-start-2 lg:text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mx-auto max-w-xl text-pretty text-[16px] leading-relaxed text-[#525252] lg:mx-0 md:text-[17px]",
                                    children: t('sub')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                    lineNumber: 607,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-extras",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$MagneticButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MagneticButton"], {
                                                className: "w-full sm:w-auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#cta",
                                                    className: "btn-primary w-full justify-center sm:w-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: t('ctaResults')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                            lineNumber: 615,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "18",
                                                            height: "18",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2.5",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                    x1: "5",
                                                                    y1: "12",
                                                                    x2: "19",
                                                                    y2: "12"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                                    lineNumber: 626,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                    points: "12 5 19 12 12 19"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                                    lineNumber: 627,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                lineNumber: 613,
                                                columnNumber: 13
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                            lineNumber: 612,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hero-commitment mx-auto mt-8 max-w-xl text-center lg:mx-0 lg:text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-pretty text-[14px] leading-relaxed text-neutral-900/60 md:text-[15px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle",
                                                            style: {
                                                                background: 'var(--brand)'
                                                            },
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 15
                                                        }, this),
                                                        t('commitment')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 13
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 flex items-center justify-center gap-2.5 text-[13px] text-neutral-900/45 lg:justify-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex h-7 w-7 items-center justify-center rounded-full text-white",
                                                            style: {
                                                                background: 'var(--brand)'
                                                            },
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                name: "solar:shield-check-bold-duotone",
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                                lineNumber: 653,
                                                                columnNumber: 17
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 15
                                                        }, this),
                                                        t('signedBy')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 13
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                            lineNumber: 638,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                                    lineNumber: 611,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingHero.tsx",
                            lineNumber: 606,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/home/components/LandingHero.tsx",
                    lineNumber: 535,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingHero.tsx",
                lineNumber: 534,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/home/components/LandingHero.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/SectionContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionContainer",
    ()=>SectionContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
const SectionContainer = ({ children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("container mx-auto px-4 md:px-6 lg:px-8", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/layout/SectionContainer.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/features/showcase/web-build-models.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BUILD_INDUSTRIES",
    ()=>BUILD_INDUSTRIES,
    "buildPreview",
    ()=>buildPreview,
    "joinAnimatedWords",
    ()=>joinAnimatedWords,
    "normalizeBusinessName",
    ()=>normalizeBusinessName
]);
const BUILD_INDUSTRIES = [
    'i1',
    'i2',
    'i3',
    'i4',
    'i5',
    'i6'
];
const PREVIEWS = {
    i1: {
        theme: {
            accent: '#2563eb',
            soft: '#eaf2ff',
            ink: '#10213d',
            surface: '#f8fbff'
        },
        visual: 'appointment-card',
        heroIcon: 'solar:calendar-mark-bold-duotone',
        serviceIcons: [
            'solar:user-check-rounded-bold-duotone',
            'solar:shield-check-bold-duotone',
            'solar:phone-bold-duotone'
        ],
        proofIcon: 'solar:shield-check-bold-duotone'
    },
    i2: {
        theme: {
            accent: '#c2410c',
            soft: '#fff1e8',
            ink: '#32170d',
            surface: '#fffaf6'
        },
        visual: 'menu-reservation',
        heroIcon: 'solar:heart-bold-duotone',
        serviceIcons: [
            'solar:gallery-bold-duotone',
            'solar:phone-bold-duotone',
            'solar:calendar-mark-bold-duotone'
        ],
        proofIcon: 'solar:user-check-rounded-bold-duotone'
    },
    i3: {
        theme: {
            accent: '#d97706',
            soft: '#fff6df',
            ink: '#2d210f',
            surface: '#fffcf4'
        },
        visual: 'project-estimate',
        heroIcon: 'solar:settings-bold-duotone',
        serviceIcons: [
            'solar:settings-bold-duotone',
            'solar:calculator-bold-duotone',
            'solar:gallery-round-bold-duotone'
        ],
        proofIcon: 'solar:shield-check-bold-duotone'
    },
    i4: {
        theme: {
            accent: '#dc2626',
            soft: '#fff0f0',
            ink: '#301313',
            surface: '#fffafa'
        },
        visual: 'service-status',
        heroIcon: 'solar:settings-bold-duotone',
        serviceIcons: [
            'solar:settings-bold-duotone',
            'solar:bolt-bold-duotone',
            'solar:clock-circle-bold-duotone'
        ],
        proofIcon: 'solar:check-circle-bold-duotone'
    },
    i5: {
        theme: {
            accent: '#db2777',
            soft: '#fff0f7',
            ink: '#321323',
            surface: '#fffafd'
        },
        visual: 'stylist-booking',
        heroIcon: 'solar:calendar-mark-bold-duotone',
        serviceIcons: [
            'solar:user-check-rounded-bold-duotone',
            'solar:heart-bold-duotone',
            'solar:camera-bold-duotone'
        ],
        proofIcon: 'solar:calendar-mark-bold-duotone'
    },
    i6: {
        theme: {
            accent: '#0f766e',
            soft: '#e8faf7',
            ink: '#0f2d2a',
            surface: '#f7fffd'
        },
        visual: 'tour-itinerary',
        heroIcon: 'solar:global-bold-duotone',
        serviceIcons: [
            'solar:camera-bold-duotone',
            'solar:calendar-mark-bold-duotone',
            'solar:user-check-rounded-bold-duotone'
        ],
        proofIcon: 'solar:shield-check-bold-duotone'
    }
};
function normalizeBusinessName(value) {
    const name = String(value ?? '').trim().replace(/\s+/gu, ' ');
    return name ? {
        name,
        fictional: false
    } : {
        name: 'Sample Studio',
        fictional: true
    };
}
function buildPreview(industry, businessName) {
    const id = BUILD_INDUSTRIES.includes(industry) ? industry : BUILD_INDUSTRIES[0];
    const config = PREVIEWS[id];
    const normalized = normalizeBusinessName(businessName);
    return {
        industry: id,
        businessName: normalized.name,
        fictional: normalized.fictional,
        domain: `${slugifyDomain(normalized.name)}.ge`,
        theme: config.theme,
        hero: {
            titleKey: `h1_${id}`,
            subtitleKey: `sub_${id}`,
            visual: config.visual,
            icon: config.heroIcon
        },
        services: config.serviceIcons.map((icon, index)=>({
                labelKey: `s${index + 1}_${id}`,
                icon
            })),
        proof: {
            labelKey: `proof_${id}`,
            valueKey: `proofValue_${id}`,
            icon: config.proofIcon
        },
        contact: {
            phone: '+995 32 2XX XX XX',
            addressKey: `address_${id}`,
            icon: 'solar:phone-bold-duotone'
        },
        cta: {
            labelKey: `cta_${id}`,
            icon: 'solar:arrow-right-bold-duotone'
        }
    };
}
function joinAnimatedWords(value) {
    return String(value ?? '').trim().split(/\s+/u).filter(Boolean).join(' ');
}
function slugifyDomain(value) {
    const ascii = String(value).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/gu, '-').replace(/^-+|-+$/gu, '').slice(0, 24);
    return ascii || 'sample-site';
}
}),
"[project]/src/features/showcase/WebBuildLive.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebBuildLive",
    ()=>WebBuildLive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SectionContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$build$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/web-build-models.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const INDUSTRIES = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$build$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUILD_INDUSTRIES"];
const BUILD_CYCLE_MS = 7_200;
const BUILD_STAGE = {
    chrome: 0,
    nav: 520,
    hero: 1_180,
    visual: 2_100,
    services: 3_050,
    proof: 4_150,
    contact: 4_950,
    done: 5_650
};
function WebBuildLive() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.build');
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const visitorLockedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const autoplayIndustryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(2);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('i3');
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }, []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setStage(-1);
        setProgress(0);
    }, [
        stop
    ]);
    const showFinal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setStage(BUILD_STAGE.done);
        setProgress(100);
    }, [
        stop
    ]);
    const play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        if (!visitorLockedRef.current) {
            const nextIndustry = INDUSTRIES[autoplayIndustryRef.current % INDUSTRIES.length];
            autoplayIndustryRef.current += 1;
            setIndustry(nextIndustry);
        }
        setStage(BUILD_STAGE.chrome);
        setProgress(4);
        Object.values(BUILD_STAGE).slice(1).forEach((milliseconds)=>{
            timersRef.current.push(setTimeout(()=>setStage(milliseconds), milliseconds));
        });
        const startedAt = performance.now();
        const tick = ()=>{
            const elapsed = performance.now() - startedAt;
            const nextProgress = Math.min(elapsed / BUILD_STAGE.done, 1);
            setProgress(Math.max(4, Math.round(nextProgress * 100)));
            if (nextProgress < 1) rafRef.current = requestAnimationFrame(tick);
            else rafRef.current = null;
        };
        rafRef.current = requestAnimationFrame(tick);
    }, [
        stop
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const target = sectionRef.current;
        if (!target) return;
        const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDemoLoop"])({
            target,
            reducedMotion: Boolean(reduced),
            threshold: 0.35,
            cycleMs: BUILD_CYCLE_MS,
            holdMs: 2_000,
            play,
            showFinal,
            reset,
            stop
        });
        controllerRef.current = controller;
        return ()=>{
            controller.cleanup();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [
        play,
        reduced,
        reset,
        showFinal,
        stop
    ]);
    const preview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$build$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPreview"])(industry, name), [
        industry,
        name
    ]);
    const displayName = preview.fictional ? t('sampleName') : preview.businessName;
    const heading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$build$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["joinAnimatedWords"])(t(preview.hero.titleKey));
    const words = heading.split(' ');
    const at = (milliseconds)=>stage >= milliseconds;
    const running = stage >= 0 && stage < BUILD_STAGE.done;
    const finished = stage >= BUILD_STAGE.done;
    const handleNameChange = (nextName)=>{
        visitorLockedRef.current = true;
        controllerRef.current?.takeControl();
        setName(nextName);
        showFinal();
    };
    const handleIndustryChange = (nextIndustry)=>{
        visitorLockedRef.current = true;
        controllerRef.current?.takeControl();
        setIndustry(nextIndustry);
        showFinal();
    };
    const previewStyle = {
        '--preview-accent': preview.theme.accent,
        '--preview-soft': preview.theme.soft,
        '--preview-ink': preview.theme.ink,
        '--preview-surface': preview.theme.surface
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionContainer"], {
        className: "py-20 md:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: sectionRef,
            className: "grid min-w-0 items-start gap-10 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)] xl:gap-14",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 xl:sticky xl:top-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[12px] uppercase tracking-wide text-neutral-900/40",
                            children: t('eyebrow')
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-4 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl",
                            children: t('heading')
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]",
                            children: t('subtitle')
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 min-w-0 rounded-3xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_22px_50px_-38px_rgba(0,0,0,0.4)] sm:p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mb-2 block text-[13px] font-semibold text-neutral-900/65",
                                            children: t('namePlaceholder')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative block min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:pen-2-bold-duotone",
                                                    className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-900/35"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: name,
                                                    onChange: (event)=>handleNameChange(event.target.value),
                                                    placeholder: t('sampleName'),
                                                    className: "h-12 w-full min-w-0 rounded-xl bg-[#fafafa] pl-12 pr-4 text-[15px] text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] outline-none transition-[box-shadow,background-color] duration-150 placeholder:text-neutral-900/30 focus-visible:bg-white focus-visible:shadow-[0_0_0_2px_var(--brand)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-5 block text-[13px] font-semibold text-neutral-900/65",
                                    children: t('industryLabel')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex min-w-0 flex-wrap gap-2",
                                    children: INDUSTRIES.map((item)=>{
                                        const selected = item === industry;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleIndustryChange(item),
                                            "aria-pressed": selected,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('min-h-11 rounded-full px-4 text-[13px] font-semibold', 'transition-[transform,background-color,box-shadow,color] duration-150 active:scale-[0.97]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2', selected ? 'bg-neutral-950 text-white' : 'bg-[#fafafa] text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.07)] md:hover:bg-[#f1f1f1]'),
                                            children: t(item)
                                        }, item, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>controllerRef.current?.replay(),
                                    className: "mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 text-[15px] font-bold text-white transition-[transform,filter] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 md:hover:brightness-110",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                            name: running ? 'solar:settings-bold-duotone' : 'solar:refresh-bold-duotone',
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-5 w-5', running && !reduced && 'animate-spin')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, this),
                                        running ? t('building') : finished ? t('rebuild') : t('buildBtn')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    style: previewStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex min-w-0 items-center justify-between gap-3 px-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex min-w-0 items-center gap-2 text-[12px] font-semibold text-neutral-900/45",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                            name: "solar:monitor-bold-duotone",
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: t('previewLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this),
                                preview.fictional && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full bg-neutral-900/[0.05] px-3 text-[11px] font-semibold text-neutral-900/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                            name: "solar:shield-check-bold-duotone",
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this),
                                        t('sampleBadge')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 overflow-hidden rounded-[28px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_36px_80px_-48px_rgba(0,0,0,0.5)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 items-center gap-3 border-b border-neutral-900/[0.07] bg-[#f7f7f8] px-3 py-3 sm:px-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden shrink-0 gap-1.5 sm:flex",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-2.5 w-2.5 rounded-full bg-neutral-900/10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-2.5 w-2.5 rounded-full bg-neutral-900/10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-2.5 w-2.5 rounded-full bg-neutral-900/10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg bg-white px-3 text-[11px] text-neutral-900/40 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] sm:text-[12px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:global-bold-duotone",
                                                    className: "h-4 w-4 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: preview.domain
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>controllerRef.current?.replay(),
                                            "aria-label": t('replay'),
                                            className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-neutral-900/45 transition-[transform,background-color,color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-accent)] md:hover:bg-white md:hover:text-neutral-900",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: "solar:refresh-bold-duotone",
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 bg-[var(--preview-surface)] p-3 sm:p-5 md:p-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                            show: at(BUILD_STAGE.nav),
                                            reduced: reduced,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                className: "flex min-w-0 items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:px-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 truncate font-display text-[15px] font-extrabold tracking-tight text-[var(--preview-ink)]",
                                                        children: displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden shrink-0 items-center gap-5 text-[11px] font-medium text-neutral-900/45 sm:flex",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: t('nav1')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: t('nav2')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: t('nav3')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 grid min-w-0 gap-3 md:grid-cols-[minmax(0,1.08fr)_minmax(210px,0.92fr)] md:gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                                    show: at(BUILD_STAGE.hero),
                                                    reduced: reduced,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-full min-w-0 flex-col justify-between rounded-3xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:p-7",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--preview-soft)] text-[var(--preview-accent)]",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                            name: preview.hero.icon,
                                                                            className: "h-6 w-6"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                            lineNumber: 276,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 275,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "mt-5 max-w-lg text-balance font-display text-[28px] font-extrabold leading-[1.08] tracking-tight text-[var(--preview-ink)] sm:text-[34px]",
                                                                        children: words.map((word, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                                                initial: reduced ? false : {
                                                                                    opacity: 0,
                                                                                    y: 9,
                                                                                    filter: 'blur(4px)'
                                                                                },
                                                                                animate: {
                                                                                    opacity: 1,
                                                                                    y: 0,
                                                                                    filter: 'blur(0px)'
                                                                                },
                                                                                transition: {
                                                                                    delay: reduced ? 0 : index * 0.07,
                                                                                    duration: 0.28
                                                                                },
                                                                                className: "inline-block",
                                                                                children: [
                                                                                    word,
                                                                                    index < words.length - 1 ? ' ' : ''
                                                                                ]
                                                                            }, `${word}-${index}`, true, {
                                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                                lineNumber: 280,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 278,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 max-w-lg text-pretty text-[13px] leading-relaxed text-neutral-900/55 sm:text-[14px]",
                                                                        children: t(preview.hero.subtitleKey)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 291,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[var(--preview-accent)] px-5 text-[12px] font-bold text-white",
                                                                children: [
                                                                    t(preview.cta.labelKey),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                        name: preview.cta.icon,
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 297,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                                    show: at(BUILD_STAGE.visual),
                                                    reduced: reduced,
                                                    delay: 0.06,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewVisual, {
                                                        visual: preview.hero.visual,
                                                        icon: preview.hero.icon,
                                                        services: preview.services.map((service)=>t(service.labelKey))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 271,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                            show: at(BUILD_STAGE.services),
                                            reduced: reduced,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "mt-3 min-w-0 rounded-3xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-900/35",
                                                        children: t('servicesLabel')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 grid min-w-0 gap-2 sm:grid-cols-3",
                                                        children: preview.services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex min-h-[76px] min-w-0 items-center gap-3 rounded-2xl bg-[var(--preview-soft)] px-4 py-3 text-[var(--preview-ink)]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/75 text-[var(--preview-accent)]",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                            name: service.icon,
                                                                            className: "h-5 w-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                            lineNumber: 323,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 322,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "min-w-0 text-[12px] font-bold leading-snug",
                                                                        children: t(service.labelKey)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 325,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, service.labelKey, true, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                                    show: at(BUILD_STAGE.proof),
                                                    reduced: reduced,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex min-h-[112px] min-w-0 items-center gap-4 rounded-3xl bg-[var(--preview-ink)] p-5 text-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[var(--preview-accent)]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                    name: preview.proof.icon,
                                                                    className: "h-6 w-6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                    lineNumber: 338,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-[11px] font-medium text-white/50",
                                                                        children: t(preview.proof.labelKey)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "mt-1 block text-pretty text-[14px] font-bold leading-snug",
                                                                        children: t(preview.proof.valueKey)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 344,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                                    show: at(BUILD_STAGE.contact),
                                                    reduced: reduced,
                                                    delay: 0.06,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex min-h-[112px] min-w-0 flex-col justify-center rounded-3xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-900/35",
                                                                children: t('contactLabel')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 353,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-3 flex min-w-0 items-center gap-2 text-[12px] font-bold text-[var(--preview-ink)]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                        name: preview.contact.icon,
                                                                        className: "h-4 w-4 text-[var(--preview-accent)]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 357,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: preview.contact.phone
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 358,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-2 flex min-w-0 items-center gap-2 text-[11px] text-neutral-900/50",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                        name: "solar:global-bold-duotone",
                                                                        className: "h-4 w-4 text-[var(--preview-accent)]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 361,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: t(preview.contact.addressKey)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 360,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 334,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageChunk, {
                                            show: at(BUILD_STAGE.done),
                                            reduced: reduced,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex min-w-0 flex-col gap-3 rounded-3xl bg-[var(--preview-accent)] p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex min-w-0 items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                name: "solar:check-circle-bold-duotone",
                                                                className: "h-6 w-6 shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "min-w-0 text-pretty text-[13px] font-bold leading-snug",
                                                                children: t('ready')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-[12px] font-bold text-[var(--preview-ink)]",
                                                        children: [
                                                            t(preview.cta.labelKey),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                name: preview.cta.icon,
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                                lineNumber: 369,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 min-w-0 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:px-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 items-center justify-between gap-3 text-[11px] font-semibold text-neutral-900/45",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: t('progressLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 387,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 tabular-nums text-neutral-900/65",
                                            children: [
                                                progress,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                            lineNumber: 388,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    role: "progressbar",
                                    "aria-valuemin": 0,
                                    "aria-valuemax": 100,
                                    "aria-valuenow": progress,
                                    className: "mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-900/[0.07]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                        className: "block h-full rounded-full bg-[var(--preview-accent)]",
                                        animate: {
                                            width: `${progress}%`
                                        },
                                        transition: {
                                            duration: reduced ? 0 : 0.18,
                                            ease: 'easeOut'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 385,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
function StageChunk({ show, reduced, delay = 0, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: false,
        animate: show ? {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
        } : {
            opacity: 0,
            y: 10,
            filter: 'blur(5px)'
        },
        transition: {
            delay: reduced ? 0 : delay,
            duration: reduced ? 0 : 0.28
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('min-w-0', !show && 'pointer-events-none'),
        "aria-hidden": !show,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
        lineNumber: 422,
        columnNumber: 5
    }, this);
}
function PreviewVisual({ visual, icon, services }) {
    const shell = 'h-full min-h-[248px] min-w-0 overflow-hidden rounded-3xl bg-[var(--preview-soft)] p-4 text-[var(--preview-ink)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] sm:p-5';
    if (visual === 'appointment-card') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualTitle, {
                    icon: icon,
                    label: services[0]
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 452,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 grid grid-cols-2 gap-2",
                    children: [
                        '09:30',
                        '11:00',
                        '13:30',
                        '16:00'
                    ].map((time, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-h-11 items-center justify-center rounded-xl bg-white text-[12px] font-bold', index === 1 && 'bg-[var(--preview-accent)] text-white'),
                            children: time
                        }, time, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 455,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 453,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex items-center gap-2 rounded-xl bg-white/75 p-3 text-[11px] font-semibold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                            name: "solar:user-check-rounded-bold-duotone",
                            className: "h-5 w-5 text-[var(--preview-accent)]"
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 467,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: services[1]
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 468,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 466,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
            lineNumber: 451,
            columnNumber: 7
        }, this);
    }
    if (visual === 'menu-reservation') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualTitle, {
                    icon: icon,
                    label: services[0]
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 477,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 space-y-2",
                    children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-11 items-center justify-between gap-3 rounded-xl bg-white px-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate text-[11px] font-bold",
                                    children: service
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 481,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 rounded-full bg-[var(--preview-accent)]/20",
                                    style: {
                                        width: `${30 + index * 9}px`
                                    },
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 482,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, service, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 480,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 478,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 h-11 rounded-xl bg-[var(--preview-accent)]",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
            lineNumber: 476,
            columnNumber: 7
        }, this);
    }
    if (visual === 'project-estimate') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualTitle, {
                    icon: icon,
                    label: services[1]
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 498,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 rounded-2xl bg-white p-4",
                    children: [
                        76,
                        52,
                        88
                    ].map((width, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-3', index > 0 && 'mt-4'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: "solar:check-circle-bold-duotone",
                                    className: "h-5 w-5 text-[var(--preview-accent)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 502,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 flex-1 overflow-hidden rounded-full bg-neutral-900/[0.07]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block h-full rounded-full bg-[var(--preview-accent)]",
                                        style: {
                                            width: `${width}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                        lineNumber: 504,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 503,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, width, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 501,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 499,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 truncate text-[11px] font-bold",
                    children: services[2]
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 512,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
            lineNumber: 497,
            columnNumber: 7
        }, this);
    }
    if (visual === 'service-status') {
        const icons = [
            'solar:settings-bold-duotone',
            'solar:bolt-bold-duotone',
            'solar:check-circle-bold-duotone'
        ];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualTitle, {
                    icon: icon,
                    label: services[0]
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 521,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 space-y-2",
                    children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-[52px] items-center gap-3 rounded-xl bg-white px-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--preview-soft)] text-[var(--preview-accent)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                        name: icons[index],
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                        lineNumber: 526,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 525,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0 flex-1 truncate text-[11px] font-bold",
                                    children: service
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 528,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 w-2 shrink-0 rounded-full bg-[var(--preview-accent)]",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, service, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 524,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 522,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
            lineNumber: 520,
            columnNumber: 7
        }, this);
    }
    if (visual === 'stylist-booking') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--preview-accent)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                name: "solar:user-check-rounded-bold-duotone",
                                className: "h-7 w-7"
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                lineNumber: 542,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 541,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block truncate text-[12px] font-extrabold",
                                    children: services[0]
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 545,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-1 block truncate text-[10px] text-neutral-900/45",
                                    children: services[1]
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 544,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 540,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 grid grid-cols-3 gap-2",
                    children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex aspect-square items-center justify-center rounded-xl bg-white text-[var(--preview-accent)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                name: index === 2 ? 'solar:camera-bold-duotone' : 'solar:gallery-bold-duotone',
                                className: "h-6 w-6"
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                lineNumber: 552,
                                columnNumber: 15
                            }, this)
                        }, service, false, {
                            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 549,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 h-11 rounded-xl bg-[var(--preview-accent)]",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 559,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
            lineNumber: 539,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: shell,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualTitle, {
                icon: icon,
                label: services[0]
            }, void 0, false, {
                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                lineNumber: 566,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-5 space-y-3 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-[var(--preview-accent)]/25",
                children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex min-h-11 items-center gap-3 rounded-xl bg-white px-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--preview-accent)] text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: index === 0 ? 'solar:global-bold-duotone' : index === 1 ? 'solar:camera-bold-duotone' : 'solar:calendar-mark-bold-duotone',
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                    lineNumber: 571,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                lineNumber: 570,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 truncate text-[11px] font-bold",
                                children: service
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                                lineNumber: 576,
                                columnNumber: 13
                            }, this)
                        ]
                    }, service, true, {
                        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                        lineNumber: 569,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
        lineNumber: 565,
        columnNumber: 5
    }, this);
}
function VisualTitle({ icon, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-w-0 items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--preview-accent)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                    name: icon,
                    className: "h-5 w-5"
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                    lineNumber: 588,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 truncate text-[12px] font-extrabold",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
                lineNumber: 590,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/showcase/WebBuildLive.tsx",
        lineNumber: 586,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/showcase/web-demo-models.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LIVE_UPDATE_STAGES",
    ()=>LIVE_UPDATE_STAGES,
    "MOBILE_LEAD_STAGES",
    ()=>MOBILE_LEAD_STAGES,
    "createTimelinePlayer",
    ()=>createTimelinePlayer,
    "liveUpdateFrame",
    ()=>liveUpdateFrame,
    "mobileLeadFrame",
    ()=>mobileLeadFrame,
    "nextStage",
    ()=>nextStage
]);
const LIVE_UPDATE_STAGES = [
    'request',
    'editing',
    'refreshing',
    'published'
];
const MOBILE_LEAD_STAGES = [
    'visiting',
    'service-selected',
    'submitted',
    'delivered'
];
const LIVE_UPDATE_FRAMES = {
    request: {
        editorVersion: 'old',
        liveVersion: 'old',
        status: 'request',
        resultKey: null
    },
    editing: {
        editorVersion: 'editing',
        liveVersion: 'old',
        status: 'editing',
        resultKey: null
    },
    refreshing: {
        editorVersion: 'new',
        liveVersion: 'old',
        status: 'refreshing',
        resultKey: null
    },
    published: {
        editorVersion: 'new',
        liveVersion: 'new',
        status: 'published',
        resultKey: 'published'
    }
};
const MOBILE_LEAD_BASE = {
    visit: 'phone',
    phone: '+995 5XX XXX XXX',
    fictional: true
};
const MOBILE_LEAD_FRAMES = {
    visiting: {
        ...MOBILE_LEAD_BASE,
        serviceSelected: false,
        formStatus: 'idle',
        ownerInbox: 'empty',
        resultKey: null
    },
    'service-selected': {
        ...MOBILE_LEAD_BASE,
        serviceSelected: true,
        formStatus: 'idle',
        ownerInbox: 'empty',
        resultKey: null
    },
    submitted: {
        ...MOBILE_LEAD_BASE,
        serviceSelected: true,
        formStatus: 'sent',
        ownerInbox: 'empty',
        resultKey: null
    },
    delivered: {
        ...MOBILE_LEAD_BASE,
        serviceSelected: true,
        formStatus: 'sent',
        ownerInbox: 'new-lead',
        resultKey: 'leadCreated'
    }
};
function nextStage(stages, current) {
    if (stages.length === 0) return undefined;
    const currentIndex = stages.indexOf(current);
    if (currentIndex < 0) return stages[0];
    return stages[Math.min(currentIndex + 1, stages.length - 1)];
}
function liveUpdateFrame(stage) {
    return LIVE_UPDATE_FRAMES[stage] ?? LIVE_UPDATE_FRAMES.request;
}
function mobileLeadFrame(stage) {
    return MOBILE_LEAD_FRAMES[stage] ?? MOBILE_LEAD_FRAMES.visiting;
}
function createTimelinePlayer({ stages, onStage, duration = 7_200, reducedMotion = false, setTimeoutFn = setTimeout, clearTimeoutFn = clearTimeout }) {
    let timers = [];
    const cancel = ()=>{
        timers.forEach((timer)=>clearTimeoutFn(timer));
        timers = [];
    };
    const play = ()=>{
        cancel();
        if (stages.length === 0) return;
        if (reducedMotion) {
            onStage(stages[stages.length - 1]);
            return;
        }
        onStage(stages[0]);
        if (stages.length === 1) return;
        const interval = duration / (stages.length - 1);
        timers = stages.slice(1).map((stage, index)=>setTimeoutFn(()=>onStage(stage), interval * (index + 1)));
    };
    const reset = ()=>{
        cancel();
        if (stages.length > 0) onStage(stages[0]);
    };
    const showFinal = ()=>{
        cancel();
        if (stages.length > 0) onStage(stages[stages.length - 1]);
    };
    return {
        play,
        replay: play,
        cancel,
        reset,
        showFinal
    };
}
}),
"[project]/src/features/showcase/WebLiveUpdate.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebLiveUpdate",
    ()=>WebLiveUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SectionContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/web-demo-models.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const STEP_ICONS = [
    'solar:chat-round-dots-bold-duotone',
    'solar:pen-new-square-bold-duotone',
    'solar:refresh-bold-duotone',
    'solar:check-circle-bold-duotone'
];
const CYCLE_MS = 7_200;
function WebLiveUpdate() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.liveUpdate');
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIVE_UPDATE_STAGES"][0]);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const player = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTimelinePlayer"])({
            stages: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIVE_UPDATE_STAGES"],
            duration: CYCLE_MS,
            onStage: (nextStage)=>setStage(nextStage)
        });
        const target = sectionRef.current;
        if (!target) return;
        const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDemoLoop"])({
            target,
            reducedMotion: Boolean(reduced),
            threshold: 0.35,
            cycleMs: CYCLE_MS,
            holdMs: 2_000,
            play: player.play,
            showFinal: player.showFinal,
            reset: player.reset,
            stop: player.cancel
        });
        controllerRef.current = controller;
        return ()=>{
            controller.cleanup();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [
        reduced
    ]);
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["liveUpdateFrame"])(stage);
    const activeIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIVE_UPDATE_STAGES"].indexOf(stage);
    const editorValue = frame.editorVersion === 'old' ? t('oldValue') : t('newValue');
    const liveValue = frame.liveVersion === 'old' ? t('oldValue') : t('newValue');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionContainer"], {
        className: "py-20 md:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: sectionRef,
            className: "grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(260px,360px)_1fr] lg:gap-14",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[12px] uppercase tracking-wide text-neutral-900/40",
                            children: t('eyebrow')
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl",
                            children: t('heading')
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]",
                            children: t('subtitle')
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "mt-7 space-y-3",
                            "aria-label": t('heading'),
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIVE_UPDATE_STAGES"].map((item, index)=>{
                                const reached = index <= activeIndex;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    "aria-current": item === stage ? 'step' : undefined,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] transition-colors duration-200', item === stage ? 'bg-white text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.07)]' : 'text-neutral-900/40'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', reached ? 'bg-[var(--brand)] text-[#0e0e11]' : 'bg-neutral-900/[0.06]'),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: STEP_ICONS[index],
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                lineNumber: 97,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "line-clamp-2",
                                            children: item === 'request' ? t('request') : t(item)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 99,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item, true, {
                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>controllerRef.current?.replay(),
                            className: "mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: "solar:refresh-bold-duotone",
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                t('replay')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 overflow-hidden rounded-3xl bg-[#0e0e11] p-4 text-white shadow-[0_24px_60px_-34px_rgba(0,0,0,0.55)] md:p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: reduced ? false : {
                                opacity: 0.55,
                                y: -5
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: reduced ? 0 : 0.25
                            },
                            className: "ml-auto max-w-[330px] rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-[13px] leading-relaxed text-neutral-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-900/35",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                            name: "solar:chat-round-dots-bold-duotone",
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        t('eyebrow')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                t('request')
                            ]
                        }, `request-${stage}`, true, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] md:items-stretch",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl bg-white/[0.06] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-h-8 items-center gap-2 text-[12px] text-white/55",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:pen-new-square-bold-duotone",
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: stage === 'request' ? t('request') : t(frame.status)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 rounded-xl bg-white p-5 text-neutral-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block h-2 w-20 rounded-full bg-neutral-900/10",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-3 block h-2 w-32 rounded-full bg-neutral-900/10",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                    mode: "wait",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                                        initial: reduced ? false : {
                                                            opacity: 0,
                                                            y: 8
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            y: 0
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            y: -8
                                                        },
                                                        transition: {
                                                            duration: reduced ? 0 : 0.24
                                                        },
                                                        className: "mt-8 font-display text-3xl font-extrabold tabular-nums",
                                                        children: editorValue
                                                    }, editorValue, false, {
                                                        fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-11 items-center justify-center",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                        name: "solar:arrow-right-bold-duotone",
                                        className: "h-[22px] w-[22px] rotate-90 text-[var(--brand)] md:rotate-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative overflow-hidden rounded-2xl bg-white text-neutral-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 border-b border-neutral-900/[0.06] bg-[#fafafa] px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:global-bold-duotone",
                                                    className: "h-3.5 w-3.5 text-neutral-900/35"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-neutral-900/40",
                                                    children: "yourclinic.ge"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative min-h-[190px] p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block h-2 w-24 rounded-full bg-neutral-900/10",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-3 block h-2 w-36 rounded-full bg-neutral-900/10",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                    mode: "wait",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                                        initial: reduced ? false : {
                                                            opacity: 0,
                                                            scale: 0.94
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            scale: 0.94
                                                        },
                                                        transition: {
                                                            duration: reduced ? 0 : 0.28
                                                        },
                                                        className: "mt-8 font-display text-3xl font-extrabold tabular-nums",
                                                        children: liveValue
                                                    }, liveValue, false, {
                                                        fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 17
                                                }, this),
                                                stage === 'refreshing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    initial: reduced ? false : {
                                                        y: -16
                                                    },
                                                    animate: {
                                                        y: 150
                                                    },
                                                    transition: {
                                                        duration: 1.1,
                                                        repeat: Infinity,
                                                        ease: 'linear'
                                                    },
                                                    className: "absolute inset-x-0 top-0 h-px bg-[var(--brand)] shadow-[0_0_18px_var(--brand)]",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this),
                                                stage === 'published' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[var(--brand)] px-3 py-1 text-[11px] font-bold text-[#0e0e11]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                            name: "solar:check-circle-bold-duotone",
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 21
                                                        }, this),
                                                        t('published')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 min-h-[58px]",
                            "aria-live": "polite",
                            children: frame.resultKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: reduced ? false : {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "flex min-h-[58px] items-center gap-3 rounded-2xl bg-[var(--brand)] px-4 text-[14px] font-bold text-[#0e0e11]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                        name: "solar:check-circle-bold-duotone",
                                        className: "h-[18px] w-[18px]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                        lineNumber: 209,
                                        columnNumber: 17
                                    }, this),
                                    t('outcome')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                                lineNumber: 204,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/showcase/WebLiveUpdate.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/showcase/web-speed-layout.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SPEED_FEEL_GRID_TEMPLATE",
    ()=>SPEED_FEEL_GRID_TEMPLATE,
    "SPEED_FEEL_LAYOUT",
    ()=>SPEED_FEEL_LAYOUT,
    "measureSpeedFeelLayout",
    ()=>measureSpeedFeelLayout
]);
const SPEED_FEEL_LAYOUT = Object.freeze({
    gapPx: 8,
    inlinePaddingPx: 12,
    // 262 px cannot fit two 128 px controls plus the gap; 435.15625 px fits all three.
    minButtonWidthPx: 128,
    minTapHeightPx: 44
});
const SPEED_FEEL_GRID_TEMPLATE = 'repeat(auto-fit, minmax(min(100%, 128px), 1fr))';
function measureSpeedFeelLayout({ controlsWidthPx, labelWidthsPx }) {
    const availableColumns = Math.floor((controlsWidthPx + SPEED_FEEL_LAYOUT.gapPx) / (SPEED_FEEL_LAYOUT.minButtonWidthPx + SPEED_FEEL_LAYOUT.gapPx));
    const columns = Math.max(1, Math.min(availableColumns, labelWidthsPx.length));
    const buttonWidthPx = (controlsWidthPx - SPEED_FEEL_LAYOUT.gapPx * (columns - 1)) / columns;
    return {
        columns,
        buttonWidthPx,
        labels: labelWidthsPx.map((labelWidthPx)=>({
                contained: SPEED_FEEL_LAYOUT.inlinePaddingPx + labelWidthPx <= buttonWidthPx,
                padded: SPEED_FEEL_LAYOUT.inlinePaddingPx * 2 + labelWidthPx <= buttonWidthPx
            }))
    };
}
}),
"[project]/src/features/showcase/WebSpeedDuel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSpeedDuel",
    ()=>WebSpeedDuel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SectionContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$speed$2d$layout$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/web-speed-layout.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const FEELS = [
    'slow',
    'ok',
    'fast'
];
const CYCLE_MS = 7_000;
function WebSpeedDuel() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.speed');
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [feel, setFeel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('slow');
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    }, []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setFeel('slow');
    }, [
        stop
    ]);
    const play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        reset();
        timersRef.current = [
            setTimeout(()=>setFeel('ok'), 2_300),
            setTimeout(()=>setFeel('fast'), 4_700)
        ];
    }, [
        reset
    ]);
    const showFinal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setFeel('fast');
    }, [
        stop
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const target = rootRef.current;
        if (!target) return;
        const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDemoLoop"])({
            target,
            reducedMotion: Boolean(reduced),
            threshold: 0.35,
            cycleMs: CYCLE_MS,
            holdMs: 2_000,
            play,
            showFinal,
            reset,
            stop
        });
        controllerRef.current = controller;
        return ()=>{
            controller.cleanup();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [
        play,
        reduced,
        reset,
        showFinal,
        stop
    ]);
    const chooseFeel = (nextFeel)=>{
        controllerRef.current?.takeControl();
        setFeel(nextFeel);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionContainer"], {
        className: "py-20 md:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: rootRef,
            className: "min-w-0 overflow-hidden rounded-[32px] bg-[#0e0e11] p-5 text-white shadow-[0_34px_80px_-48px_rgba(0,0,0,0.7)] sm:p-7 md:p-10 lg:p-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid min-w-0 gap-10 xl:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] xl:gap-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] uppercase tracking-wide text-white/40",
                                children: t('eyebrow')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-4 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl",
                                children: t('heading')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-white/55",
                                children: t('subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-7 min-w-0 rounded-2xl bg-white/[0.05] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] sm:p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[12px] font-semibold text-white/55",
                                        children: t('yours')
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 grid min-w-0 gap-2",
                                        style: {
                                            gridTemplateColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$speed$2d$layout$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPEED_FEEL_GRID_TEMPLATE"]
                                        },
                                        children: FEELS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>chooseFeel(item),
                                                "aria-pressed": feel === item,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('min-h-[44px] min-w-0 rounded-xl px-3 text-[13px] font-semibold', 'transition-[transform,background-color,color] duration-150 active:scale-[0.97]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]', feel === item ? 'bg-[var(--brand)] text-[#0e0e11]' : 'bg-white/[0.06] text-white/60 md:hover:bg-white/10'),
                                                children: t(item)
                                            }, item, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 101,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-6 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex min-w-0 items-start gap-3 text-[13px] leading-relaxed text-white/65",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: "solar:smartphone-bold-duotone",
                                                className: "mt-0.5 h-5 w-5 text-[var(--brand)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t('check1')
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex min-w-0 items-start gap-3 text-[13px] leading-relaxed text-white/65",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: "solar:gallery-bold-duotone",
                                                className: "mt-0.5 h-5 w-5 text-[var(--brand)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t('check2')
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex min-w-0 items-start gap-3 text-[13px] leading-relaxed text-white/65",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: "solar:shield-check-bold-duotone",
                                                className: "mt-0.5 h-5 w-5 text-[var(--brand)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t('check3')
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>controllerRef.current?.replay(),
                                className: "mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-bold text-[#0e0e11] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                        name: "solar:refresh-bold-duotone",
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    t('replay')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 rounded-3xl bg-white/[0.04] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] sm:p-5 md:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid min-w-0 gap-3 md:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrowserCard, {
                                        label: t('currentLabel'),
                                        siteName: t('siteName'),
                                        feel: feel,
                                        variant: "current",
                                        reduced: Boolean(reduced)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrowserCard, {
                                        label: t('improvedLabel'),
                                        siteName: t('siteName'),
                                        feel: "fast",
                                        variant: "improved",
                                        reduced: Boolean(reduced)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: reduced ? false : {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: reduced ? 0 : 0.25
                                },
                                "aria-live": "polite",
                                className: "mt-3 flex min-w-0 items-start gap-3 rounded-2xl bg-[var(--brand)] p-4 text-[#0e0e11] sm:items-center sm:p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0e0e11]/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                            name: "solar:bolt-bold-duotone",
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "min-w-0 text-pretty text-[13px] font-bold leading-relaxed sm:text-[14px]",
                                        children: t(`result_${feel}`)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, feel, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
function BrowserCard({ label, siteName, feel, variant, reduced }) {
    const progress = feel === 'slow' ? 34 : feel === 'ok' ? 68 : 100;
    const contentOpacity = feel === 'slow' ? 0.24 : feel === 'ok' ? 0.62 : 1;
    const highlighted = variant === 'improved';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('min-w-0 overflow-hidden rounded-2xl bg-white text-[#0e0e11]', highlighted && 'shadow-[0_0_0_2px_var(--brand),0_20px_45px_-30px_var(--brand)]'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 items-center gap-2 border-b border-neutral-900/[0.07] bg-[#f7f7f8] px-3 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex shrink-0 gap-1",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-2 w-2 rounded-full bg-neutral-900/10"
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-2 w-2 rounded-full bg-neutral-900/10"
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 flex-1 truncate text-[10px] font-semibold text-neutral-900/40",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                        name: highlighted ? 'solar:bolt-bold-duotone' : 'solar:clock-circle-bold-duotone',
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-4 w-4', highlighted ? 'text-[var(--brand)]' : 'text-neutral-900/30')
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1 bg-neutral-900/[0.06]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                    className: "block h-full bg-[var(--brand)]",
                    animate: {
                        width: `${progress}%`
                    },
                    transition: {
                        duration: reduced ? 0 : 0.5,
                        ease: 'easeOut'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    opacity: contentOpacity
                },
                transition: {
                    duration: reduced ? 0 : 0.35
                },
                className: "min-h-[292px] p-4 sm:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 border-b border-neutral-900/[0.06] pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2 text-[11px] font-extrabold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                        name: "solar:global-bold-duotone",
                                        className: "h-4 w-4 text-[var(--brand)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, this),
                                    siteName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-2 w-14 rounded-full bg-neutral-900/10",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-[minmax(0,1fr)_72px] items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block h-3 w-full max-w-32 rounded-full bg-neutral-900/80"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-2 block h-3 w-4/5 rounded-full bg-neutral-900/80"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-3 block h-2 w-full rounded-full bg-neutral-900/10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-2 block h-2 w-3/4 rounded-full bg-neutral-900/10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex aspect-square items-center justify-center rounded-2xl bg-[var(--brand)]/15 text-[var(--brand)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: "solar:gallery-bold-duotone",
                                    className: "h-8 w-8"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-3 gap-2",
                        children: [
                            'solar:calendar-mark-bold-duotone',
                            'solar:user-check-rounded-bold-duotone',
                            'solar:phone-bold-duotone'
                        ].map((icon)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex min-h-[58px] items-center justify-center rounded-xl bg-neutral-900/[0.04] text-[var(--brand)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: icon,
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this)
                            }, icon, false, {
                                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#0e0e11] text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                            name: "solar:arrow-right-bold-duotone",
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/showcase/WebSpeedDuel.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/showcase/WebMobileLead.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebMobileLead",
    ()=>WebMobileLead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SectionContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/web-demo-models.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const STEP_KEYS = [
    'visitor',
    'selected',
    'formSent',
    'leadCreated'
];
const CYCLE_MS = 7_200;
function WebMobileLead() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.mobileLead');
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOBILE_LEAD_STAGES"][0]);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const player = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTimelinePlayer"])({
            stages: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOBILE_LEAD_STAGES"],
            duration: CYCLE_MS,
            onStage: (nextStage)=>setStage(nextStage)
        });
        const target = sectionRef.current;
        if (!target) return;
        const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDemoLoop"])({
            target,
            reducedMotion: Boolean(reduced),
            threshold: 0.35,
            cycleMs: CYCLE_MS,
            holdMs: 2_000,
            play: player.play,
            showFinal: player.showFinal,
            reset: player.reset,
            stop: player.cancel
        });
        controllerRef.current = controller;
        return ()=>{
            controller.cleanup();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [
        reduced
    ]);
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mobileLeadFrame"])(stage);
    const activeIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOBILE_LEAD_STAGES"].indexOf(stage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionContainer"], {
        className: "py-20 md:py-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] uppercase tracking-wide text-neutral-900/40",
                                children: t('eyebrow')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl",
                                children: t('heading')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]",
                                children: t('subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>controllerRef.current?.replay(),
                        className: "inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                name: "solar:refresh-bold-duotone",
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            t('replay')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: sectionRef,
                className: "mt-10 min-w-0 overflow-hidden rounded-3xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-7",
                style: {
                    background: 'color-mix(in srgb, var(--brand) 8%, white)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "grid grid-cols-4 gap-2",
                        "aria-label": t('heading'),
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$web$2d$demo$2d$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOBILE_LEAD_STAGES"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                "aria-current": item === stage ? 'step' : undefined,
                                className: "min-w-0 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mx-auto block h-2.5 w-2.5 rounded-full transition-colors duration-200', index <= activeIndex ? 'bg-[var(--brand)]' : 'bg-neutral-900/15')
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-2 line-clamp-2 text-[10px] leading-tight md:text-[11px]', item === stage ? 'font-semibold text-neutral-900' : 'text-neutral-900/35'),
                                        children: t(STEP_KEYS[index])
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item, true, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-7 grid items-center gap-4 md:grid-cols-[minmax(220px,300px)_80px_minmax(260px,1fr)] md:justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto w-full max-w-[300px] rounded-[2rem] bg-[#0e0e11] p-2 shadow-[0_20px_44px_-28px_rgba(0,0,0,0.5)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[1.55rem] bg-white p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mx-auto h-1.5 w-14 rounded-full bg-neutral-900/15",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex items-center gap-2 text-[12px] font-semibold text-neutral-900/55",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:smartphone-bold-duotone",
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, this),
                                                t('visitor')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-5 rounded-2xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-colors duration-300', frame.serviceSelected && 'bg-[var(--brand)]/10 shadow-[0_0_0_2px_var(--brand)]'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[13px] font-bold text-neutral-900",
                                                    children: t('service')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this),
                                                frame.serviceSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    initial: reduced ? false : {
                                                        opacity: 0,
                                                        y: 5
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    className: "mt-3 flex items-center gap-2 text-[11px] font-semibold text-neutral-900/65",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                            name: "solar:check-circle-bold-duotone",
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 21
                                                        }, this),
                                                        t('selected')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded-xl bg-[#fafafa] px-4 py-3 text-[12px] tabular-nums text-neutral-900/50",
                                            children: frame.phone
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full text-[12px] font-bold transition-colors duration-300', frame.formStatus === 'sent' ? 'bg-[#0e0e11] text-white' : 'bg-neutral-900/[0.07] text-neutral-900/35'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:arrow-right-bold-duotone",
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this),
                                                t('formSent')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-center text-[10px] leading-relaxed text-neutral-900/35",
                                            children: t('fictional')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex h-14 items-center justify-center md:h-28",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute h-full w-px bg-neutral-900/10 md:h-px md:w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    frame.formStatus === 'sent' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                        initial: reduced ? false : {
                                            y: -20,
                                            x: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            y: 0,
                                            x: 0,
                                            opacity: 1
                                        },
                                        className: "z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-[#0e0e11] shadow-[0_0_18px_color-mix(in_srgb,var(--brand)_65%,transparent)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: "solar:arrow-down-bold-duotone",
                                                className: "h-[17px] w-[17px] md:hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                lineNumber: 144,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                name: "solar:arrow-right-bold-duotone",
                                                className: "hidden h-[17px] w-[17px] md:block"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                lineNumber: 145,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, `transfer-${stage}`, true, {
                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-h-[285px] rounded-2xl bg-[#0e0e11] p-5 text-white shadow-[0_20px_44px_-30px_rgba(0,0,0,0.55)] md:p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-4 border-b border-white/10 pb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-[13px] font-semibold text-white/65",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                        name: "solar:chat-round-dots-bold-duotone",
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 17
                                                    }, this),
                                                    t('ownerInbox')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-8 w-8 items-center justify-center rounded-full', frame.ownerInbox === 'new-lead' ? 'bg-[var(--brand)] text-[#0e0e11]' : 'bg-white/[0.06] text-white/30'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                    name: "solar:user-plus-rounded-bold-duotone",
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                lineNumber: 156,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5",
                                        "aria-live": "polite",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            children: frame.ownerInbox === 'new-lead' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: reduced ? false : {
                                                    opacity: 0,
                                                    y: 10
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                className: "rounded-2xl bg-white p-5 text-neutral-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2 text-[12px] font-bold text-[var(--brand-ink)]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                                                name: "solar:check-circle-bold-duotone",
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 23
                                                            }, this),
                                                            t('leadCreated')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-4 text-[14px] font-bold",
                                                        children: t('service')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-[12px] tabular-nums text-neutral-900/45",
                                                        children: frame.phone
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-5 border-t border-neutral-900/[0.07] pt-4 text-[13px] font-semibold leading-relaxed",
                                                        children: t('outcome')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, "lead", true, {
                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                exit: {
                                                    opacity: 0
                                                },
                                                className: "space-y-3",
                                                "aria-hidden": "true",
                                                children: [
                                                    0,
                                                    1,
                                                    2
                                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block h-12 rounded-xl bg-white/[0.045]"
                                                    }, item, false, {
                                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, this))
                                            }, "empty", false, {
                                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                                lineNumber: 178,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/showcase/WebMobileLead.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/showcase/WebPriceFlip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebPriceFlip",
    ()=>WebPriceFlip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Ico.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SectionContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/lib/demo-loop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
/* =========================================================================
   WebPriceFlip: the argument made without a price.

   The owner's instinct is that paying once is cheaper than paying monthly. Over 24 months
   that instinct is arithmetically reasonable and strategically wrong, and no paragraph is
   going to convince him of it.

   So the widget stops arguing and shows him the shape. Two identical timelines. On the
   pay-once side the work stops at week two and the rest of the timeline is empty, because
   that is what actually happens. On the monthly side the small, boring jobs keep landing:
   a price changed, a page added, a form fixed, an SSL renewed.

   No number appears anywhere in it, deliberately. The point is not that monthly is cheaper.
   The point is what you get in month eleven.
   ========================================================================= */ const MONTHS = 24;
/* When each job lands on the monthly plan. Irregular on purpose: real maintenance is lumpy,
   and an evenly spaced row of ticks would read as a decoration rather than a record. */ const WORK = [
    {
        m: 1,
        key: 'w2'
    },
    {
        m: 2,
        key: 'w3'
    },
    {
        m: 4,
        key: 'w1'
    },
    {
        m: 5,
        key: 'w4'
    },
    {
        m: 7,
        key: 'w2'
    },
    {
        m: 9,
        key: 'w8'
    },
    {
        m: 11,
        key: 'w5'
    },
    {
        m: 12,
        key: 'w6'
    },
    {
        m: 14,
        key: 'w2'
    },
    {
        m: 15,
        key: 'w1'
    },
    {
        m: 17,
        key: 'w3'
    },
    {
        m: 18,
        key: 'w7'
    },
    {
        m: 20,
        key: 'w2'
    },
    {
        m: 21,
        key: 'w4'
    },
    {
        m: 23,
        key: 'w1'
    }
];
/* The one-off plan. Two things happen, then nothing does. */ const ONCE_WORK = [
    {
        m: 0,
        key: 'w1'
    },
    {
        m: 1,
        key: 'w4'
    }
];
const CYCLE_MS = 6_400;
function WebPriceFlip() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.flip');
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('once');
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    }, []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setMode('once');
    }, [
        stop
    ]);
    const play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        reset();
        timersRef.current = [
            setTimeout(()=>setMode('monthly'), 3_400)
        ];
    }, [
        reset
    ]);
    const showFinal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stop();
        setMode('monthly');
    }, [
        stop
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const target = rootRef.current;
        if (!target) return;
        const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$lib$2f$demo$2d$loop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDemoLoop"])({
            target,
            reducedMotion: Boolean(reduced),
            threshold: 0.35,
            cycleMs: CYCLE_MS,
            holdMs: 2_000,
            play,
            showFinal,
            reset,
            stop
        });
        controllerRef.current = controller;
        return ()=>{
            controller.cleanup();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [
        play,
        reduced,
        reset,
        showFinal,
        stop
    ]);
    const chooseMode = (next)=>{
        controllerRef.current?.takeControl();
        setMode(next);
    };
    const work = mode === 'once' ? ONCE_WORK : WORK;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SectionContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionContainer"], {
        className: "py-20 md:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: rootRef,
            className: "mx-auto min-w-0 max-w-5xl lg:ml-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[12px] uppercase tracking-wide text-neutral-900/40",
                                    children: t('eyebrow')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-4 max-w-2xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl",
                                    children: t('heading')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]",
                                    children: t('subtitle')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>controllerRef.current?.replay(),
                            className: "inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: "solar:refresh-bold-duotone",
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                t('replay')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 inline-flex rounded-full bg-[#f0f0f0] p-1",
                    children: [
                        'once',
                        'monthly'
                    ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>chooseMode(m),
                            "aria-pressed": mode === m,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[14px] font-semibold sm:px-6', 'transition-[transform,background-color,color] duration-150 ease-out', 'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2', mode === m ? 'bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'text-neutral-900/50'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                                    name: m === 'once' ? 'solar:rocket-bold-duotone' : 'solar:refresh-bold-duotone',
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, this),
                                t(m)
                            ]
                        }, m, true, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-5 text-[14px] font-medium text-neutral-900/60",
                    children: t(`${mode}Label`)
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 overflow-hidden rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-end gap-[3px]",
                            style: {
                                height: 148
                            },
                            children: Array.from({
                                length: MONTHS
                            }, (_, i)=>{
                                const jobs = work.filter((w)=>w.m === i);
                                const has = jobs.length > 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group relative flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            // scaleY only: no height animation, so nothing here triggers layout
                                            initial: false,
                                            animate: {
                                                scaleY: has ? 1 : 0.06
                                            },
                                            transition: {
                                                duration: reduced ? 0 : 0.34,
                                                delay: reduced ? 0 : i * 0.018,
                                                ease: [
                                                    0.23,
                                                    1,
                                                    0.32,
                                                    1
                                                ]
                                            },
                                            className: "origin-bottom rounded-t-[3px]",
                                            style: {
                                                height: 120,
                                                background: has ? 'var(--brand)' : '#e0e0e0'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                            lineNumber: 173,
                                            columnNumber: 19
                                        }, this),
                                        has && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 md:block",
                                            children: t(jobs[0].key)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                            lineNumber: 189,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-2 block text-center text-[9px] tabular-nums text-neutral-900/25",
                                            children: i % 6 === 0 ? i : ''
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-1 flex items-baseline justify-between text-[11px] uppercase tracking-wide text-neutral-900/35",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: t('launch')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        MONTHS,
                                        " ",
                                        t('month')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: reduced ? false : {
                        opacity: 0,
                        y: 8
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.28,
                        ease: [
                            0.23,
                            1,
                            0.32,
                            1
                        ]
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-6 flex max-w-2xl min-w-0 items-start gap-3 rounded-2xl p-4 text-pretty text-[15px] leading-relaxed', mode === 'once' ? 'bg-neutral-900/[0.04] text-neutral-900/70' : 'bg-[var(--brand)]/10 text-neutral-900'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Ico$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ico"], {
                            name: mode === 'once' ? 'solar:clock-circle-bold-duotone' : 'solar:shield-check-bold-duotone',
                            className: "mt-0.5 h-5 w-5 text-[var(--brand-ink)]"
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: t(`${mode}End`)
                        }, void 0, false, {
                            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    ]
                }, mode, true, {
                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-[12px] leading-relaxed text-[#737373]",
                    children: t('note')
                }, void 0, false, {
                    fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/showcase/WebPriceFlip.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/home/components/LandingShowcase.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingShowcase",
    ()=>LandingShowcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebBuildLive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/WebBuildLive.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebLiveUpdate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/WebLiveUpdate.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebSpeedDuel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/WebSpeedDuel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebMobileLead$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/WebMobileLead.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebPriceFlip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/showcase/WebPriceFlip.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function LandingShowcase() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "showcase",
        className: "landing-showcase",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebBuildLive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebBuildLive"], {}, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingShowcase.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebLiveUpdate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebLiveUpdate"], {}, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingShowcase.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebSpeedDuel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSpeedDuel"], {}, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingShowcase.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebMobileLead$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebMobileLead"], {}, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingShowcase.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$showcase$2f$WebPriceFlip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebPriceFlip"], {}, void 0, false, {
                fileName: "[project]/src/features/home/components/LandingShowcase.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/home/components/LandingShowcase.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/home/components/LandingWork.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingWork",
    ()=>LandingWork
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function LandingWork() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.work');
    const STEPS = [
        {
            num: '01',
            title: t('s1Title'),
            tag: t('s1Tag'),
            desc: t('s1Desc')
        },
        {
            num: '02',
            title: t('s2Title'),
            tag: t('s2Tag'),
            desc: t('s2Desc')
        },
        {
            num: '03',
            title: t('s3Title'),
            tag: t('s3Tag'),
            desc: t('s3Desc')
        },
        {
            num: '04',
            title: t('s4Title'),
            tag: t('s4Tag'),
            desc: t('s4Desc')
        },
        {
            num: '05',
            title: t('s5Title'),
            tag: t('s5Tag'),
            desc: t('s5Desc')
        },
        {
            num: '06',
            title: t('s6Title'),
            tag: t('s6Tag'),
            desc: t('s6Desc')
        }
    ];
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const items = root.querySelectorAll('.fade-up');
        if (!items.length || !('IntersectionObserver' in window)) {
            items.forEach((el)=>el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver((entries)=>{
            entries.forEach((e)=>{
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });
        items.forEach((el)=>io.observe(el));
        return ()=>io.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: rootRef,
        id: "work",
        className: "py-20 md:py-32 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-16 md:mb-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-mono uppercase tracking-[0.3em] text-[#525252] mb-4",
                            children: t('eyebrow')
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingWork.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "fade-up font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl mx-auto text-neutral-900",
                            children: [
                                t('headingPre'),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                    lineNumber: 59,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#525252]",
                                    children: t('headingAccent')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                    lineNumber: 59,
                                    columnNumber: 36
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingWork.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-px bg-[#e5e5e5]",
                    children: STEPS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-12 gap-4 md:gap-6 p-6 md:p-10 bg-white hover:bg-[#fafafa] transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-1 font-mono text-[#525252] text-2xl",
                                    children: s.num
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-11 md:col-span-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-display font-bold text-2xl text-neutral-900",
                                            children: s.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-mono text-(--brand)",
                                            children: s.tag
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-12 md:col-span-8 text-base text-[#525252] leading-relaxed",
                                    children: s.desc
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s.num, true, {
                            fileName: "[project]/src/features/home/components/LandingWork.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingWork.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/home/components/LandingWork.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/home/components/LandingWork.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/home/components/LandingFaq.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingFaq",
    ()=>LandingFaq
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const DUR = 420;
// Whole-card toggle with the source's smooth max-height/opacity animation.
function toggleFaq(e) {
    const det = e.currentTarget;
    const body = det.querySelector('.faq-body');
    if (!body) return;
    // Clicks inside the OPEN answer are ignored so the text stays readable/selectable.
    if (det.open && body.contains(e.target)) return;
    e.preventDefault();
    if (det.dataset.animating === '1') return;
    det.dataset.animating = '1';
    if (det.open) {
        // CLOSE: snap from current height -> 0
        const h = body.scrollHeight;
        body.style.maxHeight = h + 'px';
        body.style.opacity = '1';
        body.style.marginTop = '1rem';
        det.classList.remove('is-open');
        void body.offsetHeight; // reflow
        requestAnimationFrame(()=>{
            body.style.maxHeight = '0px';
            body.style.opacity = '0';
            body.style.marginTop = '0';
            setTimeout(()=>{
                det.open = false;
                body.style.maxHeight = '';
                body.style.opacity = '';
                body.style.marginTop = '';
                det.dataset.animating = '';
            }, DUR);
        });
    } else {
        // OPEN: native open -> animate 0 -> scrollHeight
        det.open = true;
        body.style.maxHeight = '0px';
        body.style.opacity = '0';
        body.style.marginTop = '0';
        void body.offsetHeight; // reflow
        requestAnimationFrame(()=>{
            const h = body.scrollHeight;
            body.style.maxHeight = h + 'px';
            body.style.opacity = '1';
            body.style.marginTop = '1rem';
            det.classList.add('is-open');
            setTimeout(()=>{
                body.style.maxHeight = 'none';
                det.dataset.animating = '';
            }, DUR);
        });
    }
}
const makeBrandMark = (prefix, mark)=>()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "brand-mark",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bm-prefix",
                    children: prefix
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                    lineNumber: 73,
                    columnNumber: 32
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bm-mark",
                    children: mark
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                    lineNumber: 73,
                    columnNumber: 75
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
            lineNumber: 73,
            columnNumber: 3
        }, ("TURBOPACK compile-time value", void 0));
function LandingFaq() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.faq');
    const brandMark = makeBrandMark(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].wordmark.prefix, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].wordmark.mark);
    // HOW MANY QUESTIONS IS A PER-SITE FACT, so it is counted, not declared. This loop was a
    // hardcoded 14 and it broke twice for the same reason: once when it ran to 15 against 14 keys
    // (MISSING_MESSAGE on every build), and again when aiTAXI arrived with 10. A shared component
    // that hardcodes the length of a per-site list is a coupling that will keep breaking, so it
    // now walks until the copy runs out.
    const FAQS = [];
    // q1 alone: it is the one that can carry the inline brand wordmark.
    FAQS.push({
        q: t.rich('q1', {
            brand: brandMark
        }),
        a: t('a1')
    });
    for(let n = 2; t.has(`q${n}`) && t.has(`a${n}`); n += 1){
        FAQS.push({
            q: t(`q${n}`),
            a: t(`a${n}`)
        });
    }
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Scroll-triggered fade-up (source-exact), scoped to this section.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const items = root.querySelectorAll('.fade-up');
        if (!items.length || !('IntersectionObserver' in window)) {
            items.forEach((el)=>el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver((entries)=>{
            entries.forEach((e)=>{
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });
        items.forEach((el)=>io.observe(el));
        return ()=>io.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: rootRef,
        id: "faq",
        className: "py-20 md:py-32 px-6 border-t border-[#e5e5e5]/60",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-16 md:mb-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-mono uppercase tracking-[0.3em] text-[#525252] mb-4",
                            children: "FAQ"
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "fade-up font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight text-neutral-900",
                            children: [
                                t('headingPre'),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                    lineNumber: 122,
                                    columnNumber: 148
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: t('headingAccent')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                    lineNumber: 122,
                                    columnNumber: 154
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-6 text-[#525252]",
                            children: t('subtitle')
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: FAQS.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            onClick: toggleFaq,
                            className: "faq-item group border border-[#e5e5e5] rounded-2xl p-6 bg-white open:bg-[#fafafa]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "flex items-center justify-between cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-display font-bold text-xl text-neutral-900",
                                            children: f.q
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 text-[#525252] transition-transform",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M12 4v16m8-8H4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                                lineNumber: 130,
                                                columnNumber: 132
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "faq-body",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[#525252] leading-relaxed",
                                            children: f.a
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                            lineNumber: 132,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                        lineNumber: 132,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingFaq.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/home/components/LandingFaq.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/home/components/LandingFaq.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/common/Reveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Reveal({ children, className, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 24,
            filter: 'blur(8px)'
        },
        whileInView: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
        },
        viewport: {
            once: true,
            amount: 0.3
        },
        transition: {
            duration: 0.6,
            delay,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/common/Reveal.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/contact/schemas/contact.schema.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contactFormSchema",
    ()=>contactFormSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
;
const contactFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, "Phone number is too short").max(20).regex(/^[+\d\s()-]+$/, "Invalid phone number").optional(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(120).optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email").max(254).optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(5000).optional()
}).refine((d)=>Boolean(d.phone || d.email), {
    message: "Provide a phone number or email",
    path: [
        "phone"
    ]
});
}),
"[project]/src/features/home/components/LandingCta.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingCta",
    ()=>LandingCta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Reveal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$MagneticButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/MagneticButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$contact$2f$schemas$2f$contact$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/contact/schemas/contact.schema.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
// facebook-pixel was stripped from this lean build; no-op keeps the call sites intact.
const trackLead = (_args)=>{};
;
function LandingCta() {
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('contact');
    const tc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.cta');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { register, handleSubmit, formState: { errors }, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$contact$2f$schemas$2f$contact$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactFormSchema"])
    });
    // Submit to the same endpoint the old contact form used (/api/contact →
    // Telegram notification). Phone-only lead, we call back within 24h.
    const onSubmit = async (data)=>{
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: data.phone
                })
            });
            if (res.ok) {
                trackLead({
                    content_name: 'cta-phone'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t('successTitle'), {
                    description: t('successMessage')
                });
                reset();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(t('errorMessage'));
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(t('errorMessage'));
        } finally{
            setIsSubmitting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const cleanups = [];
        // --- Scroll-triggered fade-up ---
        const items = root.querySelectorAll('.fade-up');
        if (!items.length || !('IntersectionObserver' in window)) {
            items.forEach((el)=>el.classList.add('in'));
        } else {
            const io = new IntersectionObserver((entries)=>{
                entries.forEach((e)=>{
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -60px 0px'
            });
            items.forEach((el)=>io.observe(el));
            cleanups.push(()=>io.disconnect());
        }
        // --- Magnet, buttons pull toward cursor (source-exact) ---
        root.querySelectorAll('.magnet').forEach((el)=>{
            const strength = el.classList.contains('magnet-strong') ? 0.32 : 0.2;
            const onMove = (e)=>{
                const r = el.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            };
            const onLeave = ()=>{
                el.style.transform = '';
            };
            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);
            cleanups.push(()=>{
                el.removeEventListener('mousemove', onMove);
                el.removeEventListener('mouseleave', onLeave);
            });
        });
        // --- Click Spark, particles explode from click point (source-exact) ---
        root.querySelectorAll('.click-spark').forEach((el)=>{
            const onClick = (e)=>{
                const x = e.clientX, y = e.clientY;
                for(let i = 0; i < 12; i++){
                    const s = document.createElement('div');
                    s.className = 'spark';
                    s.style.left = x + 'px';
                    s.style.top = y + 'px';
                    const angle = Math.PI * 2 * i / 12 + Math.random() * 0.3;
                    const dist = 42 + Math.random() * 40;
                    const ex = Math.cos(angle) * dist;
                    const ey = Math.sin(angle) * dist;
                    s.style.setProperty('--spark-end', `translate(${ex}px, ${ey}px)`);
                    document.body.appendChild(s);
                    setTimeout(()=>s.remove(), 740);
                }
            };
            el.addEventListener('click', onClick);
            cleanups.push(()=>el.removeEventListener('click', onClick));
        });
        return ()=>cleanups.forEach((fn)=>fn());
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: rootRef,
        id: "cta",
        className: "py-20 md:py-32 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1280px] mx-auto relative overflow-hidden rounded-3xl [clip-path:inset(0_round_1.5rem)] border border-[#e5e5e5] bg-gradient-to-br from-white via-neutral-50 to-white p-8 md:p-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-32 -right-32 w-[500px] h-[500px] bg-(--brand)/30 rounded-full blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-(--brand-soft)/25 rounded-full blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl mx-auto text-neutral-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "gradient-text",
                                        children: tc('heading')
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-6 text-lg text-[#525252] max-w-xl mx-auto",
                                    children: tc('subtitle')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingCta.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit(onSubmit),
                            className: "mt-10 max-w-md mx-auto text-left rounded-2xl border border-[#e5e5e5] bg-white p-6 md:p-8 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "cta-phone",
                                            className: "block text-xs font-mono uppercase tracking-[0.2em] text-[#525252] mb-2",
                                            children: tc('phoneLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "cta-phone",
                                            type: "tel",
                                            inputMode: "tel",
                                            autoComplete: "tel",
                                            placeholder: "+995 5XX XX XX XX",
                                            disabled: isSubmitting,
                                            ...register('phone'),
                                            "aria-invalid": !!errors.phone,
                                            "aria-describedby": errors.phone ? 'cta-phone-error' : undefined,
                                            className: "w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-neutral-900 focus:border-neutral-900 focus:outline-none transition disabled:opacity-60"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            id: "cta-phone-error",
                                            role: "alert",
                                            "aria-live": "polite",
                                            className: "mt-2 text-sm text-red-600",
                                            children: errors.phone.message
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                            lineNumber: 161,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$MagneticButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MagneticButton"], {
                                    className: "block w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        className: "click-spark w-full px-6 py-4 rounded-xl bg-neutral-900 text-white font-medium [transition:background-color_.18s_ease,transform_.18s_cubic-bezier(.2,.8,.2,1)] will-change-transform hover:bg-neutral-800 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed motion-reduce:transition-none motion-reduce:active:scale-100",
                                        children: isSubmitting ? t('submitting') : tc('phoneSubmit')
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-xs text-[#525252]",
                                    children: tc('phoneNote')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingCta.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-8 text-sm text-[#525252]",
                            children: [
                                tc('orWrite'),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "mailto:CONTACT@aiNOW.GE",
                                    className: "underline hover:text-neutral-900",
                                    children: "CONTACT@aiNOW.GE"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                                    lineNumber: 169,
                                    columnNumber: 70
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/LandingCta.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/home/components/LandingCta.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/home/components/LandingCta.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/home/components/LandingCta.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/home/components/LandingWordmark.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingWordmark",
    ()=>LandingWordmark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function LandingWordmark() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('product.wordmark');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "px-6 pb-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1280px] mx-auto flex flex-col items-center gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "wordmark-3d footer-wordmark text-[clamp(2rem,12vw,7rem)] md:text-[clamp(4rem,14vw,16rem)] leading-none max-w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "wm-prefix",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].wordmark.prefix
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
                            lineNumber: 19,
                            columnNumber: 140
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "wm-mark",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].wordmark.mark
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
                            lineNumber: 19,
                            columnNumber: 197
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "wm-accent",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
                            lineNumber: 19,
                            columnNumber: 250
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-lg md:text-xl text-[#525252]",
                    children: t('line')
                }, void 0, false, {
                    fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/home/components/LandingWordmark.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_ec87862c._.js.map