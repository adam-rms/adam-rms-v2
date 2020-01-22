<?php
if (isset($_GET['csv'])) {
    header("Content-type: text/csv");
    header("Content-Disposition: attachment; filename=assets.csv");
}
elseif (isset($_GET['xlsx'])) {
    header("Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    header("Content-Disposition: attachment; filename=assets.xlsx");
}
header("Pragma: no-cache");
header("Expires: 0");
require_once __DIR__ . '/../apiHeadSecure.php';
error_reporting(0); //Errors if shown mean it won't download right
ini_set('display_errors', 0);

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$DBLIB->orderBy("assetCategories.assetCategories_id", "ASC");
$DBLIB->orderBy("assetTypes.assetTypes_name", "ASC");
$DBLIB->join("manufacturers", "manufacturers.manufacturers_id=assetTypes.manufacturers_id", "LEFT");
$DBLIB->where("((SELECT COUNT(*) FROM assets WHERE assetTypes.assetTypes_id=assets.assetTypes_id AND assets.instances_id = '" . $AUTH->data['instance']['instances_id'] . "' AND assets_deleted = 0) > 0)");
$DBLIB->join("assetCategories", "assetCategories.assetCategories_id=assetTypes.assetCategories_id", "LEFT");
$assets = $DBLIB->get('assetTypes', null, ["assetTypes.*", "manufacturers.manufacturers_name", "assetCategories.assetCategories_name"]);
$PAGEDATA['assets'] = [];
$count = 0;
foreach ($assets as $asset) {
    $DBLIB->where("assets.instances_id", $AUTH->data['instance']['instances_id']);
    $DBLIB->where("assets.assetTypes_id", $asset['assetTypes_id']);
    $DBLIB->where("assets_deleted", 0);
    $DBLIB->orderBy("assets.assets_tag", "ASC");
    $asset['assets'] = $DBLIB->get("assets");
    $count += count($asset['assets']);
    $PAGEDATA['assets'][] = $asset;
}

//Get first asset added to give a created date
$DBLIB->where("assets.instances_id", $AUTH->data['instance']['instances_id']);
$DBLIB->where("assets_deleted", 0);
$DBLIB->orderBy("assets.assets_inserted", "ASC");
$created = $DBLIB->getValue("assets", "assets_inserted");

$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("Bithell Studios Ltd.")
    ->setLastModifiedBy($AUTH->data['instance']['instances_name'])
    ->setCompany($AUTH->data['instance']['instances_name'])
    ->setCreated(strtotime($created))
    ->setTitle("Asset Download from AdamRMS")
    ->setSubject("All assets from " . $AUTH->data['instance']['instances_name']);
$spreadsheet->getActiveSheet()->setTitle("Assets List");
$sheet = $spreadsheet->getActiveSheet();
for ($x = 1; $x < $sheet->getHighestRow(); $x++) {
    $sheet->removeRow($x);
}
$finalData = [];
foreach ($PAGEDATA['assets'] as $assetType) {
    $assetType['definableFields'] = explode(",", $assetType['assetTypes_definableFields']);
    if (count($assetType['definableFields']) != 10) $assetType['definableFields'] = ["","","","","","","","","","",""];
    foreach ($assetType['assets'] as $asset) {
        $spreadsheet->getActiveSheet()->insertNewRowBefore(1, 1);
        if ($asset['assets_tag'] <= 9999) $asset['assets_tag'] = "A-" . sprintf('%04d', $asset['assets_tag']);
        else $asset['assets_tag'] = "A-" . $asset['assets_tag'];
        $array = [$asset['assets_tag'], $assetType['assetCategories_name'], $assetType['assetTypes_name'], ($assetType['manufacturers_id'] != 1 ? $assetType['manufacturers_name'] : ""), $assetType['assetTypes_mass'], $assetType['assetTypes_dayRate'], $assetType['assetTypes_weekRate'], $assetType['assetTypes_value'], $asset['assets_notes']];
        for ($x = 1; $x <= 10; $x++) {
            array_push($array, $assetType['definableFields'][$x-1] . ($assetType['definableFields'][$x-1] != null ? ": ": ""),$asset['asset_definableFields_' . $x]);
        }
        $sheet->fromArray($array, NULL, 'A2');
    }
}
if (isset($_GET['csv'])) {
    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Csv($spreadsheet);
    $writer->setDelimiter(',');
    $writer->setEnclosure('"');
    $writer->setLineEnding("\r\n");
    $writer->setSheetIndex(0);
    $writer->save("php://output");
} elseif (isset($_GET['xlsx'])) {
    //Header
    $sheet->fromArray(["Asset Code", "Category", "Name", "Manufacturer", "Mass (kg)", "Day Rate", "Week Rate", "Value", "Notes", "Definable Fields"], NULL, 'A1');
    $sheet->mergeCells('J1:AC1');
    $sheet->getStyle("A1:AC1")->getFont()->setBold( true );
    $sheet->freezePane('B2');
    //Number Formats
    $sheet->getStyle('E2:E' . ($count+1))
        ->getNumberFormat()
        ->setFormatCode('#,##0.000');
    $sheet->getStyle('F2:F' . ($count+1))
        ->getNumberFormat()
        ->setFormatCode( '_-£* #,##0.00_-;-£* #,##0.00_-;_-£* "-"??_-;_-@_-');
    $sheet->getStyle('G2:G' . ($count+1))
        ->getNumberFormat()
        ->setFormatCode( '_-£* #,##0.00_-;-£* #,##0.00_-;_-£* "-"??_-;_-@_-');
    $sheet->getStyle('H2:H' . ($count+1))
        ->getNumberFormat()
        ->setFormatCode( '_-£* #,##0.00_-;-£* #,##0.00_-;_-£* "-"??_-;_-@_-');
    $sheet->getStyle('I2:I' . ($count+1))
        ->getAlignment()
        ->setWrapText(true);
    //Column Widths
    foreach(range('A','Z') as $columnID) {
        $sheet->getColumnDimension($columnID)
            ->setAutoSize(true);
    }
    //AutoFilter
    $sheet->setAutoFilter(
        $sheet->calculateWorksheetDimension()
    );

    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
} else die("404");