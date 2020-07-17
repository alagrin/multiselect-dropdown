$(document).ready(() => {
  var selectedOptions = [];

  $("#dropdown").hide();
  $("#lead-src").on("keyup", () => {
    $("#dropdown").show();
  });

  $("#lead-src").on("focus", () => {
    $("#dropdown").slideDown();
  });

  $('input[type="checkbox"]').click(function () {
    if (this.checked == false) {
      var index = selectedOptions.indexOf($(this).val());
      selectedOptions.splice(index, 1);
    }
    if (!selectedOptions.includes($(this).val()) && this.checked) {
      selectedOptions.push($(this).val());
    }
    $("#checked-items").text(selectedOptions);
  });

  $("#btn").on("click", () => {
    var jsonVal = { "lead-source": selectedOptions };

    var jsonString = JSON.stringify(jsonVal);

    console.log(jsonString);

    $.ajax({
      url: "http://127.0.0.1/dc/?formdata",
      type: "POST",
      data: jsonVal,
      dataType: 'json',
      success: () => console.log("Data posted"),
      error: (req, error) => console.log("post failed")
    });
  });
});

// sample of event on html calling function in jquery

function filterElem(elem) {
  var filter = $(elem).val().toLowerCase();

  $(".src-option > option").each(function () {
    var text = $(this).text().toLowerCase();
    if (filter == "") {
      $(this).parent().hide();
    } else if (text.search(filter) > -1) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
}
