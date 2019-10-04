
<?php 
header("Access-Control-Allow-Origin: http://localhost:1841");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
//==============================================================================
// Do stuff
//==============================================================================
$params = array_merge($_GET, $_POST);

// Include the database connector
include "misc/db.php";
// Connect to the database
try {
	$db = DB::getInstance("OneRandomWord");
}
catch(PDOException $e) {
	print('{}');
    die;
}

$action = isset($params['action']) ? $params['action'] : '';

switch ($action) {
	case 'categories': 	print(getCategories()); break;
	case 'words': 		print(getWords()); break;
	default: 			print(getDefaultPage());
}

function getCategories() {
	GLOBAL $db;
	$stmt = $db->prepare("SELECT Categories.id, groupLabel, label, selected, COUNT(*) AS wordCount FROM Categories INNER JOIN Words ON category_id = Categories.id GROUP BY Categories.id ORDER BY groupLabel, label;");
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_NUM);

	return json_encode(array(
		'success' => true,
		'metaData' => array(
			'root' => 'results',
			'fields' => array(
				array('name' => 'id', 'type' => 'int', 'format' => '0'),
				array('name' => 'groupLabel', 'type' => 'string'),
				array('name' => 'label', 'type' => 'string'),
				array('name' => 'selected', 'type' => 'boolean'),
				array('name' => 'wordCount', 'type' => 'int', 'format' => '0')
			)
		),
		'results' => $results
	));
}

function getWords() {
	GLOBAL $db;
	$stmt = $db->prepare("SELECT id, category_id, word FROM Words ORDER BY RAND();");
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_NUM);

	return json_encode(array(
		'success' => true,
		'metaData' => array(
			'root' => 'results',
			'fields' => array(
				array('name' => 'id', 'type' => 'int', 'format' => '0'),
				array('name' => 'category_id', 'type' => 'int', 'format' => '0'),
				array('name' => 'word', 'type' => 'string')
			)
		),
		'results' => $results
	));
}

function getDefaultPage() {
	return 'default';
}
?>
