<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $address = $_POST['address'];
    $category = $_POST['category'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];

    $conn = new mysqli('localhost', 'root', '', 'poi_db', '3307');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO poi (name, description, address, category, latitude, longitude) VALUES ('$name', '$description', '$address', '$category', '$latitude', '$longitude')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
