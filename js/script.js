// =====================================
// RESQHIVE TECHNOLOGIES
// SCRIPT.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 ResQHive Technologies Loaded");

    // =====================================
    // CONTACT FORM
    // =====================================

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const status =
                document.getElementById("status");

            status.style.color = "#1E90FF";
            status.innerHTML =
                "⏳ Sending message...";

           const formData = {
    name: document.getElementById("name").value.trim(),

    email: document.getElementById("email").value.trim(),

    service: document.getElementById("selectedService").value,

    subject: document.getElementById("subject").value.trim(),

    message: document.getElementById("message").value.trim()
};
            try {

                const response = await fetch(
                    "/send-message",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );

                const result =
                    await response.json();

                if (result.success) {

                    status.style.color = "#00ff88";

                    status.innerHTML =
                        "✅ Message sent successfully! Check WhatsApp or email for further communication.";

                    form.reset();

                } else {

                    status.style.color = "#ff4d4d";

                    status.innerHTML =
                        "❌ Failed to send message.";

                }

            } catch (error) {

                console.error(error);

                status.style.color = "#ff4d4d";

                status.innerHTML =
                    "❌ Server connection failed.";

            }

        });

    }

    // =====================================
    // FADE-IN SETUP
    // =====================================

    const cards = document.querySelectorAll(
        ".service-card, .stat-card, .product-card"
    );

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(30px)";

        card.style.transition =
            "all 0.6s ease";

    });

    revealCards();

});

// =====================================
// SMOOTH SCROLL
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// =====================================
// SCROLL REVEAL
// =====================================

function revealCards() {

    const cards = document.querySelectorAll(
        ".service-card, .stat-card, .product-card"
    );

    cards.forEach(card => {

        const top =
            card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0px)";

        }

    });

}

window.addEventListener("scroll", revealCards);

// =====================================
// COUNTER ANIMATION
// =====================================

function animateCounters() {

    const counters =
        document.querySelectorAll(".stat-card h2");

    counters.forEach(counter => {

        const target =
            parseInt(counter.innerText);

        if (isNaN(target)) return;

        let count = 0;

        const increment =
            Math.ceil(target / 50);

        const update = () => {

            count += increment;

            if (count > target)
                count = target;

            counter.innerText = count + "+";

            if (count < target) {

                requestAnimationFrame(update);

            }

        };

        update();

    });

}

window.addEventListener("load", animateCounters);

// =====================================
// ACTIVE NAVBAR LINK
// =====================================

const navLinks =
    document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(l =>
            l.classList.remove("active")
        );

        link.classList.add("active");

    });

});
function selectService(service){

document.getElementById(
"selectedService"
).value = service;

location.href = "#contact";

}

// =====================================
// CONSOLE MESSAGE
// =====================================

console.log("🚀 ResQHive Ready");