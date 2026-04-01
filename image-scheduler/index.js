$("#start").click(function () {
  let data = [];

  // Collect data
  $(".card").each(function () {
    let imgSrc = $(this).find("img").attr("src");
    let position = parseInt($(this).find(".pos").val());
    let time = parseInt($(this).find(".time").val());

    if (!position || !time) {
      $.toast({
        heading: 'Error',
        text: 'Please fill all fields!',
        icon: 'error',
        position: 'top-right',
        bgColor: '#1e293b',
        textColor: '#fff'
      });
      data = [];
      return false;
    }

    data.push({
      img: imgSrc,
      position: position,
      time: time,
      element: this,
    });
  });

  if (data.length === 0) return;

  // Duplicate position check
  let positions = data.map((d) => d.position);
  let unique = new Set(positions);

  if (positions.length !== unique.size) {
     $.toast({
        heading: 'Error',
        text: 'Duplicate positions not allowed!',
        icon: 'error',
        position: 'top-right',
        bgColor: '#1e293b',
        textColor: '#fff'
      });
    return;
  }

  // sort by position
  data.sort((a, b) => a.position - b.position);

  let totalDelay = 0;

  // Display one by one
  data.forEach((item) => {
    setTimeout(() => {
      // Active card highlight
      $(".card").removeClass("active");
      $(item.element).addClass("active");

      //  Display Image
      $("#display").fadeOut(200, function () {
        $(this)
          .html(`<img src="${item.img}"><div class = "progress"></div>`)
          .fadeIn(200);

        //   Progress bar reset
        $(".progress").css({
          width: "0%",
          transition: "none",
        });

        // Animate propgress bar
        setTimeout(() => {
          $(".progress").css({
            width: "100%",
            transition: `width ${item.time}s linear`,
          });
        }, 50);
      });
    }, totalDelay);
    totalDelay += item.time * 1000;
  });

  //  clear Display after all images
  setTimeout(() => {
    $("#display").fadeOut(200, function () {
      $(this).html("Completed ✅").fadeIn(200);
    });

    $(".card").removeClass("active");

     $.toast({
        heading: 'Success',
        text: 'Slideshow Completed!',
        icon: 'success',
        position: 'top-right',
        bgColor: '#1e293b',
        textColor: '#fff'
      });
  }, totalDelay);
});
