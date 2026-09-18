// Assumes readyplus.js has already been loaded.


// 1. Basic element readiness
ReadyPlus.watch({
  selector: '#hero-banner',

  onReady: function (element, log) {
    element.classList.add('target-ready');
    log('Hero is ready', element);
  },

  onTimeout: function (details) {
    console.warn('Hero did not appear in time', details);
  }
});


// 2. Wait for a dynamically rendered Target region
ReadyPlus.watch({
  selector: '.personalized-hero',
  strategy: 'auto',
  once: true,
  visible: true,
  waitForImages: true,
  assetTimeout: 2500,

  onReady: function (element) {
    // The element exists, is visible, and its images have completed.
    element.classList.add('experience-visible');
  }
});


// 3. Custom readiness condition
ReadyPlus.watch({
  selector: '.target-offer-container',
  readyWhen: function (element) {
    return element.dataset.targetOfferApplied === 'true';
  },

  onReady: function (element) {
    console.log('Target offer is fully applied', element);
  }
});


// 4. Scope the search to reduce browser work
var productGrid = document.querySelector('.product-grid');

if (productGrid) {
  ReadyPlus.watch({
    root: productGrid,
    selector: '.recommendation-card',
    once: true,

    onReady: function (card) {
      card.setAttribute('data-enhanced', 'true');
    }
  });
}


// 5. SPA route changes
ReadyPlus.watch({
  selector: '[data-page-view="checkout"]',
  strategy: 'auto',
  once: false,
  stableFor: 50,
  events: [
    'pageshow',
    {
      type: 'app:route-rendered',
      target: window
    }
  ],

  onReady: function (element) {
    // Make this callback idempotent.
    if (element.dataset.readyPlusApplied === 'true') {
      return;
    }

    element.dataset.readyPlusApplied = 'true';
    console.log('Checkout view is ready');
  }
});


// 6. Open Shadow DOM
ReadyPlus.watch({
  selector: '.promo-message',
  pierceShadow: true,
  strategy: 'auto',

  onReady: function (element) {
    element.classList.add('promo-ready');
  }
});


// 7. Promise-based usage
ReadyPlus.wait('.recommendations', {
  visible: true,
  waitForImages: true,
  timeout: 4000
}).then(function (element) {
  console.log('Recommendations are ready', element);
}).catch(function (error) {
  console.warn('Recommendations were not ready', error);
});


// 8. Optional scoped pre-hiding
// Use this only when your integration intentionally controls pre-hiding.
// Do not hide the entire body by default.
var watcher = ReadyPlus.watch({
  selector: '.target-hero',
  prehide: {
    selector: '.target-hero',
    css: 'visibility: hidden !important;'
  },
  waitForImages: true,
  timeout: 3000,

  onReady: function (element) {
    element.classList.add('target-hero-applied');
  },

  onTimeout: function () {
    // ReadyPlus reveals the pre-hidden element on timeout by default.
    console.warn('Showing default hero because readiness timed out');
  }
});


// 9. Manual cleanup
var handle = ReadyPlus.watch({
  selector: '.long-lived-widget',
  once: false,
  onReady: function (element) {
    console.log('Widget found', element);
  }
});

// Stop observing later.
handle.stop();


// 10. Optional animation strategy
// This is deliberately opt-in because it adds a CSS animation rule.
ReadyPlus.watch({
  selector: '.animation-detected-region',
  strategy: 'animation',
  animationFallback: true,

  onReady: function (element) {
    console.log('Detected through animation probe', element);
  }
});