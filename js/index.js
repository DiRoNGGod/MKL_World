/* Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Модальное окно
$('#discussions__modal').click(function (e) {
  e.preventDefault();
  $('.discussions__window').addClass('discussions__window_active');
  $('body').addClass('hidden');
});

$('.modal__close-button').click(function (e) {
  e.preventDefault();
  $('.discussions__window').removeClass('discussions__window_active');
  $('body').removeClass('hidden');
});

$('.discussions__window').mouseup(function (e) {
  let modalContent = $(".discussions__content");
  if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
    $(this).removeClass('discussions__window_active');
    $('body').removeClass('hidden');
  }
});