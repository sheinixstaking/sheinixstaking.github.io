// Using JS class, will fail in IE
class MixedRealityButton extends BabylonViewer.AbstractViewerNavbarButton {
  constructor(viewer) {
    super();
    this.viewer = viewer;   
  }
}