import { DisplayMode } from "@microsoft/sp-core-library";

export interface IExpandableWikiPartProps {
  text : string;
  numberOfLines : number;
  displayMode : DisplayMode;
  fnUpdate: Function;
}
