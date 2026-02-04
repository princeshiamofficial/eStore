/**
 * Tracker Script for Color Hut Studio
 * Handles Meta Pixel injection and traffic tracking
 */

(async function () {
    try {
        // 1. Fetch Configuration
        const response = await fetch('/api/public/config');
        const config = await response.json();

        // 2. Inject Meta Pixel if enabled
        if (config.pixel_enabled && config.pixel_id) {
            console.log('Initializing Meta Pixel:', config.pixel_id);

            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', config.pixel_id);
            fbq('track', 'PageView');
        }

        // 3. Track Traffic (Internal Analytics)
        await fetch('/api/public/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source: document.referrer,
                path: window.location.pathname + window.location.search
            })
        });

    } catch (e) {
        console.error('Tracking failed:', e);
    }
})();
