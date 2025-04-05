document.addEventListener("DOMContentLoaded", () => {
    const fadeEls = document.querySelectorAll('body .fade-in');
    const deepLinkEls = document.querySelectorAll("a[id]");
    const footerYearEl = document.querySelector(".footer-year");
    const headerEl = document.querySelector("header");
    const codeEls = document.querySelectorAll("pre code");
    const headerHeight = headerEl.offsetHeight;

    headerEl.classList.add("sticky");
    document.documentElement.classList.add("js-enabled");

    fadeInOnScroll(fadeEls);

    deepLinkEls.forEach(section => {
        section.style.scrollMarginTop = `${headerHeight}px`;
    });

    const deepLinksObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id ? `#${entry.target.id}` : '';
                history.replaceState(null, null, targetId);
            }
        });
    }, {
        root: null,
        threshold: 0.5,
        rootMargin: "-20% 0px -70% 0px",
    });

    deepLinkEls.forEach(section => {
        deepLinksObserver.observe(section);

        section.addEventListener("click", (e) => {
            e.preventDefault();

            const deepLink = `${window.location.origin}${window.location.pathname}#${section.id}`;
            const headerHeight = headerEl.offsetHeight;

            navigator.clipboard.writeText(deepLink);

            section.style.scrollMarginTop = `${headerHeight}px`;

            section.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    codeEls.forEach((block) => {
        const lines = block.textContent.split("\n");

        const minIndent = lines
            .filter(line => line.trim().length > 0)
            .reduce((min, line) => {
                const leadingSpaces = line.match(/^(\s*)/)[0].length;
                return Math.min(min, leadingSpaces);
            }, Infinity);

        block.textContent = lines.map(line => line.slice(minIndent)).join("\n").trim();
    });

    footerYearEl.textContent = new Date().getFullYear();

    function fadeInOnScroll(elements) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                    entry.target.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }
});
