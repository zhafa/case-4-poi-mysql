<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
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

    $sql = "UPDATE poi SET name='$name', description='$description', address='$address', category='$category', latitude='$latitude', longitude='$longitude' WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
