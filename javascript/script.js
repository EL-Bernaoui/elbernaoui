// Loading Page
window.onload = () => {
  document.querySelector(".loading").classList.add("loaded");
  document.querySelector(".main-content").classList.add("show");
  headerOnScroll();
  scrollFunc();
};


// Set active class to current nav item while scrolling and after clicking on it
let section = document.querySelectorAll(".section");
let navLiA = document.querySelectorAll("header nav .main-nav li a");

function activeLink(link) {
  navLiA.forEach(li => li.classList.remove("active"));
  link.classList.add("active");
}

navLiA.forEach(li => {
  li.addEventListener("click", function () {
    activeLink(this);
  });
});

function scrollFunc() {
  section.forEach(sec => {
    let top = window.scrollY + 80;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      const target = document.querySelector(`header nav .main-nav li [href="#${id}"]`);
      activeLink(target);
    }
  });
}

// Toggle Menu
let overlay = document.querySelector(".overlay"),
  toggleBtn = document.querySelector("header nav .toggle"),
  closeBtn = document.querySelector("header nav .main-nav .close_btn"),
  myNav = document.querySelector("header nav .main-nav");

toggleBtn.onclick = () => {
  overlay.classList.add("active");
  myNav.classList.add("show");
};
closeBtn.onclick = () => {
  myNav.classList.remove("show");
  setTimeout(() => {
    overlay.classList.remove("active");
  }, 200);
};

// Remove Toggle Menu After Clicking One Of The Nav Items
let navLi = document.querySelectorAll("header nav .main-nav li a");

navLi.forEach(li => {
  li.addEventListener("click", () => {
    if (myNav.classList.contains("show")) {
      myNav.classList.remove("show");
      setTimeout(() => {
        overlay.classList.remove("active");
      }, 200);
    }
  });
});

// Header Styling After Scrolling 
let header = document.querySelector("header");

function headerOnScroll() {
  if (scrollY >= "80") {
    header.style.boxShadow = "0px 0px 10px 0px rgb(0 0 0 / 20%)";
    header.style.backgroundColor = "rgba(191, 220, 218, 0.9)";
    header.style.backdropFilter = "blur(4px)";
  } else {
    header.style.backgroundColor = "transparent";
    header.style.boxShadow = "none";
    header.style.backdropFilter = "none";
  }
}

window.onscroll = () => {
  headerOnScroll();
  scrollFunc();
};

// Contact Section (label animation after focusing on input)
let fields = document.querySelectorAll(".contact .form_div form .field"),
  labels = document.querySelectorAll(".contact .form_div form label");

fields.forEach(e => {
  e.addEventListener("focus", function () {
    document.querySelectorAll(this.dataset.label).forEach(l => {
      l.classList.add("focus");
    });
  });
  e.addEventListener("blur", function () {
    document.querySelectorAll(this.dataset.label).forEach(l => {
      if (e.value !== "") {
        l.classList.add("focus");
      } else {
        l.classList.remove("focus");
      }
    });
  });
});

// Validate The Form after blur action on each input
document.querySelector(".contact .form_div form #f-name").addEventListener("blur", validName);
document.querySelector(".contact .form_div form #email").addEventListener("blur", validEmail);
document.querySelector(".contact .form_div form #textarea").addEventListener("blur", validText);

let fNameInput = document.querySelector(".contact .form_div form #f-name"),
  emailInput = document.querySelector(".contact .form_div form #email"),
  textInput = document.querySelector(".contact .form_div form #textarea");

let fNameRegex = /^[\w]{3,}$/,
  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validName() {
  if (!fNameRegex.test(fNameInput.value)) {
    fNameInput.classList.add("valid");
  } else {
    fNameInput.classList.remove("valid");
  }
}
function validEmail() {
  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("valid");
  } else {
    emailInput.classList.remove("valid");
  }
}
function validText() {
  if (textInput.value == "") {
    textInput.classList.add("valid");
  } else {
    textInput.classList.remove("valid");
  }
}

// Check and Validate inputs before sending the form info
let submitBtn = document.querySelector(".contact .form_div form .submit_btn");

submitBtn.addEventListener("click", function (e) {
  validName();
  validEmail();
  validText();
  if (!fNameRegex.test(fNameInput.value) && !emailRegex.test(emailInput.value)) {
    e.preventDefault();
  } else {
    document.querySelector(".contact .form_div form").submit();
    document.querySelector(".contact .form_div form").reset();
  }
});

