<?php
$conn = new mysqli('localhost', 'root', '', 'poi_db', '3307');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM poi";
$result = $conn->query($sql);

$pois = array();
while ($row = $result->fetch_assoc()) {
    $pois[] = $row;
}

echo json_encode($pois);

$conn->close();
