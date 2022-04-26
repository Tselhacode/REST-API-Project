$('#enter').click(function() {
  $('#interrogation1').toggle();
  $('html, body').animate({
    scrollTop : $("#interrogation1").offset().top
});
});

$('#y1').click(function(){
  $('#reported').toggle();
  $('#n1').prop('disabled', true)
  $('html, body').animate({
    scrollTop : $("#reported").offset().top
  });
})

$('#n1').click(function(){
  $('#interrogation2').toggle();
  $('html, body').animate({
    scrollTop : $("#interrogation2").offset().top
});
});

$('#n2').click(function(){
  $('#interrogation3').toggle();
  $('html, body').animate({
    scrollTop : $("#interrogation3").offset().top
});
});

$('#n3').click(function(){
  $('#interrogation4').toggle();
  $('html, body').animate({
    scrollTop : $("#interrogation4").offset().top
});
});

$('#n4').click(function(){
  $('#interrogation5').toggle();
  $('html, body').animate({
    scrollTop : $("#interrogation5").offset().top
});
});

$('.carousel').function({
  interval: 2000
})

