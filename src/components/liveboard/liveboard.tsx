import { Action, EmbedEvent, HostEvent } from "@thoughtspot/visual-embed-sdk";
import {
  LiveboardEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch, Select, Typography } from "antd";
import React from "react";
import {
  actionsToDisable,
  actionsToHide,
  customActionNameForShowThisViz,
  disabledReason,
  filterName,
  filterValues,
  LiveboardId,
  visibleVizIds
} from "../../constants";
import { useEventLogger } from "../../utils/utils";
import "./liveboard.css";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export const Liveboard = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const [fullHeight, setFullHeight] = React.useState(false);
  const onToggleHideActions = (checked: boolean) => {
    if (checked) {
      setHiddenActions([]);
    } else {
      setHiddenActions(actionsToHide);
    }
  };

  const [disabledActions, setDisabledActions] = React.useState<Action[]>([]);
  const onToggleDisabledActions = (checked: boolean) => {
    if (checked) {
      setDisabledActions([]);
    } else {
      setDisabledActions(actionsToDisable);
    }
  };

  const [lbV2, setLbV2] = React.useState<boolean>(true);
  const onToggleLbV2 = (checked: boolean) => {
    if (checked) {
      setLbV2(true);
    } else {
      setLbV2(false);
    }
  };

  const applyFilter = (colName: string, value: string) => {
    console.log(colName, value);
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: colName.toLowerCase(),
        operator: "NE",
        values: [value]
      }
    ]);
  };

  const onDoubleClick = (event: any) => {
    console.log(event);
    const point = event.data.selectedPoints[0].selectedAttributes[0];
    const colName = point.column.name;
    const value = point.value;
    applyFilter(colName, value);
  };

  const onFilterSelect = (value: string) => {
    applyFilter(filterName, value);
  };

  const resetFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: filterName,
        operator: "EQ",
        values: []
      }
    ]);
  };

  const onCustomAction = (e) => {
    logEvent(e);
    if (e.id === customActionNameForShowThisViz) {
      embedRef.current.trigger(HostEvent.SetVisibleVizs, [
        "5c77eea9-e0f8-4b1a-9dc1-573f296129a8"
      ]);
      console.log(JSON.parse(e.data));
      console.log("selected current viz");
    }
  };
  const onToggleFullHeight = (checked: boolean) => {
    setFullHeight(checked);
  };

  const exploreViz = () => {
    embedRef.current.trigger(HostEvent.Explore, {
      vizId: "aa634926-d773-4b53-af84-418981befc74"
    });
  };

  const Schedule = () => {
    embedRef.current.trigger(HostEvent.Schedule, {});
    // points: clickedPointData,
    // autoDrillDown: true,
  };

  const downloadViz = () => {
    embedRef.current.trigger(HostEvent.DownloadAsPdf, {
      vizId: "aa634926-d773-4b53-af84-418981befc74"
    });
  };

  const downloadliveboard = () => {
    embedRef.current.trigger(HostEvent.DownloadAsPdf, {});
  };

  // searchEmbed.trigger(HostEvent.DrillDown, {
  //   points: clickedPointData,
  //   autoDrillDown: true
  // });

  const drillDown = () => {
    embedRef.current.trigger(HostEvent.DrillDown, {
      points: { selectedPoints: [EmbedEvent.VizPointDoubleClick] },
      autoDrillDown: true
    });
  };

  //.on(EmbedEvent.VizPointDoubleClick, (data) => {
  //   const { payload: clickedPointData } = data;
  //   console.log(">>> called", clickedPointData);
  //   embedRef.current.trigger(HostEvent.DrillDown, {
  //     points: clickedPointData,
  //     autoDrillDown: true
  //   });
  // });

  //   .on(EmbedEvent.VizPointDoubleClick, (data) => {
  //     const {
  //         payload: clickedPointData
  //     } = data;
  //     console.log('>>> called', clickedPointData);
  //     embed.trigger(HostEvent.DrillDown, {
  //         points: clickedPointData,
  //         autoDrillDown: true,
  //     });
  // })

  const edit = () => {
    embedRef.current.trigger(HostEvent.Edit, {
      vizId: "aa634926-d773-4b53-af84-418981befc74"
    });
  };

  const editTML = () => {
    embedRef.current.trigger(HostEvent.EditTML, {});
  };

  const exportTML = () => {
    embedRef.current.trigger(HostEvent.ExportTML, {});
  };

  const liveboardInfo = () => {
    embedRef.current.trigger(HostEvent.LiveboardInfo, {});
  };

  const makeACopy = () => {
    embedRef.current.trigger(HostEvent.MakeACopy, {});
  };

  const CreateMonitor = () => {
    embedRef.current.trigger(HostEvent.CreateMonitor, {
      vizId: "132aee3b-152b-4852-9fb3-775c97949acc"
    });
  };

  const ManageMonitor = () => {
    embedRef.current.trigger(HostEvent.ManageMonitor, {
      vizId: "132aee3b-152b-4852-9fb3-775c97949acc"
    });
  };

  const Pin = () => {
    embedRef.current.trigger(HostEvent.Pin, {
      vizId: "aa634926-d773-4b53-af84-418981befc74"
    });
  };

  const Present = () => {
    embedRef.current.trigger(HostEvent.Present, {
      vizId: "762cfe0f-6a5f-4381-b603-d3cd905de94a"
    });
  };

  const PresentLiveboard = () => {
    embedRef.current.trigger(HostEvent.Present, {});
  };

  const ScheduleList = () => {
    embedRef.current.trigger(HostEvent.SchedulesList, {});
  };

  const RuntimeFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: "Lo Shipmode",
        operator: "IN",
        values: ["ship", "air"]
      }
    ]);
  };

  const updateTML = () => {
    embedRef.current.trigger(HostEvent.UpdateTML, {});
  };

  const copyLink = () => {
    embedRef.current.trigger(HostEvent.CopyLink, {});
  };

  const copyVizLink = () => {
    embedRef.current.trigger(HostEvent.CopyLink, {
      vizId: "aa634926-d773-4b53-af84-418981befc74"
    });
  };

  const selectVizs = () => {
    embedRef.current.trigger(HostEvent.SetVisibleVizs, visibleVizIds);
  };
  const reload = () => {
    embedRef.current.trigger(HostEvent.Reload, {});
  };

  const navigate = () => {
    embedRef.current.trigger(HostEvent.Navigate, {
      path: "saved-answer/9abc40b3-b29e-41d9-9bc7-8d9ea8e9afd3",
      noReload: true
    });
  };

  const Remove = () => {
    embedRef.current.trigger(HostEvent.Remove, {});
  };

  return (
    <Layout>
      <Header>
        Liveboard Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200} collapsedWidth={0} collapsible>
          <div className="sider-content">
            <Typography.Text>Filter</Typography.Text>
            <Select
              style={{ width: 140 }}
              placeholder="Select filter"
              onChange={onFilterSelect}
            >
              {filterValues.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
            <Button onClick={resetFilter}>Reset filter</Button>
            <Button onClick={reload}>Reload</Button>
            <Button onClick={selectVizs}>Selected Vizs</Button>
            <Button onClick={exploreViz}>Explore</Button>
            <Button onClick={Schedule}>Schedule</Button>
            <Button onClick={navigate}>Navigate</Button>
            <Button onClick={edit}>Edit</Button>
            <Button onClick={editTML}>Edit TML</Button>
            <Button onClick={exportTML}>Export TML</Button>
            <Button onClick={liveboardInfo}>Show Liveboard Info</Button>
            <Button onClick={makeACopy}>Copy Liveboard</Button>
            <Button onClick={CreateMonitor}>CreateMonitor Alert</Button>
            <Button onClick={ManageMonitor}>ManageMonitor</Button>
            <Button onClick={Pin}>Pin a viz</Button>
            <Button onClick={Present}>Present</Button>
            <Button onClick={PresentLiveboard}>PresentLiveboard</Button>
            <Button onClick={ScheduleList}>Show Schedules List</Button>
            <Button onClick={RuntimeFilter}>RuntimeFilter</Button>
            <Button onClick={updateTML}>updateTML</Button>
            <Button onClick={copyLink}>Copy Liveboard Link</Button>
            <Button onClick={copyVizLink}>Copy Viz Link</Button>
            <Button onClick={downloadViz}>Download Viz</Button>
            <Button onClick={downloadliveboard}>Download as PDF</Button>
            <Button onClick={drillDown}>DrillDown</Button>
            <Button onClick={Remove}>Remove</Button>
            <Switch
              checkedChildren="Height is Adaptive"
              unCheckedChildren="Height is static"
              onChange={onToggleFullHeight}
            />
            <Switch
              checkedChildren="Actions shown"
              unCheckedChildren="Actions hidden"
              defaultChecked
              onChange={onToggleHideActions}
            />
            <Switch
              checkedChildren="Actions enabled"
              unCheckedChildren="Actions disabled"
              defaultChecked
              onChange={onToggleDisabledActions}
            />
            <Switch
              checkedChildren="LiveboardV2 enabled"
              unCheckedChildren="LiveboardV2 disabled"
              defaultChecked
              onChange={onToggleLbV2}
            />
          </div>
        </Sider>

        <Content style={{ overflow: "scroll", height: "1000px" }}>
          {/* ThoughtSpot liveboard Embed */}
          <LiveboardEmbed
            frameParams={{
              height: 2000
            }}
            className="liveboard-content"
            ref={embedRef}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason={disabledReason}
            fullHeight={fullHeight}
            liveboardId={LiveboardId}
            liveboardV2={lbV2}
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onLiveboardRendered={logEvent}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
            onVizPointDoubleClick={onDoubleClick}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
