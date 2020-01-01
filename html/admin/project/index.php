<?php
if (isset($_GET['pdf'])) ini_set('max_execution_time', 300); //seconds
require_once __DIR__ . '/../common/headSecure.php';

if (!$AUTH->instancePermissionCheck(20) or !isset($_GET['id'])) die("Sorry - you can't access this page");

$DBLIB->where("projects.instances_id", $AUTH->data['instance']['instances_id']);
$DBLIB->where("projects.projects_deleted", 0);
$DBLIB->where("projects.projects_id", $_GET['id']);
$DBLIB->join("clients", "projects.clients_id=clients.clients_id", "LEFT");
$DBLIB->join("users", "projects.projects_manager=users.users_userid", "LEFT");
$PAGEDATA['project'] = $DBLIB->getone("projects", ["projects.*", "clients.clients_name", "users.users_name1", "users.users_name2", "users.users_email"]);
if (!$PAGEDATA['project']) die("404");

//AuditLog
$DBLIB->where("auditLog.auditLog_deleted", 0);
$DBLIB->where("auditLog.projects_id", $PAGEDATA['project']['projects_id']);
$DBLIB->where("auditLog.auditLog_actionTable", "projects"); //TODO show more in the log but for now only project stuff
$DBLIB->join("users", "auditLog.users_userid=users.users_userid", "LEFT");
$DBLIB->orderBy("auditLog.auditLog_timestamp", "DESC");
$PAGEDATA['project']['auditLog'] = $DBLIB->get("auditLog",null, ["auditLog.*", "users.users_name1", "users.users_name2", "users.users_email"]);

$PAGEDATA['pageConfig'] = ["TITLE" => $PAGEDATA["project"]['projects_name'], "BREADCRUMB" => false];

//Edit Options
if ($AUTH->instancePermissionCheck(22)) {
    $DBLIB->where("instances_id", $AUTH->data['instance']['instances_id']);
    $PAGEDATA['clients'] = $DBLIB->get("clients", null, ["clients_id", "clients_name"]);
}
if ($AUTH->instancePermissionCheck(23)) {
    $DBLIB->orderBy("users.users_name1", "ASC");
    $DBLIB->orderBy("users.users_name2", "ASC");
    $DBLIB->orderBy("users.users_created", "ASC");
    $DBLIB->where("users_deleted", 0);
    $DBLIB->join("userInstances", "users.users_userid=userInstances.users_userid","LEFT");
    $DBLIB->join("instancePositions", "userInstances.instancePositions_id=instancePositions.instancePositions_id","LEFT");
    $DBLIB->where("instances_id",  $AUTH->data['instance']['instances_id']);
    $DBLIB->where("userInstances.userInstances_deleted",  0);
    $PAGEDATA['potentialManagers'] = $DBLIB->get('users', null, ["users.users_name1", "users.users_name2", "users.users_userid"]);
}

//Payments
$PAGEDATA['FINANCIALS'] = projectFinancials($PAGEDATA['project']['projects_id']);

if (isset($_GET['pdf'])) {
    if (isset($_GET['finance'])) $PAGEDATA['showFinance'] = true;
    $mpdf = new \Mpdf\Mpdf(['tempDir' => sys_get_temp_dir().DIRECTORY_SEPARATOR.'mpdf','mode' => 'utf-8', 'format' => 'A4']);
    $mpdf->SetHTMLHeader('
                <table width="100%">
                    <tr>
                        <td width="50%"><b>' .  $PAGEDATA['USERDATA']['instance']['instances_name'] . '</b></td>
                        <td width="50%" style="text-align: right;">' . $PAGEDATA["project"]['clients_name'] . " - " . $PAGEDATA["project"]['projects_name'] . '</td>
                    </tr>
                </table>
                <div style="text-align: right; font-weight: bold;">
                    
                </div>
            ');
    $mpdf->SetHTMLFooter('
                <table width="100%">
                    <tr>
                        <td width="45%">Generated {DATE j M Y h:i:sa}</td>
                        <td width="10%" align="center">{PAGENO}/{nbpg}</td>
                        <td width="45%" style="text-align: right;">AdamRMS | &copy;{DATE Y} Bithell Studios Ltd.</td>
                    </tr>
                </table>
             ');
    $mpdf->WriteHTML($TWIG->render('project/pdf.twig', $PAGEDATA));
    $mpdf->Output();
} else echo $TWIG->render('project/index.twig', $PAGEDATA);
?>
