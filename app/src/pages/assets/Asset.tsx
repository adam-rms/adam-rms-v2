import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import { useContext } from "react";
import { useParams } from "react-router";
import { AssetTypeContext } from "../../contexts/asset/AssetTypeContext";
import { s3url, fileExtensionToIcon, formatSize } from "../../utilities/Files";
import Page from "../../components/Page";
import { faBan, faFlag } from "@fortawesome/free-solid-svg-icons";
import Refresher from "../../components/Refresher";

/**
 * Asset Page
 * Lists details for an individual asset
 */
const Asset = () => {
  const { type, asset } = useParams<{ type: string; asset: string }>();
  const { AssetTypes, refreshAssetTypes } = useContext(AssetTypeContext);

  function doRefresh(event: CustomEvent) {
    refreshAssetTypes();
    event.detail.complete();
  }

  //filter by requested asset type
  const thisAssetType = AssetTypes.assets.find(
    (element: IAssetTypeData) => element.assetTypes_id == parseInt(type),
  );

  //if we've got the asset, show data
  if (thisAssetType) {
    //filter by requested asset
    const thisAsset = thisAssetType.tags.find(
      (element: IAsset) => element.assets_id == parseInt(asset),
    );

    //return page layout
    return (
      <Page title={thisAsset.assets_tag_format}>
        <Refresher onRefresh={doRefresh} />

        {/* Maintenance */}
        {thisAsset.flagsblocks.BLOCK.map((block: any) => {
          return (
            <IonCard key={block.maintenanceJobs_id}>
              <IonCardContent>
                <IonCardTitle>
                  <FontAwesomeIcon icon={faBan} color="#dc3545" />{" "}
                  {block.maintenanceJobs_title}
                </IonCardTitle>
                <IonLabel className="container">
                  {block.maintenanceJobs_faultDescription}
                </IonLabel>
              </IonCardContent>
            </IonCard>
          );
        })}
        {thisAsset.flagsblocks.FLAG.map((block: any) => {
          return (
            <IonCard key={block.maintenanceJobs_id}>
              <IonCardContent>
                <IonCardTitle>
                  <FontAwesomeIcon icon={faFlag} color="#ffc107" />{" "}
                  {block.maintenanceJobs_title}
                </IonCardTitle>
                <IonLabel className="container">
                  {block.maintenanceJobs_faultDescription}
                </IonLabel>
              </IonCardContent>
            </IonCard>
          );
        })}

        {/* Asset Notes */}
        <IonCard>
          <IonCardContent>
            <IonCardTitle>{thisAsset.assets_notes}</IonCardTitle>
          </IonCardContent>
        </IonCard>

        {/* Asset Data */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Asset Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <div className="container">
                      <IonCardSubtitle>Mass</IonCardSubtitle>
                      <IonCardTitle>
                        {thisAsset.assets_mass_format}
                      </IonCardTitle>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="container">
                      <IonCardSubtitle>value</IonCardSubtitle>
                      <IonCardTitle>
                        {thisAsset.assets_value_format}
                      </IonCardTitle>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="container">
                      <IonCardSubtitle>Day Rate</IonCardSubtitle>
                      <IonCardTitle>
                        {thisAsset.assets_dayRate_format}
                      </IonCardTitle>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="container">
                      <IonCardSubtitle>Week Rate</IonCardSubtitle>
                      <IonCardTitle>
                        {thisAsset.assets_weekRate_format}
                      </IonCardTitle>
                    </div>
                  </IonItem>
                </IonCol>
                <IonCol>
                  {thisAssetType.fields.map((element: any, index: number) => {
                    if (
                      thisAssetType.fields[index - 1] !== "" &&
                      thisAsset["asset_definableFields_" + index] !== ""
                    ) {
                      return (
                        <IonItem key={index}>
                          <div className="container">
                            <IonCardSubtitle>
                              {thisAssetType.fields[index - 1]}
                            </IonCardSubtitle>
                            <IonCardTitle>
                              {thisAsset["asset_definableFields_" + index]}
                            </IonCardTitle>
                          </div>
                        </IonItem>
                      );
                    }
                  })}
                </IonCol>
              </IonRow>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Asset Files */}
        {thisAsset.files && thisAsset.files.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Asset Files</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {thisAsset.files.map(async (item: any) => {
                  return (
                    <a
                      href={
                        await s3url(item.s3files_id, item.s3files_meta_size)
                      }
                    >
                      <IonItem key={item.s3files_id}>
                        <IonLabel slot="start">
                          <FontAwesomeIcon
                            icon={fileExtensionToIcon(item.s3files_extension)}
                          />
                        </IonLabel>
                        <IonLabel>
                          <h2>{item.s3files_name}</h2>
                        </IonLabel>
                        <IonLabel slot="end">
                          {formatSize(item.s3files_meta_size)}
                        </IonLabel>
                      </IonItem>
                    </a>
                  );
                })}
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
      </Page>
    );
  } else {
    //If there isn't an asset, refresh context to see if that helps
    refreshAssetTypes();
    //If there is still no assets, it's probably a network issue
    //TODO: Handle network issues more gracefully

    return (
      <Page title="No Asset Found">
        <IonCardTitle>No Asset Found, Please Wait</IonCardTitle>
      </Page>
    );
  }
};

export default Asset;
