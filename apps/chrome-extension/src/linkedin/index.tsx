import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import LinkedInButton from "./LinkedInButton";
import { MantineWrapper } from "../shared/MantineWrapper";

// Extract LinkedIn username from URL
function getLinkedInUsername(): string | null {
  const pathname = window.location.pathname;
  const match = pathname.match(/^\/in\/([^\/]+)\/?$/);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

// Find the target section and inject the button
function injectBonderyButton() {
  const username = getLinkedInUsername();

  console.log("Bondery LinkedIn: Attempting to inject button", { username });

  if (!username) {
    console.log("Bondery LinkedIn: No username found in URL");
    return;
  }

  const targetSection = document.querySelector(
    "._50293d6d._3ef9a4ba._1937a38e._55f344ac.a66c3ac6.c67a4f8b._528d5339._08542c3e.f7152e2e._58ae5fa6._17943a0d._951ee4c0",
  );

  console.log("Bondery LinkedIn: Target section found:", !!targetSection, targetSection);

  if (!targetSection) {
    console.log(
      "Bondery LinkedIn: Target section not found. Searching for alternative selectors...",
    );
    // Try alternative selectors
    const alternatives = [
      ".pv-top-card-v2-ctas",
      ".pvs-profile-actions",
      "[data-view-name='profile-top-card-actions']",
      ".artdeco-card .pvs-profile-actions",
      ".c67a4f8b._929976ad._08542c3e.f7152e2e._58ae5fa6._1163ca8d._7e4f556f",
    ];

    for (const selector of alternatives) {
      const altSection = document.querySelector(selector);
      if (altSection) {
        console.log(
          `Bondery LinkedIn: Found alternative section with selector: ${selector}`,
          altSection,
        );
      }
    }
    return;
  }

  // Check if button already exists
  if (document.querySelector("#bondery-li-button-root")) {
    return;
  }

  // Create container for React component
  const container = document.createElement("div");
  container.id = "bondery-li-button-root";
  targetSection.appendChild(container);

  // Render React component
  const root = ReactDOM.createRoot(container);
  root.render(
    <StrictMode>
      <MantineWrapper>
        <LinkedInButton username={username} />
      </MantineWrapper>
    </StrictMode>,
  );

  console.log("Bondery Extension: Button injected successfully on LinkedIn");
}

// Observe DOM changes
function setupObserver() {
  const observer = new MutationObserver(() => {
    const username = getLinkedInUsername();
    if (username && !document.querySelector("#bondery-li-button-root")) {
      injectBonderyButton();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

// Initialize
function init() {
  // Safety check: only run on LinkedIn
  if (!window.location.hostname.includes("linkedin.com")) {
    return;
  }

  console.log("Bondery Extension: Initializing LinkedIn integration");

  injectBonderyButton();
  setupObserver();

  setTimeout(() => {
    injectBonderyButton();
  }, 2000);

  // Listen for URL changes
  let lastUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      setTimeout(() => {
        injectBonderyButton();
      }, 1000);
    }
  }, 500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
