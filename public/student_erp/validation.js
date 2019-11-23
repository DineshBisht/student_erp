$(document).ready(function() {
  try {
    courseValidation.init();
  } catch (err) {}
});

var courseValidation = (function() {
  var e = function() {
    var e = $("#createCourse"),
      r = $(".alert-danger", e),
      i = $(".alert-success", e);
    e.validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      focusInvalid: !1,
      ignore: "",
      rules: {
        courseName: { required: true },
        courseCode: { required: !0 },
        courseAlias: { required: !0 }
      },
      messages: {},
      invalidHandler: function(e, t) {
        i.hide(), r.show(), App.scrollTo(r, -200);
      },
      errorPlacement: function(e, r) {
        var i = $(r).parent(".input-group");
        i.size() > 0 ? i.after(e) : r.after(e);
      },
      highlight: function(e) {
        $(e)
          .closest(".form-group")
          .addClass("has-error");
      },
      unhighlight: function(e) {
        $(e)
          .closest(".form-group")
          .removeClass("has-error");
      },
      success: function(e) {
        e.closest(".form-group").removeClass("has-error");
      },
      submitHandler: function(e) {
        i.show(), r.hide();

        // var form = $("#createCourse")[0];
        // var courseForm = new FormData(form);
        // $.ajax({
        //   type: "POST",
        //   url: baseurl + "course/create",
        //   data: { courseForm },
        //   success: function(data) {
        //     var Obj = JSON.parse(data);
        //     console.log(Obj);
        //   }
        // });
        this.form.submit();
      }
    });
  };
  return {
    init: function() {
      e();
    }
  };
})();
