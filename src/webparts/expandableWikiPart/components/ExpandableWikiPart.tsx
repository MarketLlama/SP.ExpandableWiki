import * as React from 'react';
import styles from './ExpandableWikiPart.module.scss';
import posed from 'react-pose';
import { IExpandableWikiPartProps } from './IExpandableWikiPartProps';
import { IExpandableWikiPartState } from './IExpandableWikiPartState';
import { ActionButton } from 'office-ui-fabric-react';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { DisplayMode } from '@microsoft/sp-core-library';


export default class ExpandableWikiPart extends React.Component<IExpandableWikiPartProps, IExpandableWikiPartState> {
  private Content = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' }
  });

  /**
   *
   */
  constructor(props : IExpandableWikiPartProps) {
    super(props);
    this.state ={
      displayMode : false,
      isOpen : false
    };
    this._editModeFix();
    let numberOfLines : number;
    if(!props.numberOfLines){
      numberOfLines = 3;
    } else{
      numberOfLines = props.numberOfLines;
    }
    this.Content = posed.div({
      closed: { height: `${numberOfLines * 50}px` },
      open: { height: 'auto' }
    });
  }

  public render(): React.ReactElement<IExpandableWikiPartProps> {
    const isOpen = this.state.isOpen || (this.props.displayMode == DisplayMode.Edit);
    return (
      <div className={ styles.expandableWikiPart }>
        <div className={ styles.container }>
          <this.Content
            pose={isOpen== true ? 'open' : 'closed'}
            className={`${styles.textBox} ${(isOpen? styles.isOpen : null)}`}
          >
            <RichText value={this.props.text}
              isEditMode={(this.props.displayMode == DisplayMode.Edit)}
              onChange={(text)=>this._setText(text)}
            />
          </this.Content>
          <ActionButton
            text={isOpen == true? 'View less' : 'View more'}
            iconProps={isOpen == true? { iconName: 'ChevronUp' } : { iconName: 'ChevronDown' }}
            onClick={this._expandField}
            disabled={this.props.displayMode == DisplayMode.Edit}
          />
        </div>
      </div>
    );
  }
  private _expandField =() =>{
    this.setState({
      isOpen : !this.state.isOpen
    });
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
