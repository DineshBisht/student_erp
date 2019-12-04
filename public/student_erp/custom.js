const baseurl = "http://localhost:8042/";

$(document).ready(function() {
  loadBatchLists();
  loadCourseLists();
  loadSectionLists();
  loadCountryLists();
});

var loadBatchLists = function() {
  if ($("#batchLists").length == 1) {
    showLoader("#batchLists");
    batchTable = $("#batchLists");
    batchtableFunc = $("#batchLists").DataTable({
      pageLength: 10,
      serverSide: true,
      processing: false,
      info: true,
      language: {
        aria: {
          sortAscending: ": activate to sort column ascending",
          sortDescending: ": activate to sort column descending"
        },
        emptyTable: "No record found",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        infoEmpty: "No record found",
        infoFiltered: "(filtered from _MAX_ total records)",
        lengthMenu: "Show _MENU_ entries",
        search: "Search:",
        zeroRecords: "No record found",
        paginate: {
          previous: "Prev",
          next: "Next",
          last: "Last",
          first: "First"
        }
      },
      pagingType: "bootstrap_extended",
      lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"] // change per page values here
      ],
      ajax: {
        url: baseurl + "batch/get_batch_lists",
        type: "POST",
        data: {},
        dataSrc: function(json) {
          //var a = JSON.parse(json);
          if (json.data.length == 0) {
            //$("#exportcontactcsv").attr("disabled",true);
          }
          Metronic.unblockUI($("#batchLists"));
          return json.data;
        }
      },
      createdRow: function(row, data, index) {
        $("td", row)
          .eq(1)
          .css("text-align", "left");
        $("td", row)
          .eq(1)
          .css("padding", "10px 18px");
      },
      columnDefs: [
        {
          orderable: false,
          targets: [0]
        }
      ],
      aaSorting: []
    });

    batchTable.on("preXhr.dt", function() {
      //showLoader(".page-content");
    });
    batchTable.on("draw.dt", function() {
      var set = $(".group-checkable").attr("data-set");
    });
  }
};
function showLoader(targetId = "") {
  Metronic.blockUI({
    message: "Loading...",
    target: $(targetId),
    overlayColor: "#eee",
    cenrerY: true,
    boxed: true
  });
}
var loadCourseLists = function() {
  if ($("#courseLists").length == 1) {
    showLoader("#courseLists");

    courseTable = $("#courseLists");
    courseTableFunc = $("#courseLists").DataTable({
      pageLength: 10,
      serverSide: true,
      processing: false,
      info: true,
      language: {
        aria: {
          sortAscending: ": activate to sort column ascending",
          sortDescending: ": activate to sort column descending"
        },
        emptyTable: "No record found",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        infoEmpty: "No record found",
        infoFiltered: "(filtered from _MAX_ total records)",
        lengthMenu: "Show _MENU_ entries",
        search: "Search:",
        zeroRecords: "No record found",
        paginate: {
          previous: "Prev",
          next: "Next",
          last: "Last",
          first: "First"
        }
      },
      pagingType: "bootstrap_extended",
      lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"] // change per page values here
      ],
      ajax: {
        url: baseurl + "course/get_course_lists",
        type: "POST",
        data: {},
        dataSrc: function(json) {
          Metronic.unblockUI($("#courseLists"));
          return json.data;
        }
      },
      createdRow: function(row, data, index) {
        $("td", row)
          .eq(1)
          .css("text-align", "left");
        $("td", row)
          .eq(1)
          .css("padding", "10px 18px");
      },
      columnDefs: [
        {
          orderable: false,
          targets: [0]
        }
      ],
      aaSorting: []
    });
    courseTable.find(".group-checkable").change(function() {
      var set = jQuery(this).attr("data-set");
      var checked = jQuery(this).is(":checked");
      jQuery(set).each(function() {
        if (checked) {
          $(this).prop("checked", true);
          $(this)
            .parents("tr")
            .addClass("active");
        } else {
          $(this).prop("checked", false);
          $(this)
            .parents("tr")
            .removeClass("active");
        }
      });
      jQuery.uniform.update(set);
    });

    courseTable.on("change", "tbody tr .checkboxes", function() {
      $(this)
        .parents("tr")
        .toggleClass("active");
    });
  }
};

function editCourse(courseID) {
  if (courseID) {
    window.location.href = baseurl + "course/" + courseID;
  }
}

function redirectForm(url) {
  if (url) {
    window.location.href = baseurl + url;
  }
}

function destroyDataTable(tableRef) {
  const myTable = jQuery(tableRef).DataTable();
  myTable.destroy();
}

function deleteCourse(courseID) {
  if (courseID) {
    $.ajax({
      url: baseurl + "course/" + courseID,
      type: "DELETE",
      contentType: false,
      cache: false,
      processData: false,
      beforeSend: function() {
        //loader comes here
      },
      statusCode: {
        200: function(resp) {
          alert("Deleted" + resp.message);
          destroyDataTable($("#courseLists"));
          loadCourseLists();
        }
      },
      success: function() {},
      error: function(e) {
        console.log(e);
        // Loader comes here
      },
      complete: function() {
        // Loader comes here
      }
    });
  }
}

function deleteBatch(batchID) {
  if (batchID) {
    $.ajax({
      url: baseurl + "batch/" + batchID,
      type: "DELETE",
      contentType: false,
      cache: false,
      processData: false,
      beforeSend: function() {
        showLoader("#batchLists");
      },
      statusCode: {
        200: function(resp) {
          Metronic.unblockUI($("#batchLists"));
          alert("Deleted" + resp.message);
        }
      },
      success: function() {},
      error: function(e) {
        Metronic.unblockUI($("#batchLists"));
        // Loader comes here
      },
      complete: function() {
        // Loader comes here
        destroyDataTable($("#batchLists"));
        loadBatchLists();
        Metronic.unblockUI($("#batchLists"));
      }
    });
  }
}

var loadSectionLists = function() {
  if ($("#sectionLists").length == 1) {
    showLoader("#sectionLists");

    courseTable = $("#sectionLists");
    courseTableFunc = $("#sectionLists").DataTable({
      pageLength: 10,
      serverSide: true,
      processing: false,
      info: true,
      language: {
        aria: {
          sortAscending: ": activate to sort column ascending",
          sortDescending: ": activate to sort column descending"
        },
        emptyTable: "No record found",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        infoEmpty: "No record found",
        infoFiltered: "(filtered from _MAX_ total records)",
        lengthMenu: "Show _MENU_ entries",
        search: "Search:",
        zeroRecords: "No record found",
        paginate: {
          previous: "Prev",
          next: "Next",
          last: "Last",
          first: "First"
        }
      },
      pagingType: "bootstrap_extended",
      lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"] // change per page values here
      ],
      ajax: {
        url: baseurl + "section/get_section_lists",
        type: "POST",
        data: {},
        dataSrc: function(json) {
          Metronic.unblockUI($("#sectionLists"));
          return json.data;
        }
      },
      createdRow: function(row, data, index) {
        $("td", row)
          .eq(1)
          .css("text-align", "left");
        $("td", row)
          .eq(1)
          .css("padding", "10px 18px");
      },
      columnDefs: [
        {
          orderable: false,
          targets: [0]
        }
      ],
      aaSorting: []
    });
    courseTable.find(".group-checkable").change(function() {
      var set = jQuery(this).attr("data-set");
      var checked = jQuery(this).is(":checked");
      jQuery(set).each(function() {
        if (checked) {
          $(this).prop("checked", true);
          $(this)
            .parents("tr")
            .addClass("active");
        } else {
          $(this).prop("checked", false);
          $(this)
            .parents("tr")
            .removeClass("active");
        }
      });
      jQuery.uniform.update(set);
    });

    courseTable.on("change", "tbody tr .checkboxes", function() {
      $(this)
        .parents("tr")
        .toggleClass("active");
    });
  }
};

var loadCountryLists = function() {
  if ($("#countryLists").length == 1) {
    showLoader("#countryLists");

    countryTable = $("#countryLists");
    countryTableFunc = $("#countryLists").DataTable({
      pageLength: 10,
      serverSide: true,
      processing: false,
      info: true,
      language: {
        aria: {
          sortAscending: ": activate to sort column ascending",
          sortDescending: ": activate to sort column descending"
        },
        emptyTable: "No record found",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        infoEmpty: "No record found",
        infoFiltered: "(filtered from _MAX_ total records)",
        lengthMenu: "Show _MENU_ entries",
        search: "Search:",
        zeroRecords: "No record found",
        paginate: {
          previous: "Prev",
          next: "Next",
          last: "Last",
          first: "First"
        }
      },
      pagingType: "bootstrap_extended",
      lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"] // change per page values here
      ],
      ajax: {
        url: baseurl + "configuration/country",
        type: "POST",
        data: {},
        dataSrc: function(json) {
          Metronic.unblockUI($("#countryLists"));
          return json.data;
        }
      },
      createdRow: function(row, data, index) {
        $("td", row)
          .eq(1)
          .css("text-align", "left");
        $("td", row)
          .eq(1)
          .css("padding", "10px 18px");
      },
      columnDefs: [
        {
          orderable: false,
          targets: [0]
        }
      ],
      aaSorting: []
    });
    countryTable.find(".group-checkable").change(function() {
      var set = jQuery(this).attr("data-set");
      var checked = jQuery(this).is(":checked");
      jQuery(set).each(function() {
        if (checked) {
          $(this).prop("checked", true);
          $(this)
            .parents("tr")
            .addClass("active");
        } else {
          $(this).prop("checked", false);
          $(this)
            .parents("tr")
            .removeClass("active");
        }
      });
      jQuery.uniform.update(set);
    });

    countryTable.on("change", "tbody tr .checkboxes", function() {
      $(this)
        .parents("tr")
        .toggleClass("active");
    });
  }
};

function deleteCountry(countryID) {
  if (countryID) {
    $.ajax({
      url: baseurl + "configuration/country/" + countryID,
      type: "DELETE",
      contentType: false,
      cache: false,
      processData: false,
      beforeSend: function() {
        showLoader("#countryLists");
      },
      statusCode: {
        200: function(resp) {
          Metronic.unblockUI($("#countryLists"));
          alert("Deleted" + resp.message);
        }
      },
      success: function() {},
      error: function(e) {
        Metronic.unblockUI($("#countryLists"));
        // Loader comes here
      },
      complete: function() {
        // Loader comes here
        destroyDataTable($("#countryLists"));
        loadCountryLists();
        Metronic.unblockUI($("#countryLists"));
      }
    });
  }
}
