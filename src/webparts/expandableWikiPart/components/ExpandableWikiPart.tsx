import * as React from 'react';
import styles from './ExpandableWikiPart.module.scss';
import { IExpandableWikiPartProps } from './IExpandableWikiPartProps';
import { IExpandableWikiPartState } from './IExpandableWikiPartState';
import { escape } from '@microsoft/sp-lodash-subset';
import { ActionButton } from 'office-ui-fabric-react';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { DisplayMode } from '@microsoft/sp-core-library';


export default class ExpandableWikiPart extends React.Component<IExpandableWikiPartProps, IExpandableWikiPartState> {
  /**
   *
   */
  constructor(props : IExpandableWikiPartProps) {
    super(props);
    this.state ={
      displayMode : false
    };
    this._editModeFix();
  }

  public render(): React.ReactElement<IExpandableWikiPartProps> {
    return (
      <div className={ styles.expandableWikiPart }>
        <div className={ styles.container }>
          <div>
          <RichText value={this.props.text}
            isEditMode={(this.props.displayMode == DisplayMode.Edit)}
            onChange={(text)=>this._setText(text)}
          />
          </div>
          <ActionButton
            text="Expand"
            iconProps={{ iconName: 'AddFriend' }}
            onClick={this._expandField}
          />
        </div>
      </div>
    );
  }
  private _expandField =() =>{
    console.log('done');
  }

  private _setText = (text: string): string => {
    this.props.fnUpdate(text);
    return text;
  }

  //TO:DO : wait Until fix then remove...
  public componentDidUpdate(prevProps  : IExpandableWikiPartProps, prevState : IExpandableWikiPartState) {
    if(prevProps.displayMode!==this.props.displayMode){
      this._editModeFix();
    }
  }

  private _editModeFix = () =>{
    setTimeout(() =>{
      this.setState({
        displayMode : (this.props.displayMode == DisplayMode.Edit) ? true : false
      });
    },10);
  }
}
