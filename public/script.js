$(".plan-list li").prepend(`<i class="uil uil-check"></i>`)
const tool = Array.from($(".bar-tool"));


  
$(".nav-link").click(function(){
  $(".nav-link").removeClass("active")
  $(this).addClass("active")
})
  let bardata = []
  tool.forEach(function(e){
   bardata.push(parseInt( parseInt(e.innerText)))
  })

   // Add event listener to tab buttons
   $('.tab-button').on('click', function() {
    const tab = $(this).data('tab');
    
    // Show selected tab content
    $('.card-image').each(function() {
      const tabData = $(this).data('tab');
      if (tabData === tab || tab === 'all') {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
$(window).scroll(function() {
  const element = $('.navbar');
  let position = window.pageYOffset;

  // Checking if the element is in the viewport
if(position > 70){
  console.log(position)
  $(element).addClass("shadow")
}
else if(position < 70){
  $(element).removeClass("shadow")
}
});


$(window).scroll(function(){
  let ele = $("#skill")
  if(window.pageYOffset > ele[0].offsetTop){
  for(let i = 0 ; i < bardata.length ; i++){
  anime({
  targets : tool[i],
  innerHTML: [0,bardata[i]],
  easing: 'linear',
  round: 1, })}
  }
})