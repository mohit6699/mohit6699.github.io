/**
 * CAANZ Analytics Tracking System
 * CSP-compliant event tracking with easy extensibility
 * @version 1.0.0
 */
(function () {
  "use strict";

  // ========================================
  // Helper: Initialize digitalData
  // ========================================

  function initDigitalData() {
    window.digitalData = window.digitalData || {};
    window.digitalData.events = window.digitalData.events || [];
  }

  function getBasePageData() {
    return {
      pageURL: window.location.hostname + window.location.pathname,
      site: "eStore",
    };
  }

  // ========================================
  // Analytics Functions
  // ========================================

  const Analytics = {
    // Navigation clicks (header, footer, menu)
    navClick: function (element) {
      initDigitalData();
      window.digitalData.events.push({
        event: "navigationClick",
        action: "click",
        eventModule: element.dataset.module,
        navigationType: element.dataset.navigationType,
        navigationLinkTitle: element.dataset.tab,
        internalLink: `${element.dataset.module}|${element.dataset.navigationType}|${element.dataset.tab}`,
        ...getBasePageData(),
      });
    },

    // Accordion expand/collapse
    accordionClick: function (element) {
      initDigitalData();
      const isActive = !element.classList.contains("show");

      window.digitalData.events.push({
        event: isActive ? "accordionClose" : "accordionOpen",
        action: "click",
        eventModule: "Table Accordion",
        elementName: element.dataset.value,
        internalLink: isActive
          ? `Accordion Close|Table Accordion|${element.dataset.value}`
          : `Accordion Open|Table Accordion|${element.dataset.value}`,
        ...getBasePageData(),
        type: "analytics",
      });
    },

    // Carousel navigation (prev/next arrows)
    carouselNavClick: function (element) {
      initDigitalData();
      window.digitalData.events.push({
        event: "carouselNavigation",
        action: element.dataset.action,
        eventModule: element.dataset.module,
        elementName: element.dataset.element,
        internalLink: `${element.dataset.module}|${element.dataset.element}|${element.dataset.action}`,
        ...getBasePageData(),
        type: "analytics",
      });
    },

    // Text link clicks (inline content links)
    textLinkClick: function (element) {
      initDigitalData();
      window.digitalData.events.push({
        action: "click",
        event: "textLinkClick",
        module: element.dataset.module,
        elementName: element.dataset.element,
        ...getBasePageData(),
        type: "analytics",
      });
    },

    // Content tile clicks (cards, featured content)
    tileClick: function (element) {
      initDigitalData();
      window.digitalData.events.push({
        action: "click",
        event: "contentTileClick",
        contentTileTitle: element.dataset.title,
        contentTileButtonText: element.dataset.element,
        module: element.dataset.module,
        ...getBasePageData(),
        type: "analytics",
      });
    },

    // File downloads
    fileDownload: function (element) {
      initDigitalData();
      window.digitalData.events.push({
        action: "click",
        event: "fileDownload",
        filename: element.dataset.filename,
        filetype: element.dataset.filetype,
        module: element.dataset.module,
        ...getBasePageData(),
        type: "analytics",
      });
    },

    // CTA button clicks (primary actions)
    ctaClick: function (element) {
      initDigitalData();
      window.digitalData.events.push({
        action: "click",
        event: "ctaClick",
        ctaTitle: element.dataset.title,
        ctaButtonText: element.dataset.buttonText,
        module: element.dataset.module,
        ...getBasePageData(),
        type: "analytics",
      });
    },
  };

  // ========================================
  // Tracking Configuration
  // ========================================

  const trackingConfig = [
    // Navigation tracking
    {
      className: "at-tracked-nav",
      handler: Analytics.navClick,
      requiredDatasets: ["module", "navigationType", "tab"],
      description: "Navigation clicks (header, footer, menu)",
    },

    // Accordion tracking
    {
      className: "at-tracked-accordion",
      handler: Analytics.accordionClick,
      requiredDatasets: ["value"],
      description: "Accordion expand/collapse",
    },

    // Carousel navigation tracking
    {
      className: "at-tracked-carousel",
      handler: Analytics.carouselNavClick,
      requiredDatasets: ["action", "module", "element"],
      description: "Carousel navigation arrows",
    },

    // Text link tracking
    {
      className: "at-tracked-textlink",
      handler: Analytics.textLinkClick,
      requiredDatasets: ["module", "element"],
      description: "Inline text links",
    },

    // Content tile tracking
    {
      className: "at-tracked-tile",
      handler: Analytics.tileClick,
      requiredDatasets: ["title", "element", "module"],
      description: "Content tiles and cards",
    },

    // File download tracking
    {
      className: "at-tracked-download",
      handler: Analytics.fileDownload,
      requiredDatasets: ["filename", "filetype", "module"],
      description: "File downloads",
    },

    // CTA button tracking
    {
      className: "at-tracked-cta",
      handler: Analytics.ctaClick,
      requiredDatasets: ["title", "buttonText", "module"],
      description: "CTA buttons",
    },
  ];

  // ========================================
  // Core Tracking Logic
  // ========================================

  /**
   * Validates that an element has all required data attributes
   */
  function hasRequiredDatasets(element, requiredDatasets) {
    return requiredDatasets.every((attr) => {
      const hasAttr = element.dataset[attr] !== undefined;
      if (!hasAttr) {
        console.warn(
          `CAANZ Analytics: Missing required data-${attr} attribute`,
          element,
        );
      }
      return hasAttr;
    });
  }

  /**
   * Main click handler using event delegation
   */
  function handleTrackedClick(event) {
    // Check each tracking configuration
    for (const config of trackingConfig) {
      const trackedElement = event.target.closest("." + config.className);

      if (trackedElement) {
        // Validate required data attributes exist
        if (hasRequiredDatasets(trackedElement, config.requiredDatasets)) {
          try {
            config.handler(trackedElement);

            // Optional: Log successful tracking in dev mode
            if (window.CAANZAnalytics?.debug) {
              console.log("CAANZ Analytics tracked:", {
                type: config.description,
                element: trackedElement,
                event:
                  window.digitalData.events[
                    window.digitalData.events.length - 1
                  ],
              });
            }
          } catch (error) {
            console.error("CAANZ Analytics error:", error, config);
          }
        }

        // Element matched, no need to check other configs
        break;
      }
    }
  }

  // ========================================
  // Initialization
  // ========================================

  /**
   * Initialize analytics tracking
   */
  function init(options = {}) {
    const defaults = {
      debug: false,
      container: document,
    };

    const settings = { ...defaults, ...options };

    // Attach event listener
    settings.container.addEventListener("click", handleTrackedClick);

    if (settings.debug) {
      console.log("CAANZ Analytics tracking initialized", {
        trackedTypes: trackingConfig.length,
        configurations: trackingConfig.map((c) => ({
          class: c.className,
          description: c.description,
        })),
      });
    }

    return true;
  }

  /**
   * Get tracking statistics
   */
  function getStats() {
    return {
      totalConfigurations: trackingConfig.length,
      configurations: trackingConfig.map((c) => ({
        className: c.className,
        description: c.description,
        requiredAttributes: c.requiredDatasets,
      })),
      totalEvents: window.digitalData?.events?.length || 0,
    };
  }

  // ========================================
  // Auto-initialize
  // ========================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }

  // ========================================
  // Public API
  // ========================================

  window.CAANZAnalytics = {
    init: init,
    Analytics: Analytics,
    getStats: getStats,
    debug: false,
    version: "1.0.0",
  };
})();
