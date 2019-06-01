import * as React from 'react';
import styles from './ExpandableWikiPart.module.scss';
import { IExpandableWikiPartProps } from './IExpandableWikiPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ExpandableWikiPart extends React.Component<IExpandableWikiPartProps, {}> {
  public render(): React.ReactElement<IExpandableWikiPartProps> {
    return (
      <div className={ styles.expandableWikiPart }>
        <div className={ styles.container }>

        </div>
      </div>
    );
  }
}
