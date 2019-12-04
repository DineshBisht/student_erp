$(document).ready(function() {
  try {
    courseValidation.init();
  } catch (err) {}

  try {
    batchValidation.init();
  } catch (err) {}

  try {
    sectionValidation.init();
  } catch (err) {
    console.log(err);
  }

  try {
    countryValidation.init();
  } catch (err) {
    console.log(err);
  }
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

var batchValidation = (function() {
  var e = function() {
    var e = $("#createBatch"),
      r = $(".alert-danger", e),
      i = $(".alert-success", e);
    e.validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      focusInvalid: !1,
      ignore: "",
      rules: {
        batchName: { required: true },
        batchAlias: { required: !0 },
        course: { required: !0 },
        startDate: { required: !0 },
        endDate: { required: !0 }
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

var sectionValidation = (function() {
  var e = function() {
    var e = $("#sectionForm"),
      r = $(".alert-danger", e),
      i = $(".alert-success", e);
    e.validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      focusInvalid: !1,
      ignore: "",
      rules: {
        sectionName: { required: true },
        section: { required: !0 },
        intake: { required: !0 },
        staus: { required: !0 }
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

const countryValidation = (function() {
  var e = function() {
    var e = $("#countryForm"),
      r = $(".alert-danger", e),
      i = $(".alert-success", e);
    e.validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      focusInvalid: !1,
      ignore: "",
      rules: {
        name: { required: true },
        staus: { required: !0 }
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
