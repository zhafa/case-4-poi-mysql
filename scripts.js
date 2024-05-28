// Initialize the map
var map = L.map("map").setView([-6.2, 106.816666], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

function dialogAlert(message) {
  $("#dialog-message").html(message);
  $("#dialog-message").attr("title", "Informasi")
  $("#dialog-message").dialog({
    modal: true,
    buttons: {
      Ok: function () {
        $(this).dialog("close");
        $(this).dialog("destroy");
        location.reload();
      },
    },
  });
}

function dialogConfirm(message, callback) {
  $("#dialog-message").html(message);
  $("#dialog-message").attr("title", "Konfirmasi")
  $("#dialog-message").dialog({
    modal: true,
    buttons: {
      Ya: function () {
        $(this).dialog("close");
        $(this).dialog("destroy");
        callback();
      },
      Tidak: function () {
        $(this).dialog("close");
        $(this).dialog("destroy");
      },
    },
  });
}



// Fetch and display POIs from the database
$(document).ready(function () {
  $.ajax({
    url: "CRUD/read_poi.php",
    type: "GET",
    success: function (response) {
      var pois = JSON.parse(response);
      pois.forEach(function (poi) {
        var marker = L.marker([poi.latitude, poi.longitude], {
          draggable: true,
        })
          .addTo(map)
          .bindPopup("<b>" + poi.name + "</b><br>" + poi.description)
          .on("contextmenu", function (e) {
            dialogConfirm("Apakah Anda yakin ingin menghapus POI ini?", function () {
              $.ajax({
                url: "CRUD/delete_poi.php",
                type: "POST",
                data: { id: poi.id },
                success: function (response) {
                  dialogAlert("POI berhasil dihapus");
                },
                error: function (error) {
                  dialogAlert("Gagal menghapus POI");
                },
              });
            });
          })
          .on("dragend", function (e) {
            var newLat = marker.getLatLng().lat;
            var newLng = marker.getLatLng().lng;
            $("#poi-id").val(poi.id);
            $("#poi-latitude").val(newLat);
            $("#poi-longitude").val(newLng);
            $("#poi-name").val(poi.name);
            $("#poi-description").val(poi.description);
            $("#poi-address").val(poi.address);
            $("#poi-category").val(poi.category);
            $("#modal-title").text("Update POI");
            $("#poi-modal").modal("show");
          });
      });
    },
    error: function (error) {
      dialogAlert("Gagal mengambil data POI");
    },
  });
});

// Add POI on map click
map.on("click", function (e) {
  $("#poi-latitude").val(e.latlng.lat);
  $("#poi-longitude").val(e.latlng.lng);
  $("#modal-title").text("Add POI");
  $("#poi-form")[0].reset();
  $("#poi-modal").modal("show");
});

// Handle form submission for creating/updating POI
$("#poi-form").on("submit", function (e) {
  e.preventDefault();
  var id = $("#poi-id").val();
  var url = id ? "CRUD/update_poi.php" : "CRUD/create_poi.php";
  var data = {
    id: id,
    name: $("#poi-name").val(),
    description: $("#poi-description").val(),
    address: $("#poi-address").val(),
    category: $("#poi-category").val(),
    latitude: $("#poi-latitude").val(),
    longitude: $("#poi-longitude").val(),
  };

  $.ajax({
    url: url,
    type: "POST",
    data: data,
    success: function (response) {
      dialogAlert("POI berhasil disimpan");
    },
    error: function (error) {
      dialogAlert("Gagal menyimpan POI");
    },
  });
});
