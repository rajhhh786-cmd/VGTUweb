document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       ⭐ HERO TYPING EFFECT
    ============================================================ */
    if (document.querySelector("#typed-text")) {
        new Typed("#typed-text", {
            strings: [
                "Python Developer",
                "Machine Learning Enthusiast",
                "AI Systems Student"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1200,
            loop: true,
            showCursor: false
        });
    }

    /* ============================================================
       ⭐ CONTACT FORM ELEMENTS
    ============================================================ */
    const form = document.getElementById('contactForm');
    const resultsDiv = document.getElementById('formResults');
    const resultsDisplay = document.getElementById('resultsDisplay');
    const averageRatingDiv = document.getElementById('averageRating');

    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const submitBtn = document.getElementById("submitBtn");

    const nameError = document.getElementById("nameError");
    const surnameError = document.getElementById("surnameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const addressError = document.getElementById("addressError");

    const rating1 = document.getElementById('rating1');
    const rating2 = document.getElementById('rating2');
    const rating3 = document.getElementById('rating3');
    const rating1Value = document.getElementById('rating1Value');
    const rating2Value = document.getElementById('rating2Value');
    const rating3Value = document.getElementById('rating3Value');

    submitBtn.disabled = true;


    /* ============================================================
       ⭐ VALIDATION FUNCTIONS
    ============================================================ */

    function validateName() {
        const val = nameInput.value.trim();
        if (!/^[A-Za-z]+$/.test(val)) {
            nameError.textContent = "Name must contain letters only";
            setInvalid(nameInput);
            return false;
        }
        setValid(nameInput);
        nameError.textContent = "";
        return true;
    }

    function validateSurname() {
        const val = surnameInput.value.trim();
        if (!/^[A-Za-z]+$/.test(val)) {
            surnameError.textContent = "Surname must contain letters only";
            setInvalid(surnameInput);
            return false;
        }
        setValid(surnameInput);
        surnameError.textContent = "";
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!pattern.test(val)) {
            emailError.textContent = "Enter a valid email";
            setInvalid(emailInput);
            return false;
        }
        emailError.textContent = "";
        setValid(emailInput);
        return true;
    }

    /* ============================================================
       📞 PHONE FORMAT + VALIDATION (Lithuania +370 6 xxx xxxx)
    ============================================================ */
    phoneInput.addEventListener("input", () => {
        let val = phoneInput.value.replace(/\D/g, "");

        // Ensure number starts with 3706
        if (!val.startsWith("3706")) {
            val = "3706" + val.substring(4);
        }

        let formatted = "+370 6 ";
        formatted += val.substring(4, 7) + " ";
        formatted += val.substring(7, 11);

        phoneInput.value = formatted.trim();

        const phonePattern = /^\+370 6 \d{3} \d{4}$/;

        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneError.textContent = "Phone must be in format: +370 6 xxx xxxx";
            setInvalid(phoneInput);
            return false;
        }

        phoneError.textContent = "";
        setValid(phoneInput);
        return true;
    });

    function validateAddress() {
        const val = addressInput.value.trim();
        if (val.length < 5) {
            addressError.textContent = "Enter a valid address";
            setInvalid(addressInput);
            return false;
        }
        addressError.textContent = "";
        setValid(addressInput);
        return true;
    }

    /* ============================================================
       REUSABLE CLASS HELPERS
    ============================================================ */
    function setInvalid(input) {
        input.classList.add("invalid-input");
        input.classList.remove("valid-input");
    }

    function setValid(input) {
        input.classList.remove("invalid-input");
        input.classList.add("valid-input");
    }

    /* ============================================================
       ENABLE SUBMIT BUTTON ONLY IF ALL VALID
    ============================================================ */
    function validateForm() {
        if (
            validateName() &&
            validateSurname() &&
            validateEmail() &&
            validatePhone() &&
            validateAddress()
        ) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    function validatePhone() {
        return phoneError.textContent === "";
    }

    /* Input listeners */
    nameInput.addEventListener("input", validateForm);
    surnameInput.addEventListener("input", validateForm);
    emailInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("input", validateForm);
    addressInput.addEventListener("input", validateForm);


    /* ============================================================
       ⭐ FORM SUBMISSION OUTPUT + POPUP
    ============================================================ */
    if (rating1) rating1.addEventListener('input', () => rating1Value.textContent = rating1.value);
    if (rating2) rating2.addEventListener('input', () => rating2Value.textContent = rating2.value);
    if (rating3) rating3.addEventListener('input', () => rating3Value.textContent = rating3.value);

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                name: nameInput.value,
                surname: surnameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                rating1: parseInt(rating1.value),
                rating2: parseInt(rating2.value),
                rating3: parseInt(rating3.value)
            };

            displayFormData(data);
            calculateAverageRating(data);
            showSuccessPopup();

            resultsDiv.style.display = "block";
            resultsDiv.scrollIntoView({ behavior: "smooth" });
        });
    }

    function displayFormData(data) {
        resultsDisplay.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Surname:</strong> ${data.surname}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Rating 1:</strong> ${data.rating1}</p>
            <p><strong>Rating 2:</strong> ${data.rating2}</p>
            <p><strong>Rating 3:</strong> ${data.rating3}</p>
        `;
    }

    function calculateAverageRating(data) {

    // force values to numbers
    const r1 = Number(data.rating1);
    const r2 = Number(data.rating2);
    const r3 = Number(data.rating3);

    // compute true numeric average
    const avg = (r1 + r2 + r3) / 3;

    // formatted string for display
    const avgFormatted = avg.toFixed(1);

    // correct color logic (avg is number!)
    let color = "";
    if (avg < 4) {
        color = "red";
    } else if (avg < 7) {
        color = "orange";
    } else {
        color = "green";
    }

    // update HTML
    averageRatingDiv.innerHTML = `
        ${data.name} ${data.surname}: average 
        <span style="color:${color}; font-weight:bold;">${avgFormatted}</span>
    `;
}



    function showSuccessPopup() {
        const popup = document.createElement('div');
        popup.id = 'successPopup';
        popup.innerHTML = `
            <div style="
                position: fixed; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea, #764ba2);
                padding: 30px 50px; border-radius: 15px;
                color: white; text-align:center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10000; animation: popupFadeIn .3s;
            ">
                <h3>✓ Success!</h3>
                <p>Form submitted successfully!</p>
            </div>
            <div style="
                position: fixed; inset: 0;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
            " onclick="this.parentElement.remove()"></div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
    }

});

/* FADE IN POPUP ANIMATION */
const style = document.createElement('style');
style.textContent = `
@keyframes popupFadeIn {
    from { opacity:0; transform:translate(-50%, -60%); }
    to   { opacity:1; transform:translate(-50%, -50%); }
}
`;
document.head.appendChild(style);




/* ===============================
   CUSTOM PRELOADER SCRIPT
================================ */

window.addEventListener("load", function () {
  const loader = document.getElementById("OKpreloader");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }
});


