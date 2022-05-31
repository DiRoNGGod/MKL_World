function myFunction() {
    document.getElementById("account").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.header__click')) {

    var dropdowns = document.getElementsByClassName("header__content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}