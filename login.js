/* Nourisha — interaksi halaman login */

(function () {
  "use strict";

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailLabel = document.getElementById("emailLabel");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const togglePassword = document.getElementById("togglePassword");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");
  const tabs = Array.from(document.querySelectorAll(".segmented__btn"));

  /* Konfigurasi per peran: label, placeholder, dan contoh kredensial. */
  const ROLES = {
    perawat: {
      label: "EMAIL PERAWAT",
      placeholder: "sinta@rrssehat.id",
    },
    ortu: {
      label: "EMAIL ORANG TUA",
      placeholder: "nama@email.com",
    },
  };

  let activeRole = "perawat";

  /* ---------- Pemilih peran ---------- */

  function selectRole(role) {
    activeRole = role;
    const config = ROLES[role];

    tabs.forEach((tab) => {
      const isActive = tab.dataset.role === role;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    emailLabel.textContent = config.label;
    emailInput.placeholder = config.placeholder;
    hideError(emailInput, emailError);

    /* Pesan status milik peran sebelumnya tidak lagi relevan. */
    formStatus.hidden = true;
    formStatus.textContent = "";
    formStatus.classList.remove("is-error");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectRole(tab.dataset.role));
  });

  /* ---------- Validasi ---------- */

  function showError(input, element, message) {
    element.textContent = message;
    element.hidden = false;
    input.setAttribute("aria-invalid", "true");
  }

  function hideError(input, element) {
    element.textContent = "";
    element.hidden = true;
    input.removeAttribute("aria-invalid");
  }

  function validate() {
    let valid = true;

    const email = emailInput.value.trim();
    if (!email) {
      showError(emailInput, emailError, "Masukkan email terlebih dahulu.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(emailInput, emailError, "Format email belum benar.");
      valid = false;
    } else {
      hideError(emailInput, emailError);
    }

    if (!passwordInput.value) {
      showError(passwordInput, passwordError, "Masukkan kata sandi.");
      valid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, passwordError, "Kata sandi minimal 8 karakter.");
      valid = false;
    } else {
      hideError(passwordInput, passwordError);
    }

    return valid;
  }

  emailInput.addEventListener("input", () => hideError(emailInput, emailError));
  passwordInput.addEventListener("input", () => hideError(passwordInput, passwordError));

  /* ---------- Tampilkan / sembunyikan kata sandi ---------- */

  togglePassword.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";
    passwordInput.type = isVisible ? "password" : "text";
    togglePassword.setAttribute("aria-pressed", String(!isVisible));
    togglePassword.setAttribute(
      "aria-label",
      isVisible ? "Tampilkan kata sandi" : "Sembunyikan kata sandi"
    );
    passwordInput.focus();
  });

  /* ---------- Kirim formulir ---------- */

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    formStatus.hidden = true;

    if (!validate()) {
      formStatus.textContent = "Periksa kembali isian yang ditandai.";
      formStatus.classList.add("is-error");
      formStatus.hidden = false;
      return;
    }

    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    /* Placeholder: ganti dengan panggilan API autentikasi Nourisha. */
    window.setTimeout(function () {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;

      formStatus.textContent =
        activeRole === "perawat"
          ? "Data terverifikasi untuk akun perawat. Halaman berikutnya belum tersedia pada prototipe ini."
          : "Data terverifikasi untuk akun orang tua. Halaman berikutnya belum tersedia pada prototipe ini.";
      formStatus.classList.remove("is-error");
      formStatus.hidden = false;
    }, 900);
  });

  selectRole(activeRole);
})();
