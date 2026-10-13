/* ==========================================================
   PORTFOLIO SCRIPT
========================================================== */


/* ==========================================================
   FOOTER YEAR
========================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        navToggle.classList.toggle("open", isOpen);

        navToggle.setAttribute(
            "aria-expanded",
            isOpen
        );
    });


    /* Close menu after clicking a link */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            navToggle.classList.remove("open");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });

    });
}


/* ==========================================================
   ACTIVE NAV LINK
========================================================== */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");
        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");
        }

    });
}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* ==========================================================
   LANGUAGE SYSTEM
========================================================== */

const languageToggle =
    document.getElementById("languageToggle");

const languageText =
    document.getElementById("languageText");

let currentLanguage =
    localStorage.getItem("language") || "en";


function applyLanguage(language) {

    currentLanguage = language;


    /* Translate normal text */

    document
        .querySelectorAll("[data-en][data-ar]")
        .forEach(element => {

            const translation =
                element.getAttribute(
                    `data-${language}`
                );

            if (translation !== null) {

                element.textContent =
                    translation;
            }

        });


    /* Translate placeholders */

    document
        .querySelectorAll(
            "[data-placeholder-en][data-placeholder-ar]"
        )
        .forEach(element => {

            const placeholder =
                element.getAttribute(
                    `data-placeholder-${language}`
                );

            if (placeholder !== null) {

                element.placeholder =
                    placeholder;
            }

        });


    /* Change page direction */

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    /* Change language button */

    if (languageText) {

        languageText.textContent =
            language === "en"
                ? "عربي"
                : "EN";
    }


    /* Save language */

    localStorage.setItem(
        "language",
        language
    );


    /* Restart typing animation */

    resetTyping();
}


/* Language button */

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        () => {

            const newLanguage =
                currentLanguage === "en"
                    ? "ar"
                    : "en";

            applyLanguage(newLanguage);
        }
    );
}


/* ==========================================================
   TYPING ANIMATION
========================================================== */

const roles = {

    en: [
        "Game Developer",
        "Unity / C# Enthusiast",
        "IT Student"
    ],

    ar: [
        "مطورة ألعاب",
        "مهتمة بـ Unity و C#",
        "طالبة تكنولوجيا معلومات"
    ]

};


const roleElement =
    document.getElementById("typedRole");


let typingTimer = null;

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function resetTyping() {

    clearTimeout(typingTimer);

    roleIndex = 0;

    characterIndex = 0;

    deleting = false;

    if (roleElement) {

        roleElement.textContent = "";
    }

    typeRole();
}


function typeRole() {

    if (!roleElement) {
        return;
    }


    const currentRoles =
        roles[currentLanguage];

    if (!currentRoles) {
        return;
    }


    const currentRole =
        currentRoles[roleIndex];


    if (!deleting) {

        characterIndex++;

        roleElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex >=
            currentRole.length
        ) {

            deleting = true;

            typingTimer =
                setTimeout(
                    typeRole,
                    1400
                );

            return;
        }


        typingTimer =
            setTimeout(
                typeRole,
                80
            );

    } else {

        characterIndex--;

        roleElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (characterIndex <= 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                currentRoles.length;

            typingTimer =
                setTimeout(
                    typeRole,
                    350
                );

            return;
        }


        typingTimer =
            setTimeout(
                typeRole,
                45
            );
    }
}


/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal, .tl-item, .project-card, .cert-card, .about-copy, .about-info, .skill-group"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "in-view"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================================
   SKILL BARS
========================================================== */

const skillBars =
    document.querySelectorAll(".bar");


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "in-view"
                    );

                    skillObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.35
        }
    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* ==========================================================
   DARK / LIGHT MODE
========================================================== */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


let currentTheme =
    localStorage.getItem("theme") || "dark";


function applyTheme(theme) {

    currentTheme = theme;


    if (theme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        if (themeIcon) {

            themeIcon.textContent = "🌙";
        }

    } else {

        document.body.classList.remove(
            "light-mode"
        );

        if (themeIcon) {

            themeIcon.textContent = "☀️";
        }
    }


    localStorage.setItem(
        "theme",
        theme
    );
}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            applyTheme(newTheme);
        }
    );
}


/* ==========================================================
   CONTACT FORM
========================================================== */

const contactForm =
    document.getElementById("contactForm");

const formNote =
    document.getElementById("formNote");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const email =
                document.getElementById(
                    "email"
                )?.value.trim();


            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            if (!name || !email || !message) {

                if (formNote) {

                    formNote.textContent =
                        currentLanguage === "ar"
                            ? "من فضلك املئي كل البيانات."
                            : "Please fill in all fields.";
                }

                return;
            }


            const subject =
                encodeURIComponent(
                    `Portfolio Contact - ${name}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
                );


            const mailto =
                `mailto:habibakhaled.86666@gmail.com?subject=${subject}&body=${body}`;


            window.location.href =
                mailto;


            if (formNote) {

                formNote.textContent =
                    currentLanguage === "ar"
                        ? "سيتم فتح برنامج البريد لإرسال الرسالة."
                        : "Your email app will open to send the message.";
            }

        }
    );
}


/* ==========================================================
   BACK TO TOP
========================================================== */

const toTop =
    document.querySelector(".to-top");


if (toTop) {

    toTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* ==========================================================
   INITIALIZE
========================================================== */

applyTheme(currentTheme);

applyLanguage(currentLanguage);