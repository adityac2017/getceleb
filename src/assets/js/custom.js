
/* ========================================================== */
/*   Navigation Background Color                              */
/* ========================================================== */
export var headerOpaque = function () {
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 450) {
      $('.navbar-fixed-top').addClass('opaque');
    } else {
      $('.navbar-fixed-top').removeClass('opaque');
    }
  });
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 450) {
      $('.sidenav').addClass('opaque');
    } else {
      $('.sidenav').removeClass('opaque');
    }
  });
}
/* ========================================================== */
/*   Hide Responsive Navigation On-Click                      */
/* ========================================================== */
export var mobileNav = function () {
  $(".navbar-nav li a").on('click', function (event) {
    $(".navbar-collapse").collapse('hide');
  });
}

/* ========================================================== */
/*   Navigation Color                                         */
/* ========================================================== */
export var navCollapse = function () {
  // $('#navbarCollapse').onePageNav({
  //   filter: ':not(.external)'
  // });
}

	/* ========================================================== */
	/*   SmoothScroll                                             */
	/* ========================================================== */
// export var smoothScroll = function () {
//   $(".navbar-nav li a, a.scrool").on('click', function (e) {
//     var full_url = this.href;
//     var parts = full_url.split("#");
//     var trgt = parts[1];
//     var target_offset = $("#" + trgt).offset();
//     var target_top = target_offset.top;
//     $('html,body').animate({scrollTop: target_top - 70}, 1000);
//     return false;
//   });
// }
export var swipper = function () {
  setTimeout(function(){ 
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    slidesPerColumn: 2,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }

  });
}, 1000);
}

export var enterNumber = function(email){
  $(".enterNumber").keypress(function (e) {
      //if the letter is not digit then display error and don't type anything
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
         //display error message
         $("#errmsg").html("Digits Only").show().fadeOut("slow");
                return false;
     }
    });
}


export var playpouse = function(){
//  setTimeout(function(){
//   // $('.btnPause').click(function(event){
//   //   $(".profile-bio-video").trigger('pause');
//   // });
//   // $('.btnPlay').click(function(event){
//   //   $(".profile-bio-video").trigger('play');
//   // });

//   $('.client-footer buttons').on('click', function() {
//     $('.btnPause, .btnPlay').toggle();
//   });
//  },1000)

} 


export var onhoverShowControlls = function(){
  $('video').hover(function toggleControls() {
    alert(0);
    if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
        alert(0);
    } else {
        this.setAttribute("controls", "controls")
        alert(0);
    }
})
}


export var playv = function(){
//   const second = 1000,
//   minute = second * 60,
//   hour = minute * 60,
//   day = hour * 24;

// let countDown = new Date('Sep 1, 2020 00:00:00').getTime(),
// x = setInterval(function() {    

//   let now = new Date().getTime(),
//       distance = countDown - now;

//   document.getElementById('days').innerText = Math.floor(distance / (day)),
//     document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
//     document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
//     document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);



// }, second)  
}

export var scrllt = function(){
  $("#frstcl").click(function() {
    $('html,body').animate({
        scrollTop: $(".second").offset().top},
        'slow');
  });

  $("#secondcl").click(function() {
    $('html,body').animate({
        scrollTop: $(".frst").offset().top},
        'slow');
  });
}



export var taba = function(){

    // var $a = $(".tabs li");
    // $a.click(function() {
    //   $a.removeClass("active");
    //   $(this).addClass("active");
    // });
    $(document).ready(function(){
      $('.nav-pills li a').click(function(){
        $('.nav-pills li a').removeClass("active");
        $(this).addClass("active");
    });
    });
}


export var mini = function(){
    // var quantitiy=0;
    //    $('.quantity-right-plus').click(function(e){
    //         e.preventDefault();
    //         var quantity = parseInt($('#quantity').val());
        
    //             $('#quantity').val(quantity + 1);
    //     });
    
    //      $('.quantity-left-minus').click(function(e){
    //         e.preventDefault();
    //         var quantity = parseInt($('#quantity').val());
    //             if(quantity>0){
    //             $('#quantity').val(quantity - 1);
    //             }
    //     });
	
      $('.input-number').prop('disabled', true);
      //  $(document).on('click','.plus',function(){
      // $('.input-number').val(parseInt($('.input-number').val()) + 1 );
      // });
      //   $(document).on('click','.minus',function(){
      //   $('.input-number').val(parseInt($('.input-number').val()) - 1 );
      //     if ($('.input-number').val() == 0) {
      //     $('.input-number').val(1);
      //   }
      //     });
   
}
