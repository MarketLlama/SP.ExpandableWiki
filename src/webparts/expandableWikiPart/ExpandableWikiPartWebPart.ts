import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import * as strings from 'ExpandableWikiPartWebPartStrings';
import ExpandableWikiPart from './components/ExpandableWikiPart';
import { IExpandableWikiPartProps } from './components/IExpandableWikiPartProps';

export interface IExpandableWikiPartWebPartProps {
  text: string;
  numberOfLines : number;
}

export default class ExpandableWikiPartWebPart extends BaseClientSideWebPart<IExpandableWikiPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IExpandableWikiPartProps > = React.createElement(
      ExpandableWikiPart,
      {
        text: this.properties.text,
        displayMode : this.displayMode,
        numberOfLines : this.properties.numberOfLines,
        fnUpdate: (text) =>{
          this.properties.text = text;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'text': { isHtmlString: true }
    };
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldNumber("numberOfLines", {
                  key: "numberOfLines",
                  label: "Number of pre-expanded lines",
                  value: this.properties.numberOfLines,
                  maxValue: 10,
                  minValue: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
