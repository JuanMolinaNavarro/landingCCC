import { useState, useEffect, lazy, Suspense } from "react";

// The heavy WebGL effect (three.js) is code-split and only fetched on the
// client, after this wrapper mounts. Rendered as a `client:idle` island so
// neither React nor three.js sit on the critical path: the page paints first,
// then the dither effect fades in once the browser is idle.
const Dither = lazy(() => import("./Dither.jsx"));

export default function HeroDither(props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Render nothing on the server and on the first client paint — this avoids
    // server-rendering the WebGL canvas (which needs the DOM) and any hydration
    // mismatch. The effect mounts right after, triggering the dynamic import.
    if (!mounted) return null;

    return (
        <Suspense fallback={null}>
            <Dither {...props} />
        </Suspense>
    );
}
