//animate smooth scroll
$('#view-work').on('click', function () {
  const images1 = $('#header').position().top;

  $('html, body').animate(
    {
      scrollTop: images1
    },
    900
  );
});

// function change() 
// {
//     var elem = document.getElementById("changeCSS");
//     if (elem.value=="View in Colour") elem.value = "View in B&W";
//     else elem.value = "View in Colour";
// }

function swapStylesheet(sheet) {
  document.getElementById('swap').setAttribute('href', sheet)
}