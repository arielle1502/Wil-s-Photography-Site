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
// $('#contact').on('click', function () {
//   const contact = $('#contactform').position().top;

//   $('html, body').animate(
//     {
//       scrollTop: contact
//     },
//     900
//   );
// });