import { Route } from "react-router";

/* Components */
import Asset from "../pages/assets/Asset";
import AssetType from "../pages/assets/AssetType";
import AssetTypeList from "../pages/assets/AssetTypeList";
import Project from "../pages/projects/Project";
import ProjectAssets from "../pages/projects/ProjectAssets";
import ProjectList from "../pages/projects/ProjectList";
import CmsPageList from "../pages/cms/CmsPageList";
import CmsPage from "../pages/cms/CmsPage";

/**
 * Add all routes to this component
 * @returns <Routes />
 */
export function Routes() {
  return (
    <>
      {/* Assets */}
      <Route path="/assets/" component={AssetTypeList} exact />
      <Route path="/assets/:type" component={AssetType} exact />
      <Route path="/assets/:type/:asset" component={Asset} exact />

      {/* Projects */}
      <Route path="/projects/" component={ProjectList} exact />
      <Route path="/projects/:projectId" component={Project} exact />
      <Route path="/projects/:projectId/assets" component={ProjectAssets} exact />

      {/* CMS Pages */}
      <Route path="/cms/" component={CmsPageList} exact />
      <Route path="/cms/:pageId" component={CmsPage} exact />
    </>
  );
}
