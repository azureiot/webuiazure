// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';

import {
  Panel,
  PanelHeader,
  PanelContent,
  PanelOverlay
} from 'components/pages/dashboard/panel';
import { RulesGrid, rulesColumnDefs } from 'components/pages/rules/rulesGrid';
import { translateColumnDefs } from 'utilities';

export class AlarmsPanel extends Component {

  constructor(props) {
    super(props);

    this.columnDefs = [
      rulesColumnDefs.ruleName,
      rulesColumnDefs.severity,
      {
        headerName: 'Open',
        field: 'count'
      }
    ];
  }

  componentDidMount() {
    if (!this.props.rulesLastUpdated) this.props.fetchRules();
    this.props.fetchAlarms();
  }

  render() {
    const { t, alarms, isPending } = this.props;
    console.log('alarms', alarms);
    const gridProps = {
      columnDefs: translateColumnDefs(t, this.columnDefs),
      rowData: !isPending ? alarms : undefined,
      t
    };
    return (
      <Panel>
        <PanelHeader>System alarms</PanelHeader>
        <PanelContent>
          <RulesGrid {...gridProps} />
        </PanelContent>
      </Panel>
    );
  }
}
