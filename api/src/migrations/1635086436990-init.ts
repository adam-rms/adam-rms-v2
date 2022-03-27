import { MigrationInterface, QueryRunner } from "typeorm";

export class init1635086436990 implements MigrationInterface {
  name = "init1635086436990";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`assetsbarcodes\` (\`assetsBarcodes_id\` int NOT NULL AUTO_INCREMENT, \`assets_id\` int NULL, \`assetsBarcodes_value\` varchar(500) NOT NULL, \`assetsBarcodes_type\` varchar(500) NOT NULL, \`assetsBarcodes_notes\` text NULL, \`assetsBarcodes_added\` timestamp NOT NULL, \`users_userid\` int NULL COMMENT 'Userid that added it', \`assetsBarcodes_deleted\` tinyint(1) NULL DEFAULT '0', INDEX \`assetsBarcodes_users_users_userid_fk\` (\`users_userid\`), INDEX \`assetsBarcodes_assets_assets_id_fk\` (\`assets_id\`), PRIMARY KEY (\`assetsBarcodes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`locationsbarcodes\` (\`locationsBarcodes_id\` int NOT NULL AUTO_INCREMENT, \`locations_id\` int NOT NULL, \`locationsBarcodes_value\` varchar(500) NOT NULL, \`locationsBarcodes_type\` varchar(500) NOT NULL, \`locationsBarcodes_notes\` text NULL, \`locationsBarcodes_added\` timestamp NOT NULL, \`users_userid\` int NULL COMMENT 'Userid that added it', \`locationsBarcodes_deleted\` tinyint(1) NULL DEFAULT '0', INDEX \`locationsBarcodes_users_users_userid_fk\` (\`users_userid\`), PRIMARY KEY (\`locationsBarcodes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assetsbarcodesscans\` (\`assetsBarcodesScans_id\` int NOT NULL AUTO_INCREMENT, \`assetsBarcodes_id\` int NOT NULL, \`assetsBarcodesScans_timestamp\` timestamp NOT NULL, \`users_userid\` int NULL, \`locationsBarcodes_id\` int NULL, \`location_assets_id\` int NULL, \`assetsBarcodes_customLocation\` varchar(500) NULL, INDEX \`assetsBarcodesScans_assets_assets_id_fk\` (\`location_assets_id\`), INDEX \`assetsBarcodesScans_locationsBarcodes_locationsBarcodes_id_fk\` (\`locationsBarcodes_id\`), INDEX \`assetsBarcodesScans_users_users_userid_fk\` (\`users_userid\`), INDEX \`assetsBarcodesScans_assetsBarcodes_assetsBarcodes_id_fk\` (\`assetsBarcodes_id\`), PRIMARY KEY (\`assetsBarcodesScans_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assetgroups\` (\`assetGroups_id\` int NOT NULL AUTO_INCREMENT, \`assetGroups_name\` varchar(200) NOT NULL, \`assetGroups_description\` text NULL, \`assetGroups_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`users_userid\` int NULL, \`instances_id\` int NOT NULL, INDEX \`assetGroups_users_users_userid_fk\` (\`users_userid\`), INDEX \`assetGroups_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`assetGroups_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cmspagesviews\` (\`cmsPagesViews_id\` int NOT NULL AUTO_INCREMENT, \`cmsPages_id\` int NOT NULL, \`cmsPagesViews_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`users_userid\` int NULL, \`cmsPages_type\` tinyint(1) NOT NULL DEFAULT '1', INDEX \`cmsPagesViews_cmsPagesViews_timestamp_index\` (\`cmsPagesViews_timestamp\`), INDEX \`cmsPagesViews_users_users_userid_fk\` (\`users_userid\`), INDEX \`cmsPagesViews_cmsPages_cmsPages_id_fk\` (\`cmsPages_id\`), PRIMARY KEY (\`cmsPagesViews_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cmspages\` (\`cmsPages_id\` int NOT NULL AUTO_INCREMENT, \`instances_id\` int NOT NULL, \`cmsPages_showNav\` tinyint(1) NOT NULL DEFAULT '0', \`cmsPages_showPublic\` tinyint(1) NOT NULL DEFAULT '0', \`cmsPages_showPublicNav\` tinyint(1) NOT NULL DEFAULT '1', \`cmsPages_visibleToGroups\` varchar(1000) NULL, \`cmsPages_navOrder\` int NOT NULL DEFAULT '999', \`cmsPages_fontAwesome\` varchar(500) NULL, \`cmsPages_name\` varchar(500) NOT NULL, \`cmsPages_description\` text NULL, \`cmsPages_archived\` tinyint(1) NOT NULL DEFAULT '0', \`cmsPages_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`cmsPages_added\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`cmsPages_subOf\` int NULL, INDEX \`cmsPages_cmsPages_cmsPages_id_fk\` (\`cmsPages_subOf\`), INDEX \`cmsPages_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`cmsPages_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cmspagesdrafts\` (\`cmsPagesDrafts_id\` int NOT NULL AUTO_INCREMENT, \`cmsPages_id\` int NOT NULL, \`users_userid\` int NULL, \`cmsPagesDrafts_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`cmsPagesDrafts_data\` json NULL, \`cmsPagesDrafts_changelog\` text NULL, \`cmsPagesDrafts_revisionID\` int NOT NULL, INDEX \`cmsPagesDrafts_cmsPagesDrafts_timestamp_index\` (\`cmsPagesDrafts_timestamp\`), INDEX \`cmsPagesDrafts_users_users_userid_fk\` (\`users_userid\`), INDEX \`cmsPagesDrafts_cmsPages_cmsPages_id_fk\` (\`cmsPages_id\`), PRIMARY KEY (\`cmsPagesDrafts_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`maintenancejobs\` (\`maintenanceJobs_id\` int NOT NULL AUTO_INCREMENT, \`maintenanceJobs_assets\` varchar(500) NOT NULL, \`maintenanceJobs_timestamp_added\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`maintenanceJobs_timestamp_due\` timestamp NULL, \`maintenanceJobs_user_tagged\` varchar(500) NULL, \`maintenanceJobs_user_creator\` int NOT NULL, \`maintenanceJobs_user_assignedTo\` int NULL, \`maintenanceJobs_title\` varchar(500) NULL, \`maintenanceJobs_faultDescription\` varchar(500) NULL, \`maintenanceJobs_priority\` tinyint NOT NULL COMMENT '1 to 10' DEFAULT '5', \`instances_id\` int NOT NULL, \`maintenanceJobs_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`maintenanceJobsStatuses_id\` int NULL, \`maintenanceJobs_flagAssets\` tinyint(1) NOT NULL DEFAULT '0', \`maintenanceJobs_blockAssets\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`maintenanceJobs_users_users_userid_fk\` (\`maintenanceJobs_user_creator\`), PRIMARY KEY (\`maintenanceJobs_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`maintenancejobsmessages\` (\`maintenanceJobsMessages_id\` int NOT NULL AUTO_INCREMENT, \`maintenanceJobs_id\` int NULL, \`maintenanceJobsMessages_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`users_userid\` int NOT NULL, \`maintenanceJobsMessages_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`maintenanceJobsMessages_text\` text NULL, \`maintenanceJobsMessages_file\` int NULL, INDEX \`maintenanceJobsMessages_maintenanceJobs_maintenanceJobs_id_fk\` (\`maintenanceJobs_id\`), INDEX \`maintenanceJobsMessages___files\` (\`maintenanceJobsMessages_file\`), PRIMARY KEY (\`maintenanceJobsMessages_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`usermodulescertifications\` (\`userModulesCertifications_id\` int NOT NULL AUTO_INCREMENT, \`modules_id\` int NOT NULL, \`users_userid\` int NOT NULL, \`userModulesCertifications_revoked\` tinyint(1) NOT NULL DEFAULT '0', \`userModulesCertifications_approvedBy\` int NOT NULL, \`userModulesCertifications_approvedComment\` varchar(2000) NULL, \`userModulesCertifications_timestamp\` timestamp NOT NULL, INDEX \`userModulesCertifications_modules_modules_id_fk\` (\`modules_id\`), INDEX \`userModulesCertifications_users_users_userid_fk_2\` (\`userModulesCertifications_approvedBy\`), INDEX \`userModulesCertifications_users_users_userid_fk\` (\`users_userid\`), PRIMARY KEY (\`userModulesCertifications_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`usermodules\` (\`userModules_id\` int NOT NULL AUTO_INCREMENT, \`modules_id\` int NOT NULL, \`users_userid\` int NOT NULL, \`userModules_stepsCompleted\` varchar(1000) NULL, \`userModules_currentStep\` int NULL, \`userModules_started\` timestamp NOT NULL, \`userModules_updated\` timestamp NOT NULL, INDEX \`userModules_modulesSteps_modulesSteps_id_fk\` (\`userModules_currentStep\`), INDEX \`userModules_users_users_userid_fk\` (\`users_userid\`), INDEX \`userModules_modules_modules_id_fk\` (\`modules_id\`), PRIMARY KEY (\`userModules_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`modulessteps\` (\`modulesSteps_id\` int NOT NULL AUTO_INCREMENT, \`modules_id\` int NOT NULL, \`modulesSteps_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`modulesSteps_show\` tinyint(1) NOT NULL DEFAULT '1', \`modulesSteps_name\` varchar(500) NOT NULL, \`modulesSteps_type\` tinyint(1) NOT NULL, \`modulesSteps_content\` longtext NULL, \`modulesSteps_completionTime\` int NULL DEFAULT '0', \`modulesSteps_internalNotes\` longtext NULL, \`modulesSteps_order\` int NOT NULL DEFAULT '999', \`modulesSteps_locked\` tinyint(1) NOT NULL COMMENT 'When set this is a like system level step that can''t be edited' DEFAULT '0', INDEX \`modulesSteps_modules_modules_id_fk\` (\`modules_id\`), PRIMARY KEY (\`modulesSteps_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`modules\` (\`modules_id\` int NOT NULL AUTO_INCREMENT, \`instances_id\` int NOT NULL, \`users_userid\` int NOT NULL COMMENT '"Author"', \`modules_name\` varchar(500) NOT NULL, \`modules_description\` text NULL, \`modules_learningObjectives\` text NULL, \`modules_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`modules_show\` tinyint(1) NOT NULL DEFAULT '0', \`modules_thumbnail\` int NULL, \`modules_type\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`modules_s3files_s3files_id_fk\` (\`modules_thumbnail\`), INDEX \`modules_users_users_userid_fk\` (\`users_userid\`), INDEX \`modules_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`modules_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`CREATE TABLE \`s3files\` (\`s3files_id\` int NOT NULL AUTO_INCREMENT, \`instances_id\` int NOT NULL, \`s3files_path\` varchar(255) NULL COMMENT 'NO LEADING /', \`s3files_name\` varchar(1000) NULL, \`s3files_filename\` varchar(255) NOT NULL, \`s3files_extension\` varchar(255) NOT NULL, \`s3files_original_name\` varchar(500) NULL COMMENT 'What was this file originally called when it was uploaded? For things like file attachments
', \`s3files_region\` varchar(255) NOT NULL, \`s3files_endpoint\` varchar(255) NOT NULL, \`s3files_cdn_endpoint\` varchar(255) NULL, \`s3files_bucket\` varchar(255) NOT NULL, \`s3files_meta_size\` bigint NOT NULL COMMENT 'Size of the file in bytes', \`s3files_meta_public\` tinyint(1) NOT NULL DEFAULT '0', \`s3files_shareKey\` varchar(255) NULL, \`s3files_meta_type\` tinyint NOT NULL COMMENT '0 = undefined
Rest are set out in corehead
' DEFAULT '0', \`s3files_meta_subType\` int NULL COMMENT 'Depends what it is - each module that uses the file handler will be setting this for themselves', \`s3files_meta_uploaded\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`users_userid\` int NULL COMMENT 'Who uploaded it?', \`s3files_meta_deleteOn\` timestamp NULL COMMENT 'Delete this file on this set date (basically if you hit delete we will kill it after say 30 days)', \`s3files_meta_physicallyStored\` tinyint(1) NOT NULL COMMENT 'If we have the file it''s 1 - if we deleted it it''s 0 but the "deleteOn" is set. If we lost it it''s 0 with a null "delete on"' DEFAULT '1', \`s3files_compressed\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`s3files_users_users_userid_fk\` (\`users_userid\`), INDEX \`s3files_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`s3files_id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `CREATE TABLE \`signupcodes\` (\`signupCodes_id\` int NOT NULL AUTO_INCREMENT, \`signupCodes_name\` varchar(200) NOT NULL, \`instances_id\` int NOT NULL, \`signupCodes_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`signupCodes_valid\` tinyint(1) NOT NULL DEFAULT '1', \`signupCodes_notes\` text NULL, \`signupCodes_role\` varchar(500) NOT NULL, \`instancePositions_id\` int NULL, INDEX \`signupCodes_instancePositions_instancePositions_id_fk\` (\`instancePositions_id\`), INDEX \`signupCodes_instances_instances_id_fk\` (\`instances_id\`), UNIQUE INDEX \`signupCodes_signupCodes_name_uindex\` (\`signupCodes_name\`), UNIQUE INDEX \`IDX_e2ebde7ffc7bddb5f54dea6870\` (\`signupCodes_name\`), PRIMARY KEY (\`signupCodes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`instancepositions\` (\`instancePositions_id\` int NOT NULL AUTO_INCREMENT, \`instances_id\` int NOT NULL, \`instancePositions_displayName\` varchar(500) NOT NULL, \`instancePositions_rank\` int NOT NULL DEFAULT '999', \`instancePositions_actions\` varchar(5000) NULL, \`instancePositions_deleted\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`instancePositions_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`instancePositions_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`userinstances\` (\`userInstances_id\` int NOT NULL AUTO_INCREMENT, \`users_userid\` int NOT NULL, \`instancePositions_id\` int NOT NULL, \`userInstances_extraPermissions\` varchar(5000) NULL, \`userInstances_label\` varchar(500) NULL, \`userInstances_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`signupCodes_id\` int NULL, \`userInstances_archived\` timestamp NULL, INDEX \`userInstances_signupCodes_signupCodes_id_fk\` (\`signupCodes_id\`), INDEX \`userInstances_users_users_userid_fk\` (\`users_userid\`), INDEX \`userInstances_instancePositions_instancePositions_id_fk\` (\`instancePositions_id\`), PRIMARY KEY (\`userInstances_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`crewassignments\` (\`crewAssignments_id\` int NOT NULL AUTO_INCREMENT, \`users_userid\` int NULL, \`projects_id\` int NOT NULL, \`crewAssignments_personName\` varchar(500) NULL, \`crewAssignments_role\` varchar(500) NOT NULL, \`crewAssignments_comment\` varchar(500) NULL, \`crewAssignments_deleted\` tinyint(1) NULL DEFAULT '0', \`crewAssignments_rank\` int NULL DEFAULT '99', INDEX \`crewAssignments_users_users_userid_fk\` (\`users_userid\`), INDEX \`crewAssignments_projects_projects_id_fk\` (\`projects_id\`), PRIMARY KEY (\`crewAssignments_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projectsvacantroles\` (\`projectsVacantRoles_id\` int NOT NULL AUTO_INCREMENT, \`projects_id\` int NOT NULL, \`projectsVacantRoles_name\` varchar(500) NOT NULL, \`projectsVacantRoles_description\` text NULL, \`projectsVacantRoles_personSpecification\` text NULL, \`projectsVacantRoles_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRoles_open\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRoles_showPublic\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRoles_added\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`projectsVacantRoles_deadline\` timestamp NULL, \`projectsVacantRoles_firstComeFirstServed\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRoles_fileUploads\` tinyint(1) NOT NULL DEFAULT '1', \`projectsVacantRoles_slots\` int NOT NULL DEFAULT '1', \`projectsVacantRoles_slotsFilled\` int NOT NULL DEFAULT '0', \`projectsVacantRoles_questions\` json NULL, \`projectsVacantRoles_collectPhone\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRoles_privateToPM\` tinyint(1) NOT NULL DEFAULT '1', INDEX \`projectsVacantRoles_projects_projects_id_fk\` (\`projects_id\`), PRIMARY KEY (\`projectsVacantRoles_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`CREATE TABLE \`projectsvacantrolesapplications\` (\`projectsVacantRolesApplications_id\` int NOT NULL AUTO_INCREMENT, \`projectsVacantRoles_id\` int NOT NULL, \`users_userid\` int NOT NULL, \`projectsVacantRolesApplications_files\` text NULL, \`projectsVacantRolesApplications_phone\` varchar(255) NULL, \`projectsVacantRolesApplications_applicantComment\` text NULL, \`projectsVacantRolesApplications_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRolesApplications_withdrawn\` tinyint(1) NOT NULL DEFAULT '0', \`projectsVacantRolesApplications_submitted\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`projectsVacantRolesApplications_questionAnswers\` json NULL, \`projectsVacantRolesApplications_status\` tinyint(1) NOT NULL COMMENT '1 = Success
2 = Rejected' DEFAULT '0', INDEX \`projectsVacantRolesApplications_users_users_userid_fk\` (\`users_userid\`), INDEX \`projectsVacantRolesApplications_projectsVacantRolesid_fk\` (\`projectsVacantRoles_id\`), PRIMARY KEY (\`projectsVacantRolesApplications_id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `CREATE TABLE \`projectsnotes\` (\`projectsNotes_id\` int NOT NULL AUTO_INCREMENT, \`projectsNotes_title\` varchar(200) NOT NULL, \`projectsNotes_text\` text NULL, \`projectsNotes_userid\` int NOT NULL, \`projects_id\` int NOT NULL, \`projectsNotes_deleted\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`projectsNotes_users_users_userid_fk\` (\`projectsNotes_userid\`), INDEX \`projectsNotes_projects_projects_id_fk\` (\`projects_id\`), PRIMARY KEY (\`projectsNotes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`auditlog\` (\`auditLog_id\` int NOT NULL AUTO_INCREMENT, \`auditLog_actionType\` varchar(500) NULL, \`auditLog_actionTable\` varchar(500) NULL, \`auditLog_actionData\` longtext NULL, \`auditLog_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`users_userid\` int NULL, \`auditLog_actionUserid\` int NULL, \`projects_id\` int NULL, \`auditLog_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`auditLog_targetID\` int NULL, INDEX \`auditLog_users_users_userid_fk_2\` (\`auditLog_actionUserid\`), INDEX \`auditLog_users_users_userid_fk\` (\`users_userid\`), PRIMARY KEY (\`auditLog_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`emailsent\` (\`emailSent_id\` int NOT NULL AUTO_INCREMENT, \`users_userid\` int NOT NULL, \`emailSent_html\` longtext NOT NULL, \`emailSent_subject\` varchar(255) NOT NULL, \`emailSent_sent\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`emailSent_fromEmail\` varchar(200) NOT NULL, \`emailSent_fromName\` varchar(200) NOT NULL, \`emailSent_toName\` varchar(200) NOT NULL, \`emailSent_toEmail\` varchar(200) NOT NULL, INDEX \`emailSent_users_users_userid_fk\` (\`users_userid\`), PRIMARY KEY (\`emailSent_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`positions\` (\`positions_id\` int NOT NULL AUTO_INCREMENT, \`positions_displayName\` varchar(255) NOT NULL, \`positions_positionsGroups\` varchar(500) NULL, \`positions_rank\` tinyint NOT NULL COMMENT 'Rank of the position - so that the most senior position for a user is shown as their "main one". 0 is the most senior' DEFAULT '4', PRIMARY KEY (\`positions_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`CREATE TABLE \`userpositions\` (\`userPositions_id\` int NOT NULL AUTO_INCREMENT, \`users_userid\` int NULL, \`userPositions_start\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userPositions_end\` timestamp NULL, \`positions_id\` int NULL COMMENT 'Can be null if you like - as long as you set the relevant other fields', \`userPositions_displayName\` varchar(255) NULL, \`userPositions_extraPermissions\` varchar(500) NULL COMMENT 'Allow a few extra permissions to be added just for this user for that exact permissions term
', \`userPositions_show\` tinyint(1) NOT NULL DEFAULT '1', INDEX \`userPositions_users_users_userid_fk\` (\`users_userid\`), INDEX \`userPositions_positions_positions_id_fk\` (\`positions_id\`), PRIMARY KEY (\`userPositions_id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `CREATE TABLE \`authtokens\` (\`authTokens_id\` int NOT NULL AUTO_INCREMENT, \`authTokens_token\` varchar(500) NOT NULL, \`authTokens_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`authTokens_ipAddress\` varchar(500) NULL, \`users_userid\` int NOT NULL, \`authTokens_valid\` tinyint(1) NOT NULL COMMENT '1 for true. 0 for false' DEFAULT '1', \`authTokens_adminId\` int NULL, \`authTokens_deviceType\` varchar(1000) NOT NULL, INDEX \`authTokens_users_users_userid_fk_2\` (\`authTokens_adminId\`), INDEX \`authTokens_users_users_userid_fk\` (\`users_userid\`), UNIQUE INDEX \`token\` (\`authTokens_token\`), UNIQUE INDEX \`IDX_b9676e71e06d55eb2d7cd42e89\` (\`authTokens_token\`), PRIMARY KEY (\`authTokens_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`emailverificationcodes\` (\`emailVerificationCodes_id\` int NOT NULL AUTO_INCREMENT, \`emailVerificationCodes_code\` varchar(1000) NOT NULL, \`emailVerificationCodes_used\` tinyint(1) NOT NULL DEFAULT '0', \`emailVerificationCodes_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`emailVerificationCodes_valid\` int NOT NULL DEFAULT '1', \`users_userid\` int NOT NULL, INDEX \`emailVerificationCodes_users_users_userid_fk\` (\`users_userid\`), PRIMARY KEY (\`emailVerificationCodes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`passwordresetcodes\` (\`passwordResetCodes_id\` int NOT NULL AUTO_INCREMENT, \`passwordResetCodes_code\` varchar(1000) NOT NULL, \`passwordResetCodes_used\` tinyint(1) NOT NULL DEFAULT '0', \`passwordResetCodes_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`passwordResetCodes_valid\` int NOT NULL DEFAULT '1', \`users_userid\` int NOT NULL, INDEX \`passwordResetCodes_users_users_userid_fk\` (\`users_userid\`), PRIMARY KEY (\`passwordResetCodes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`users_username\` varchar(200) NULL, \`users_name1\` varchar(100) NULL, \`users_name2\` varchar(100) NULL, \`users_userid\` int NOT NULL AUTO_INCREMENT, \`users_salty1\` varchar(30) NULL, \`users_password\` varchar(150) NULL, \`users_salty2\` varchar(50) NULL, \`users_hash\` varchar(255) NOT NULL, \`users_email\` varchar(257) NULL, \`users_created\` timestamp NULL COMMENT 'When user signed up' DEFAULT CURRENT_TIMESTAMP, \`users_notes\` text NULL COMMENT 'Internal Notes - Not visible to user', \`users_thumbnail\` int NULL, \`users_changepass\` tinyint(1) NOT NULL DEFAULT '0', \`users_selectedProjectID\` int NULL, \`users_selectedInstanceIDLast\` int NULL COMMENT 'What is the instance ID they most recently selected? This will be the one we use next time they login', \`users_suspended\` tinyint(1) NOT NULL DEFAULT '0', \`users_deleted\` tinyint(1) NULL DEFAULT '0', \`users_emailVerified\` tinyint(1) NOT NULL DEFAULT '0', \`users_social_facebook\` varchar(100) NULL, \`users_social_twitter\` varchar(100) NULL, \`users_social_instagram\` varchar(100) NULL, \`users_social_linkedin\` varchar(100) NULL, \`users_social_snapchat\` varchar(100) NULL, \`users_calendarHash\` varchar(200) NULL, \`users_widgets\` varchar(500) NULL, \`users_notificationSettings\` text NULL, \`users_assetGroupsWatching\` varchar(200) NULL, \`users_oauth_googleid\` varchar(255) NULL, \`users_dark_mode\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`username_2\` (\`users_userid\`), UNIQUE INDEX \`users_users_username_uindex\` (\`users_username\`), UNIQUE INDEX \`users_users_email_uindex\` (\`users_email\`), UNIQUE INDEX \`IDX_5c2a8447cd2808ef912e92fe0b\` (\`users_username\`), UNIQUE INDEX \`IDX_fe62a84d8ea7e438d0f322c081\` (\`users_email\`), PRIMARY KEY (\`users_userid\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`locations\` (\`locations_id\` int NOT NULL AUTO_INCREMENT, \`locations_name\` varchar(500) NOT NULL, \`clients_id\` int NULL, \`instances_id\` int NOT NULL, \`locations_address\` text NULL, \`locations_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`locations_subOf\` int NULL, \`locations_notes\` text NULL, INDEX \`locations_locations_locations_id_fk\` (\`locations_subOf\`), INDEX \`locations_instances_instances_id_fk\` (\`instances_id\`), INDEX \`locations_clients_clients_id_fk\` (\`clients_id\`), PRIMARY KEY (\`locations_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clients\` (\`clients_id\` int NOT NULL AUTO_INCREMENT, \`clients_name\` varchar(500) NOT NULL, \`instances_id\` int NOT NULL, \`clients_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`clients_website\` varchar(500) NULL, \`clients_email\` varchar(500) NULL, \`clients_notes\` text NULL, \`clients_address\` varchar(500) NULL, \`clients_phone\` varchar(500) NULL, INDEX \`clients_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`clients_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`CREATE TABLE \`payments\` (\`payments_id\` int NOT NULL AUTO_INCREMENT, \`payments_amount\` int NOT NULL, \`payments_quantity\` int NOT NULL DEFAULT '1', \`payments_type\` tinyint(1) NOT NULL COMMENT '1 = Payment Recieved
2 = Sales item
3 = SubHire item
4 = Staff cost', \`payments_reference\` varchar(500) NULL, \`payments_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`payments_supplier\` varchar(500) NULL, \`payments_method\` varchar(500) NULL, \`payments_comment\` varchar(500) NULL, \`projects_id\` int NOT NULL, \`payments_deleted\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`payments_projects_projects_id_fk\` (\`projects_id\`), PRIMARY KEY (\`payments_id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `CREATE TABLE \`projectsfinancecache\` (\`projectsFinanceCache_id\` int NOT NULL AUTO_INCREMENT, \`projects_id\` int NOT NULL, \`projectsFinanceCache_timestamp\` timestamp NOT NULL, \`projectsFinanceCache_timestampUpdated\` timestamp NULL, \`projectsFinanceCache_equipmentSubTotal\` int NULL, \`projectsFinanceCache_equiptmentDiscounts\` int NULL, \`projectsFinanceCache_equiptmentTotal\` int NULL, \`projectsFinanceCache_salesTotal\` int NULL, \`projectsFinanceCache_staffTotal\` int NULL, \`projectsFinanceCache_externalHiresTotal\` int NULL, \`projectsFinanceCache_paymentsReceived\` int NULL, \`projectsFinanceCache_grandTotal\` int NULL, \`projectsFinanceCache_value\` int NULL, \`projectsFinanceCache_mass\` decimal(55,5) NULL, INDEX \`projectFinnaceCacheTimestamp\` (\`projectsFinanceCache_timestamp\`), INDEX \`projectsFinanceCache_projects_projects_id_fk\` (\`projects_id\`), PRIMARY KEY (\`projectsFinanceCache_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`projects_id\` int NOT NULL AUTO_INCREMENT, \`projects_name\` varchar(500) NOT NULL, \`instances_id\` int NOT NULL, \`projects_manager\` int NOT NULL, \`projects_description\` text NULL, \`projects_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`clients_id\` int NULL, \`projects_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`projects_archived\` tinyint(1) NOT NULL DEFAULT '0', \`projects_dates_use_start\` timestamp NULL, \`projects_dates_use_end\` timestamp NULL, \`projects_dates_deliver_start\` timestamp NULL, \`projects_dates_deliver_end\` timestamp NULL, \`projects_status\` tinyint NOT NULL COMMENT 'Provisional' DEFAULT '0', \`locations_id\` int NULL, \`projects_invoiceNotes\` text NULL, \`projects_defaultDiscount\` double(22,2) NOT NULL DEFAULT '0.00', \`projectsTypes_id\` int NOT NULL, \`projects_parent_project_id\` int NULL, INDEX \`projects_parent_project_id\` (\`projects_parent_project_id\`), INDEX \`projects_projectsTypes_projectsTypes_id_fk\` (\`projectsTypes_id\`), INDEX \`projects_locations_locations_id_fk\` (\`locations_id\`), INDEX \`projects_users_users_userid_fk\` (\`projects_manager\`), INDEX \`projects_instances_instances_id_fk\` (\`instances_id\`), INDEX \`projects_clients_clients_id_fk\` (\`clients_id\`), PRIMARY KEY (\`projects_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`CREATE TABLE \`assetsassignments\` (\`assetsAssignments_id\` int NOT NULL AUTO_INCREMENT, \`assets_id\` int NOT NULL, \`projects_id\` int NOT NULL, \`assetsAssignments_comment\` varchar(500) NULL, \`assetsAssignments_customPrice\` int NOT NULL DEFAULT '0', \`assetsAssignments_discount\` float(12) NOT NULL DEFAULT '0', \`assetsAssignments_timestamp\` timestamp NULL, \`assetsAssignments_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`assetsAssignmentsStatus_id\` int NULL COMMENT '0 = None applicable
10 = Pending pick
20 = Picked
30 = Prepping
40 = Tested
50 = Packed
60 = Dispatched
70 = Awaiting Check-in
80 = Case opened
90 = Unpacked
100 = Tested
110 = Stored', \`assetsAssignments_linkedTo\` int NULL, INDEX \`assetsAssignments_assetsAssignments_assetsAssignments_id_fk\` (\`assetsAssignments_linkedTo\`), INDEX \`assetsAssignments_projects_projects_id_fk\` (\`projects_id\`), INDEX \`assetsAssignments_assets_assets_id_fk\` (\`assets_id\`), PRIMARY KEY (\`assetsAssignments_id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `CREATE TABLE \`assets\` (\`assets_id\` int NOT NULL AUTO_INCREMENT, \`assets_tag\` varchar(200) NULL COMMENT 'The ID/Tag that the asset carries marked onto it', \`assetTypes_id\` int NOT NULL, \`assets_notes\` text NULL, \`instances_id\` int NOT NULL, \`asset_definableFields_1\` varchar(200) NULL, \`asset_definableFields_2\` varchar(200) NULL, \`asset_definableFields_3\` varchar(200) NULL, \`asset_definableFields_4\` varchar(200) NULL, \`asset_definableFields_5\` varchar(200) NULL, \`asset_definableFields_6\` varchar(200) NULL, \`asset_definableFields_7\` varchar(200) NULL, \`asset_definableFields_8\` varchar(200) NULL, \`asset_definableFields_9\` varchar(200) NULL, \`asset_definableFields_10\` varchar(200) NULL, \`assets_inserted\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`assets_dayRate\` int NULL, \`assets_linkedTo\` int NULL, \`assets_weekRate\` int NULL, \`assets_value\` int NULL, \`assets_mass\` decimal(55,5) NULL, \`assets_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`assets_endDate\` timestamp NULL, \`assets_archived\` varchar(200) NULL, \`assets_assetGroups\` varchar(500) NULL, \`assets_storageLocation\` int NULL, \`assets_showPublic\` tinyint(1) NOT NULL DEFAULT '1', INDEX \`assets_locations_locations_id_fk\` (\`assets_storageLocation\`), INDEX \`assets_instances_instances_id_fk\` (\`instances_id\`), INDEX \`assets_assets_assets_id_fk\` (\`assets_linkedTo\`), INDEX \`assets_assetTypes_assetTypes_id_fk\` (\`assetTypes_id\`), PRIMARY KEY (\`assets_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assetsassignmentsstatus\` (\`assetsAssignmentsStatus_id\` int NOT NULL AUTO_INCREMENT, \`instances_id\` int NOT NULL, \`assetsAssignmentsStatus_name\` varchar(200) NOT NULL, \`assetsAssignmentsStatus_order\` int NULL DEFAULT '999', \`assetsAssignmentsStatus_deleted\` int NOT NULL DEFAULT '0', INDEX \`assetsAssignmentsStatus_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`assetsAssignmentsStatus_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`manufacturers\` (\`manufacturers_id\` int NOT NULL AUTO_INCREMENT, \`manufacturers_name\` varchar(500) NOT NULL, \`instances_id\` int NULL, \`manufacturers_internalAdamRMSNote\` varchar(500) NULL, \`manufacturers_website\` varchar(200) NULL, \`manufacturers_notes\` text NULL, INDEX \`manufacturers_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`manufacturers_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`maintenancejobsstatuses\` (\`maintenanceJobsStatuses_id\` int NOT NULL AUTO_INCREMENT, \`instances_id\` int NULL, \`maintenanceJobsStatuses_name\` varchar(200) NOT NULL, \`maintenanceJobsStatuses_order\` tinyint(1) NOT NULL DEFAULT '99', \`maintenanceJobsStatuses_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`maintenanceJobsStatuses_showJobInMainList\` tinyint(1) NOT NULL DEFAULT '1', INDEX \`maintenanceJobsStatuses_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`maintenanceJobsStatuses_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projectstypes\` (\`projectsTypes_id\` int NOT NULL AUTO_INCREMENT, \`projectsTypes_name\` varchar(200) NOT NULL, \`instances_id\` int NOT NULL, \`projectsTypes_deleted\` tinyint(1) NOT NULL DEFAULT '0', \`projectsTypes_config_finance\` tinyint(1) NOT NULL DEFAULT '1', \`projectsTypes_config_files\` int NOT NULL DEFAULT '1', \`projectsTypes_config_assets\` int NOT NULL DEFAULT '1', \`projectsTypes_config_client\` int NOT NULL DEFAULT '1', \`projectsTypes_config_venue\` int NOT NULL DEFAULT '1', \`projectsTypes_config_notes\` int NOT NULL DEFAULT '1', \`projectsTypes_config_crew\` int NOT NULL DEFAULT '1', INDEX \`projectsTypes_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`projectsTypes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`instances\` (\`instances_id\` int NOT NULL AUTO_INCREMENT, \`instances_name\` varchar(200) NOT NULL, \`instances_deleted\` tinyint(1) NULL DEFAULT '0', \`instances_plan\` varchar(500) NULL, \`instances_address\` varchar(1000) NULL, \`instances_phone\` varchar(200) NULL, \`instances_email\` varchar(200) NULL, \`instances_website\` varchar(200) NULL, \`instances_weekStartDates\` text NULL, \`instances_logo\` int NULL, \`instances_emailHeader\` int NULL COMMENT 'A 1200x600 image to be the header on their emails', \`instances_termsAndPayment\` text NULL, \`instances_quoteTerms\` text NULL, \`instances_storageLimit\` bigint NOT NULL COMMENT 'In bytes - 500mb is default' DEFAULT '524288000', \`instances_config_linkedDefaultDiscount\` double(22,2) NULL DEFAULT '100', \`instances_config_currency\` varchar(200) NOT NULL DEFAULT 'GBP', \`instances_cableColours\` text NULL, \`instances_publicConfig\` text NULL, PRIMARY KEY (\`instances_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assetcategoriesgroups\` (\`assetCategoriesGroups_id\` int NOT NULL AUTO_INCREMENT, \`assetCategoriesGroups_name\` varchar(200) NOT NULL, \`assetCategoriesGroups_fontAwesome\` varchar(300) NULL, \`assetCategoriesGroups_order\` int NOT NULL DEFAULT '999', PRIMARY KEY (\`assetCategoriesGroups_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assetcategories\` (\`assetCategories_id\` int NOT NULL AUTO_INCREMENT, \`assetCategories_name\` varchar(200) NOT NULL, \`assetCategories_fontAwesome\` varchar(100) NULL, \`assetCategories_rank\` int NOT NULL DEFAULT '999', \`assetCategoriesGroups_id\` int NOT NULL, \`instances_id\` int NULL, \`assetCategories_deleted\` tinyint(1) NOT NULL DEFAULT '0', INDEX \`assetCategories_Groups_id_fk\` (\`assetCategoriesGroups_id\`), INDEX \`assetCategories_instances_instances_id_fk\` (\`instances_id\`), PRIMARY KEY (\`assetCategories_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assettypes\` (\`assetTypes_id\` int NOT NULL AUTO_INCREMENT, \`assetTypes_name\` varchar(500) NOT NULL, \`assetCategories_id\` int NOT NULL, \`manufacturers_id\` int NOT NULL, \`instances_id\` int NULL, \`assetTypes_description\` varchar(1000) NULL, \`assetTypes_productLink\` varchar(500) NULL, \`assetTypes_definableFields\` varchar(500) NULL, \`assetTypes_mass\` decimal(55,5) NULL, \`assetTypes_inserted\` timestamp NULL, \`assetTypes_dayRate\` int NOT NULL, \`assetTypes_weekRate\` int NOT NULL, \`assetTypes_value\` int NOT NULL, INDEX \`assetTypes_instances_instances_id_fk\` (\`instances_id\`), INDEX \`assetTypes_manufacturers_manufacturers_id_fk\` (\`manufacturers_id\`), INDEX \`assetTypes_assetCategories_assetCategories_id_fk\` (\`assetCategories_id\`), PRIMARY KEY (\`assetTypes_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`actions\` (\`actions_id\` int NOT NULL AUTO_INCREMENT, \`actions_name\` varchar(255) NOT NULL, \`actionsCategories_id\` int NOT NULL, \`actions_dependent\` varchar(500) NULL, \`actions_incompatible\` varchar(500) NULL, PRIMARY KEY (\`actions_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`actionscategories\` (\`actionsCategories_id\` int NOT NULL AUTO_INCREMENT, \`actionsCategories_name\` varchar(500) NOT NULL, \`actionsCategories_order\` int NULL DEFAULT '0', PRIMARY KEY (\`actionsCategories_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`positionsgroups\` (\`positionsGroups_id\` int NOT NULL AUTO_INCREMENT, \`positionsGroups_name\` varchar(255) NOT NULL, \`positionsGroups_actions\` varchar(1000) NULL, PRIMARY KEY (\`positionsGroups_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loginattempts\` (\`loginAttempts_id\` int NOT NULL AUTO_INCREMENT, \`loginAttempts_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`loginAttempts_textEntered\` varchar(500) NOT NULL, \`loginAttempts_ip\` varchar(500) NULL, \`loginAttempts_blocked\` tinyint(1) NOT NULL, \`loginAttempts_successful\` tinyint(1) NOT NULL, PRIMARY KEY (\`loginAttempts_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`instanceactions\` (\`instanceActions_id\` int NOT NULL AUTO_INCREMENT, \`instanceActions_name\` varchar(255) NOT NULL, \`instanceActionsCategories_id\` int NOT NULL, \`instanceActions_dependent\` varchar(200) NULL, \`instanceActions_incompatible\` varchar(200) NULL, INDEX \`categories_fk\` (\`instanceActionsCategories_id\`), PRIMARY KEY (\`instanceActions_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`instanceactionscategories\` (\`instanceActionsCategories_id\` int NOT NULL AUTO_INCREMENT, \`instanceActionsCategories_name\` varchar(255) NOT NULL, \`instanceActionsCategories_order\` int NOT NULL DEFAULT '999', PRIMARY KEY (\`instanceActionsCategories_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodes\` ADD CONSTRAINT \`FK_9043b1a5f58022829540c498d4d\` FOREIGN KEY (\`assets_id\`) REFERENCES \`assets\`(\`assets_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodes\` ADD CONSTRAINT \`FK_b7e93fd64f163b73f786466d641\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`locationsbarcodes\` ADD CONSTRAINT \`FK_ce15e7fddc92cd2d6e656b8abcc\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` ADD CONSTRAINT \`FK_5b84bcd0579e6272feb568f3ada\` FOREIGN KEY (\`assetsBarcodes_id\`) REFERENCES \`assetsbarcodes\`(\`assetsBarcodes_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` ADD CONSTRAINT \`FK_fa1d32e16dee9c597f31082e98e\` FOREIGN KEY (\`location_assets_id\`) REFERENCES \`assets\`(\`assets_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` ADD CONSTRAINT \`FK_406a2ce54a3aa797320742b74df\` FOREIGN KEY (\`locationsBarcodes_id\`) REFERENCES \`locationsbarcodes\`(\`locationsBarcodes_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` ADD CONSTRAINT \`FK_1731713d7ef3a141721ff0befd6\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetgroups\` ADD CONSTRAINT \`FK_13a6c8a828d50ec3cca814d9a3a\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetgroups\` ADD CONSTRAINT \`FK_9d200cfb58165a6b43bfee22311\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesviews\` ADD CONSTRAINT \`FK_a2c187268296f616fb175894af9\` FOREIGN KEY (\`cmsPages_id\`) REFERENCES \`cmspages\`(\`cmsPages_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesviews\` ADD CONSTRAINT \`FK_db3f8215da4070838fb120b97ab\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspages\` ADD CONSTRAINT \`FK_f52f98619288459bc565dd3bd86\` FOREIGN KEY (\`cmsPages_subOf\`) REFERENCES \`cmspages\`(\`cmsPages_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspages\` ADD CONSTRAINT \`FK_eb82c0b70a00b0e01f801683b87\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesdrafts\` ADD CONSTRAINT \`FK_a269b981700ad457e29ad46029b\` FOREIGN KEY (\`cmsPages_id\`) REFERENCES \`cmspages\`(\`cmsPages_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesdrafts\` ADD CONSTRAINT \`FK_171df733ceb573c6e6fb8ab3b80\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobs\` ADD CONSTRAINT \`FK_9885a800422043427d332a2d2ee\` FOREIGN KEY (\`maintenanceJobs_user_creator\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobsmessages\` ADD CONSTRAINT \`FK_892fd6c7e980c4d4e24fcba0c8c\` FOREIGN KEY (\`maintenanceJobs_id\`) REFERENCES \`maintenancejobs\`(\`maintenanceJobs_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobsmessages\` ADD CONSTRAINT \`FK_1fa5d93a0bf5ce5b8bd2cf49a9b\` FOREIGN KEY (\`maintenanceJobsMessages_file\`) REFERENCES \`s3files\`(\`s3files_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodulescertifications\` ADD CONSTRAINT \`FK_bac22af8ae5e66dbccb0efbf1ce\` FOREIGN KEY (\`modules_id\`) REFERENCES \`modules\`(\`modules_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodulescertifications\` ADD CONSTRAINT \`FK_755e6862a246db4c65ea34eb013\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodulescertifications\` ADD CONSTRAINT \`FK_1590b4c9d49f58362b7e2a25ae8\` FOREIGN KEY (\`userModulesCertifications_approvedBy\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodules\` ADD CONSTRAINT \`FK_0c2a26d734a07ffbb8a8750ea16\` FOREIGN KEY (\`userModules_currentStep\`) REFERENCES \`modulessteps\`(\`modulesSteps_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodules\` ADD CONSTRAINT \`FK_837e113004b0ec89248ed46ffd8\` FOREIGN KEY (\`modules_id\`) REFERENCES \`modules\`(\`modules_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodules\` ADD CONSTRAINT \`FK_ff8555a34867dc10803b0e78925\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`modulessteps\` ADD CONSTRAINT \`FK_2ba59f253830fbc752b0782c0d6\` FOREIGN KEY (\`modules_id\`) REFERENCES \`modules\`(\`modules_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_13d8443e814042991c097494da6\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_bec31ff22a8bf366c9d4632f128\` FOREIGN KEY (\`modules_thumbnail\`) REFERENCES \`s3files\`(\`s3files_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_65b78472d885e4b3058ed609f5a\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`s3files\` ADD CONSTRAINT \`FK_2074b930657029ec778eabd3ee6\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`s3files\` ADD CONSTRAINT \`FK_6568cd2473526e64049828d9e21\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`signupcodes\` ADD CONSTRAINT \`FK_7a817c40fc195a5c09f2768cf55\` FOREIGN KEY (\`instancePositions_id\`) REFERENCES \`instancepositions\`(\`instancePositions_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`signupcodes\` ADD CONSTRAINT \`FK_e9e30ad44801d07d1b30992da4f\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`instancepositions\` ADD CONSTRAINT \`FK_119fc184cda797d631893055fcd\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`userinstances\` ADD CONSTRAINT \`FK_f7aab232052031d0dd00e1de5e6\` FOREIGN KEY (\`instancePositions_id\`) REFERENCES \`instancepositions\`(\`instancePositions_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`userinstances\` ADD CONSTRAINT \`FK_017a044684207fe3de6ca3683c4\` FOREIGN KEY (\`signupCodes_id\`) REFERENCES \`signupcodes\`(\`signupCodes_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`userinstances\` ADD CONSTRAINT \`FK_8bb77b20876bc02c1dc2e65a5f9\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`crewassignments\` ADD CONSTRAINT \`FK_f261d1354906d9f2c1bfa0ba36a\` FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`crewassignments\` ADD CONSTRAINT \`FK_eb33c3e8452c6693d8fde4a1818\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsvacantroles\` ADD CONSTRAINT \`FK_77a0bd2c28f03afa5fecbab7cd7\` FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsvacantrolesapplications\` ADD CONSTRAINT \`FK_cd02f96109092240db998a6742c\` FOREIGN KEY (\`projectsVacantRoles_id\`) REFERENCES \`projectsvacantroles\`(\`projectsVacantRoles_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsvacantrolesapplications\` ADD CONSTRAINT \`FK_e266f153ec46d1d8e9edb96ac5c\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsnotes\` ADD CONSTRAINT \`FK_4f095268ebc553b8a14bb780264\` FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsnotes\` ADD CONSTRAINT \`FK_38510519ca8ead729e2cd797e85\` FOREIGN KEY (\`projectsNotes_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auditlog\` ADD CONSTRAINT \`FK_2846357efc67cda24d6f2b4f77f\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auditlog\` ADD CONSTRAINT \`FK_ee9279118ea131e9257c1176bb7\` FOREIGN KEY (\`auditLog_actionUserid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`emailsent\` ADD CONSTRAINT \`FK_eb0274a04b43e3aa7a3ace74651\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`userpositions\` ADD CONSTRAINT \`FK_26ad42f379c80fac16882da3090\` FOREIGN KEY (\`positions_id\`) REFERENCES \`positions\`(\`positions_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`userpositions\` ADD CONSTRAINT \`FK_3e3e31b88f0f7c24d522b6a9e9d\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`authtokens\` ADD CONSTRAINT \`FK_df99057055252907f2d986e592d\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`authtokens\` ADD CONSTRAINT \`FK_34fbb58cd85a7a2b84856d053d2\` FOREIGN KEY (\`authTokens_adminId\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`emailverificationcodes\` ADD CONSTRAINT \`FK_8880190e74012763cfd986d460d\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`passwordresetcodes\` ADD CONSTRAINT \`FK_e0b9f6dca610263b31df95ae90a\` FOREIGN KEY (\`users_userid\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` ADD CONSTRAINT \`FK_9014c51fc6691ed2169e5a76a16\` FOREIGN KEY (\`clients_id\`) REFERENCES \`clients\`(\`clients_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` ADD CONSTRAINT \`FK_5fc7eef45a8f6d305056a551620\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` ADD CONSTRAINT \`FK_9da872434df691acabf4ad7a4bf\` FOREIGN KEY (\`locations_subOf\`) REFERENCES \`locations\`(\`locations_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_75b5c77e241fc91b3ba36e191ae\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_4c8bc8b37b2b7f3471bc5b1b64c\` FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsfinancecache\` ADD CONSTRAINT \`FK_da7e9cf1f96e886d2e3f58407d4\` FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_03e9912198ab9c802c9d07b6019\` FOREIGN KEY (\`clients_id\`) REFERENCES \`clients\`(\`clients_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_e946f4f047b418b8ee61536c472\` FOREIGN KEY (\`projects_parent_project_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_e27408d539c5171c0637ed87ef5\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_25f3511bec2394975a58c41c0f6\` FOREIGN KEY (\`locations_id\`) REFERENCES \`locations\`(\`locations_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_b5c44b1a66a8e45e2c84170205f\` FOREIGN KEY (\`projects_manager\`) REFERENCES \`users\`(\`users_userid\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignments\` ADD CONSTRAINT \`FK_7ebcefc1547b77e7b421289a35c\` FOREIGN KEY (\`assetsAssignments_linkedTo\`) REFERENCES \`assetsassignments\`(\`assetsAssignments_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignments\` ADD CONSTRAINT \`FK_d8f61409593e10b287d66bdc3a4\` FOREIGN KEY (\`assets_id\`) REFERENCES \`assets\`(\`assets_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignments\` ADD CONSTRAINT \`FK_7c5f4abd6e0811b9b6374b45cb2\` FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`projects_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` ADD CONSTRAINT \`FK_ea34019e886c088a621ab68777d\` FOREIGN KEY (\`assets_linkedTo\`) REFERENCES \`assets\`(\`assets_id\`) ON DELETE SET NULL ON UPDATE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` ADD CONSTRAINT \`FK_a78b6b0b56bb1af4cd049900dde\` FOREIGN KEY (\`assetTypes_id\`) REFERENCES \`assettypes\`(\`assetTypes_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` ADD CONSTRAINT \`FK_f627850ca44be8bdbbaeaef6826\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` ADD CONSTRAINT \`FK_db6a0d92daef1d71217b78541bf\` FOREIGN KEY (\`assets_storageLocation\`) REFERENCES \`locations\`(\`locations_id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignmentsstatus\` ADD CONSTRAINT \`FK_2ef1db44973057d34f9ec05d67b\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`manufacturers\` ADD CONSTRAINT \`FK_6b72e345026dc4c534c13f9e8c8\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobsstatuses\` ADD CONSTRAINT \`FK_3a6e0f114154505cc234bdcb049\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectstypes\` ADD CONSTRAINT \`FK_26cebcd3b92ee25bd84373960dc\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetcategories\` ADD CONSTRAINT \`FK_496c1c0ae97ab23d5c391441a84\` FOREIGN KEY (\`assetCategoriesGroups_id\`) REFERENCES \`assetcategoriesgroups\`(\`assetCategoriesGroups_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetcategories\` ADD CONSTRAINT \`FK_b6cfa73483ae8ad1cf5f0b92444\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assettypes\` ADD CONSTRAINT \`FK_10336ed2e1fdbf5bdf32dcbd05a\` FOREIGN KEY (\`assetCategories_id\`) REFERENCES \`assetcategories\`(\`assetCategories_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assettypes\` ADD CONSTRAINT \`FK_41c037ccf43b0bed7f829c57fb9\` FOREIGN KEY (\`instances_id\`) REFERENCES \`instances\`(\`instances_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assettypes\` ADD CONSTRAINT \`FK_d98d5c93129c28ae16e00e3cfc1\` FOREIGN KEY (\`manufacturers_id\`) REFERENCES \`manufacturers\`(\`manufacturers_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`actions\` ADD CONSTRAINT \`FK_396ef92e4be95a629046e81c864\` FOREIGN KEY (\`actionsCategories_id\`) REFERENCES \`actionscategories\`(\`actionsCategories_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`instanceactions\` ADD CONSTRAINT \`FK_19ef14b3f83d018a80c556e610d\` FOREIGN KEY (\`instanceActionsCategories_id\`) REFERENCES \`instanceactionscategories\`(\`instanceActionsCategories_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`instanceactions\` DROP FOREIGN KEY \`FK_19ef14b3f83d018a80c556e610d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`actions\` DROP FOREIGN KEY \`FK_396ef92e4be95a629046e81c864\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assettypes\` DROP FOREIGN KEY \`FK_d98d5c93129c28ae16e00e3cfc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assettypes\` DROP FOREIGN KEY \`FK_41c037ccf43b0bed7f829c57fb9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assettypes\` DROP FOREIGN KEY \`FK_10336ed2e1fdbf5bdf32dcbd05a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetcategories\` DROP FOREIGN KEY \`FK_b6cfa73483ae8ad1cf5f0b92444\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetcategories\` DROP FOREIGN KEY \`FK_496c1c0ae97ab23d5c391441a84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectstypes\` DROP FOREIGN KEY \`FK_26cebcd3b92ee25bd84373960dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobsstatuses\` DROP FOREIGN KEY \`FK_3a6e0f114154505cc234bdcb049\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`manufacturers\` DROP FOREIGN KEY \`FK_6b72e345026dc4c534c13f9e8c8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignmentsstatus\` DROP FOREIGN KEY \`FK_2ef1db44973057d34f9ec05d67b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` DROP FOREIGN KEY \`FK_db6a0d92daef1d71217b78541bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` DROP FOREIGN KEY \`FK_f627850ca44be8bdbbaeaef6826\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` DROP FOREIGN KEY \`FK_a78b6b0b56bb1af4cd049900dde\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` DROP FOREIGN KEY \`FK_ea34019e886c088a621ab68777d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignments\` DROP FOREIGN KEY \`FK_7c5f4abd6e0811b9b6374b45cb2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignments\` DROP FOREIGN KEY \`FK_d8f61409593e10b287d66bdc3a4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsassignments\` DROP FOREIGN KEY \`FK_7ebcefc1547b77e7b421289a35c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_b5c44b1a66a8e45e2c84170205f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_25f3511bec2394975a58c41c0f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_e27408d539c5171c0637ed87ef5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_e946f4f047b418b8ee61536c472\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_03e9912198ab9c802c9d07b6019\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsfinancecache\` DROP FOREIGN KEY \`FK_da7e9cf1f96e886d2e3f58407d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_4c8bc8b37b2b7f3471bc5b1b64c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_75b5c77e241fc91b3ba36e191ae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_9da872434df691acabf4ad7a4bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_5fc7eef45a8f6d305056a551620\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_9014c51fc6691ed2169e5a76a16\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`passwordresetcodes\` DROP FOREIGN KEY \`FK_e0b9f6dca610263b31df95ae90a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`emailverificationcodes\` DROP FOREIGN KEY \`FK_8880190e74012763cfd986d460d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`authtokens\` DROP FOREIGN KEY \`FK_34fbb58cd85a7a2b84856d053d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`authtokens\` DROP FOREIGN KEY \`FK_df99057055252907f2d986e592d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userpositions\` DROP FOREIGN KEY \`FK_3e3e31b88f0f7c24d522b6a9e9d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userpositions\` DROP FOREIGN KEY \`FK_26ad42f379c80fac16882da3090\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`emailsent\` DROP FOREIGN KEY \`FK_eb0274a04b43e3aa7a3ace74651\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auditlog\` DROP FOREIGN KEY \`FK_ee9279118ea131e9257c1176bb7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auditlog\` DROP FOREIGN KEY \`FK_2846357efc67cda24d6f2b4f77f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsnotes\` DROP FOREIGN KEY \`FK_38510519ca8ead729e2cd797e85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsnotes\` DROP FOREIGN KEY \`FK_4f095268ebc553b8a14bb780264\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsvacantrolesapplications\` DROP FOREIGN KEY \`FK_e266f153ec46d1d8e9edb96ac5c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsvacantrolesapplications\` DROP FOREIGN KEY \`FK_cd02f96109092240db998a6742c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projectsvacantroles\` DROP FOREIGN KEY \`FK_77a0bd2c28f03afa5fecbab7cd7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`crewassignments\` DROP FOREIGN KEY \`FK_eb33c3e8452c6693d8fde4a1818\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`crewassignments\` DROP FOREIGN KEY \`FK_f261d1354906d9f2c1bfa0ba36a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userinstances\` DROP FOREIGN KEY \`FK_8bb77b20876bc02c1dc2e65a5f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userinstances\` DROP FOREIGN KEY \`FK_017a044684207fe3de6ca3683c4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userinstances\` DROP FOREIGN KEY \`FK_f7aab232052031d0dd00e1de5e6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`instancepositions\` DROP FOREIGN KEY \`FK_119fc184cda797d631893055fcd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`signupcodes\` DROP FOREIGN KEY \`FK_e9e30ad44801d07d1b30992da4f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`signupcodes\` DROP FOREIGN KEY \`FK_7a817c40fc195a5c09f2768cf55\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`s3files\` DROP FOREIGN KEY \`FK_6568cd2473526e64049828d9e21\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`s3files\` DROP FOREIGN KEY \`FK_2074b930657029ec778eabd3ee6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_65b78472d885e4b3058ed609f5a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_bec31ff22a8bf366c9d4632f128\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_13d8443e814042991c097494da6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`modulessteps\` DROP FOREIGN KEY \`FK_2ba59f253830fbc752b0782c0d6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodules\` DROP FOREIGN KEY \`FK_ff8555a34867dc10803b0e78925\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodules\` DROP FOREIGN KEY \`FK_837e113004b0ec89248ed46ffd8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodules\` DROP FOREIGN KEY \`FK_0c2a26d734a07ffbb8a8750ea16\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodulescertifications\` DROP FOREIGN KEY \`FK_1590b4c9d49f58362b7e2a25ae8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodulescertifications\` DROP FOREIGN KEY \`FK_755e6862a246db4c65ea34eb013\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usermodulescertifications\` DROP FOREIGN KEY \`FK_bac22af8ae5e66dbccb0efbf1ce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobsmessages\` DROP FOREIGN KEY \`FK_1fa5d93a0bf5ce5b8bd2cf49a9b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobsmessages\` DROP FOREIGN KEY \`FK_892fd6c7e980c4d4e24fcba0c8c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maintenancejobs\` DROP FOREIGN KEY \`FK_9885a800422043427d332a2d2ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesdrafts\` DROP FOREIGN KEY \`FK_171df733ceb573c6e6fb8ab3b80\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesdrafts\` DROP FOREIGN KEY \`FK_a269b981700ad457e29ad46029b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspages\` DROP FOREIGN KEY \`FK_eb82c0b70a00b0e01f801683b87\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspages\` DROP FOREIGN KEY \`FK_f52f98619288459bc565dd3bd86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesviews\` DROP FOREIGN KEY \`FK_db3f8215da4070838fb120b97ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cmspagesviews\` DROP FOREIGN KEY \`FK_a2c187268296f616fb175894af9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetgroups\` DROP FOREIGN KEY \`FK_9d200cfb58165a6b43bfee22311\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetgroups\` DROP FOREIGN KEY \`FK_13a6c8a828d50ec3cca814d9a3a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` DROP FOREIGN KEY \`FK_1731713d7ef3a141721ff0befd6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` DROP FOREIGN KEY \`FK_406a2ce54a3aa797320742b74df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` DROP FOREIGN KEY \`FK_fa1d32e16dee9c597f31082e98e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodesscans\` DROP FOREIGN KEY \`FK_5b84bcd0579e6272feb568f3ada\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`locationsbarcodes\` DROP FOREIGN KEY \`FK_ce15e7fddc92cd2d6e656b8abcc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodes\` DROP FOREIGN KEY \`FK_b7e93fd64f163b73f786466d641\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assetsbarcodes\` DROP FOREIGN KEY \`FK_9043b1a5f58022829540c498d4d\``,
    );
    await queryRunner.query(`DROP TABLE \`instanceactionscategories\``);
    await queryRunner.query(
      `DROP INDEX \`categories_fk\` ON \`instanceactions\``,
    );
    await queryRunner.query(`DROP TABLE \`instanceactions\``);
    await queryRunner.query(`DROP TABLE \`loginattempts\``);
    await queryRunner.query(`DROP TABLE \`positionsgroups\``);
    await queryRunner.query(`DROP TABLE \`actionscategories\``);
    await queryRunner.query(`DROP TABLE \`actions\``);
    await queryRunner.query(
      `DROP INDEX \`assetTypes_assetCategories_assetCategories_id_fk\` ON \`assettypes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetTypes_manufacturers_manufacturers_id_fk\` ON \`assettypes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetTypes_instances_instances_id_fk\` ON \`assettypes\``,
    );
    await queryRunner.query(`DROP TABLE \`assettypes\``);
    await queryRunner.query(
      `DROP INDEX \`assetCategories_instances_instances_id_fk\` ON \`assetcategories\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetCategories_Groups_id_fk\` ON \`assetcategories\``,
    );
    await queryRunner.query(`DROP TABLE \`assetcategories\``);
    await queryRunner.query(`DROP TABLE \`assetcategoriesgroups\``);
    await queryRunner.query(`DROP TABLE \`instances\``);
    await queryRunner.query(
      `DROP INDEX \`projectsTypes_instances_instances_id_fk\` ON \`projectstypes\``,
    );
    await queryRunner.query(`DROP TABLE \`projectstypes\``);
    await queryRunner.query(
      `DROP INDEX \`maintenanceJobsStatuses_instances_instances_id_fk\` ON \`maintenancejobsstatuses\``,
    );
    await queryRunner.query(`DROP TABLE \`maintenancejobsstatuses\``);
    await queryRunner.query(
      `DROP INDEX \`manufacturers_instances_instances_id_fk\` ON \`manufacturers\``,
    );
    await queryRunner.query(`DROP TABLE \`manufacturers\``);
    await queryRunner.query(
      `DROP INDEX \`assetsAssignmentsStatus_instances_instances_id_fk\` ON \`assetsassignmentsstatus\``,
    );
    await queryRunner.query(`DROP TABLE \`assetsassignmentsstatus\``);
    await queryRunner.query(
      `DROP INDEX \`assets_assetTypes_assetTypes_id_fk\` ON \`assets\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assets_assets_assets_id_fk\` ON \`assets\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assets_instances_instances_id_fk\` ON \`assets\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assets_locations_locations_id_fk\` ON \`assets\``,
    );
    await queryRunner.query(`DROP TABLE \`assets\``);
    await queryRunner.query(
      `DROP INDEX \`assetsAssignments_assets_assets_id_fk\` ON \`assetsassignments\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetsAssignments_projects_projects_id_fk\` ON \`assetsassignments\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetsAssignments_assetsAssignments_assetsAssignments_id_fk\` ON \`assetsassignments\``,
    );
    await queryRunner.query(`DROP TABLE \`assetsassignments\``);
    await queryRunner.query(
      `DROP INDEX \`projects_clients_clients_id_fk\` ON \`projects\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projects_instances_instances_id_fk\` ON \`projects\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projects_users_users_userid_fk\` ON \`projects\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projects_locations_locations_id_fk\` ON \`projects\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projects_projectsTypes_projectsTypes_id_fk\` ON \`projects\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projects_parent_project_id\` ON \`projects\``,
    );
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(
      `DROP INDEX \`projectsFinanceCache_projects_projects_id_fk\` ON \`projectsfinancecache\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projectFinnaceCacheTimestamp\` ON \`projectsfinancecache\``,
    );
    await queryRunner.query(`DROP TABLE \`projectsfinancecache\``);
    await queryRunner.query(
      `DROP INDEX \`payments_projects_projects_id_fk\` ON \`payments\``,
    );
    await queryRunner.query(`DROP TABLE \`payments\``);
    await queryRunner.query(
      `DROP INDEX \`clients_instances_instances_id_fk\` ON \`clients\``,
    );
    await queryRunner.query(`DROP TABLE \`clients\``);
    await queryRunner.query(
      `DROP INDEX \`locations_clients_clients_id_fk\` ON \`locations\``,
    );
    await queryRunner.query(
      `DROP INDEX \`locations_instances_instances_id_fk\` ON \`locations\``,
    );
    await queryRunner.query(
      `DROP INDEX \`locations_locations_locations_id_fk\` ON \`locations\``,
    );
    await queryRunner.query(`DROP TABLE \`locations\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe62a84d8ea7e438d0f322c081\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5c2a8447cd2808ef912e92fe0b\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`users_users_email_uindex\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`users_users_username_uindex\` ON \`users\``,
    );
    await queryRunner.query(`DROP INDEX \`username_2\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`passwordResetCodes_users_users_userid_fk\` ON \`passwordresetcodes\``,
    );
    await queryRunner.query(`DROP TABLE \`passwordresetcodes\``);
    await queryRunner.query(
      `DROP INDEX \`emailVerificationCodes_users_users_userid_fk\` ON \`emailverificationcodes\``,
    );
    await queryRunner.query(`DROP TABLE \`emailverificationcodes\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b9676e71e06d55eb2d7cd42e89\` ON \`authtokens\``,
    );
    await queryRunner.query(`DROP INDEX \`token\` ON \`authtokens\``);
    await queryRunner.query(
      `DROP INDEX \`authTokens_users_users_userid_fk\` ON \`authtokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`authTokens_users_users_userid_fk_2\` ON \`authtokens\``,
    );
    await queryRunner.query(`DROP TABLE \`authtokens\``);
    await queryRunner.query(
      `DROP INDEX \`userPositions_positions_positions_id_fk\` ON \`userpositions\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userPositions_users_users_userid_fk\` ON \`userpositions\``,
    );
    await queryRunner.query(`DROP TABLE \`userpositions\``);
    await queryRunner.query(`DROP TABLE \`positions\``);
    await queryRunner.query(
      `DROP INDEX \`emailSent_users_users_userid_fk\` ON \`emailsent\``,
    );
    await queryRunner.query(`DROP TABLE \`emailsent\``);
    await queryRunner.query(
      `DROP INDEX \`auditLog_users_users_userid_fk\` ON \`auditlog\``,
    );
    await queryRunner.query(
      `DROP INDEX \`auditLog_users_users_userid_fk_2\` ON \`auditlog\``,
    );
    await queryRunner.query(`DROP TABLE \`auditlog\``);
    await queryRunner.query(
      `DROP INDEX \`projectsNotes_projects_projects_id_fk\` ON \`projectsnotes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projectsNotes_users_users_userid_fk\` ON \`projectsnotes\``,
    );
    await queryRunner.query(`DROP TABLE \`projectsnotes\``);
    await queryRunner.query(
      `DROP INDEX \`projectsVacantRolesApplications_projectsVacantRolesid_fk\` ON \`projectsvacantrolesapplications\``,
    );
    await queryRunner.query(
      `DROP INDEX \`projectsVacantRolesApplications_users_users_userid_fk\` ON \`projectsvacantrolesapplications\``,
    );
    await queryRunner.query(`DROP TABLE \`projectsvacantrolesapplications\``);
    await queryRunner.query(
      `DROP INDEX \`projectsVacantRoles_projects_projects_id_fk\` ON \`projectsvacantroles\``,
    );
    await queryRunner.query(`DROP TABLE \`projectsvacantroles\``);
    await queryRunner.query(
      `DROP INDEX \`crewAssignments_projects_projects_id_fk\` ON \`crewassignments\``,
    );
    await queryRunner.query(
      `DROP INDEX \`crewAssignments_users_users_userid_fk\` ON \`crewassignments\``,
    );
    await queryRunner.query(`DROP TABLE \`crewassignments\``);
    await queryRunner.query(
      `DROP INDEX \`userInstances_instancePositions_instancePositions_id_fk\` ON \`userinstances\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userInstances_users_users_userid_fk\` ON \`userinstances\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userInstances_signupCodes_signupCodes_id_fk\` ON \`userinstances\``,
    );
    await queryRunner.query(`DROP TABLE \`userinstances\``);
    await queryRunner.query(
      `DROP INDEX \`instancePositions_instances_instances_id_fk\` ON \`instancepositions\``,
    );
    await queryRunner.query(`DROP TABLE \`instancepositions\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e2ebde7ffc7bddb5f54dea6870\` ON \`signupcodes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`signupCodes_signupCodes_name_uindex\` ON \`signupcodes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`signupCodes_instances_instances_id_fk\` ON \`signupcodes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`signupCodes_instancePositions_instancePositions_id_fk\` ON \`signupcodes\``,
    );
    await queryRunner.query(`DROP TABLE \`signupcodes\``);
    await queryRunner.query(
      `DROP INDEX \`s3files_instances_instances_id_fk\` ON \`s3files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`s3files_users_users_userid_fk\` ON \`s3files\``,
    );
    await queryRunner.query(`DROP TABLE \`s3files\``);
    await queryRunner.query(
      `DROP INDEX \`modules_instances_instances_id_fk\` ON \`modules\``,
    );
    await queryRunner.query(
      `DROP INDEX \`modules_users_users_userid_fk\` ON \`modules\``,
    );
    await queryRunner.query(
      `DROP INDEX \`modules_s3files_s3files_id_fk\` ON \`modules\``,
    );
    await queryRunner.query(`DROP TABLE \`modules\``);
    await queryRunner.query(
      `DROP INDEX \`modulesSteps_modules_modules_id_fk\` ON \`modulessteps\``,
    );
    await queryRunner.query(`DROP TABLE \`modulessteps\``);
    await queryRunner.query(
      `DROP INDEX \`userModules_modules_modules_id_fk\` ON \`usermodules\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userModules_users_users_userid_fk\` ON \`usermodules\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userModules_modulesSteps_modulesSteps_id_fk\` ON \`usermodules\``,
    );
    await queryRunner.query(`DROP TABLE \`usermodules\``);
    await queryRunner.query(
      `DROP INDEX \`userModulesCertifications_users_users_userid_fk\` ON \`usermodulescertifications\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userModulesCertifications_users_users_userid_fk_2\` ON \`usermodulescertifications\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userModulesCertifications_modules_modules_id_fk\` ON \`usermodulescertifications\``,
    );
    await queryRunner.query(`DROP TABLE \`usermodulescertifications\``);
    await queryRunner.query(
      `DROP INDEX \`maintenanceJobsMessages___files\` ON \`maintenancejobsmessages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`maintenanceJobsMessages_maintenanceJobs_maintenanceJobs_id_fk\` ON \`maintenancejobsmessages\``,
    );
    await queryRunner.query(`DROP TABLE \`maintenancejobsmessages\``);
    await queryRunner.query(
      `DROP INDEX \`maintenanceJobs_users_users_userid_fk\` ON \`maintenancejobs\``,
    );
    await queryRunner.query(`DROP TABLE \`maintenancejobs\``);
    await queryRunner.query(
      `DROP INDEX \`cmsPagesDrafts_cmsPages_cmsPages_id_fk\` ON \`cmspagesdrafts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cmsPagesDrafts_users_users_userid_fk\` ON \`cmspagesdrafts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cmsPagesDrafts_cmsPagesDrafts_timestamp_index\` ON \`cmspagesdrafts\``,
    );
    await queryRunner.query(`DROP TABLE \`cmspagesdrafts\``);
    await queryRunner.query(
      `DROP INDEX \`cmsPages_instances_instances_id_fk\` ON \`cmspages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cmsPages_cmsPages_cmsPages_id_fk\` ON \`cmspages\``,
    );
    await queryRunner.query(`DROP TABLE \`cmspages\``);
    await queryRunner.query(
      `DROP INDEX \`cmsPagesViews_cmsPages_cmsPages_id_fk\` ON \`cmspagesviews\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cmsPagesViews_users_users_userid_fk\` ON \`cmspagesviews\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cmsPagesViews_cmsPagesViews_timestamp_index\` ON \`cmspagesviews\``,
    );
    await queryRunner.query(`DROP TABLE \`cmspagesviews\``);
    await queryRunner.query(
      `DROP INDEX \`assetGroups_instances_instances_id_fk\` ON \`assetgroups\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetGroups_users_users_userid_fk\` ON \`assetgroups\``,
    );
    await queryRunner.query(`DROP TABLE \`assetgroups\``);
    await queryRunner.query(
      `DROP INDEX \`assetsBarcodesScans_assetsBarcodes_assetsBarcodes_id_fk\` ON \`assetsbarcodesscans\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetsBarcodesScans_users_users_userid_fk\` ON \`assetsbarcodesscans\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetsBarcodesScans_locationsBarcodes_locationsBarcodes_id_fk\` ON \`assetsbarcodesscans\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetsBarcodesScans_assets_assets_id_fk\` ON \`assetsbarcodesscans\``,
    );
    await queryRunner.query(`DROP TABLE \`assetsbarcodesscans\``);
    await queryRunner.query(
      `DROP INDEX \`locationsBarcodes_users_users_userid_fk\` ON \`locationsbarcodes\``,
    );
    await queryRunner.query(`DROP TABLE \`locationsbarcodes\``);
    await queryRunner.query(
      `DROP INDEX \`assetsBarcodes_assets_assets_id_fk\` ON \`assetsbarcodes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`assetsBarcodes_users_users_userid_fk\` ON \`assetsbarcodes\``,
    );
    await queryRunner.query(`DROP TABLE \`assetsbarcodes\``);
  }
}
