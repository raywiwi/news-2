

/*---------------------------nav-mobile------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".menu2");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const submenuToggle = document.querySelector(".submenu-toggle");
    const submenu = submenuToggle?.querySelector(".submenu");
  
    menuButtons.forEach((menuButton) => {
      const menuIcon = menuButton.querySelector("img");
  
      menuButton.addEventListener("click", () => {
        const isOpen = dropdownMenu.classList.toggle("open");
        menuButton.classList.toggle("rotated");
  
        if (isOpen) {
          menuIcon.src = "icon/close.svg";
        } else {
          menuIcon.src = "icon/menu.svg";
        }
      });
    });
  
    if (submenuToggle && submenu) {
      submenuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        submenu.classList.toggle("open");
        submenuToggle.classList.toggle("open");
      });
    }
  });


document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".mobile-nav");
    const searchToggle = document.querySelector(".search-toggle");
    const closeSearch = document.querySelector(".close-search");

    searchToggle.addEventListener("click", () => {
        nav.classList.add("search-active");
    });

    closeSearch.addEventListener("click", () => {
        nav.classList.remove("search-active");
    });
});



  