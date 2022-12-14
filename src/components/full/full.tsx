import {
  Action,
  EmbedEvent,
  HostEvent,
  Page
} from "@thoughtspot/visual-embed-sdk";
import {
  AppEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch, Select } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";
import {
  actionsToDisable,
  actionsToHide,
  disabledReason,
  filterName,
  filterValues,
  visibleVizIds,
  customActionNameForShowThisViz
} from "../../constants";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export const FullApp = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [fullHeight, setFullHeight] = React.useState(false);
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const [page, setPage] = React.useState(Page.Home);
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

  const applyFilter = (colName: string, value: string[]) => {
    console.log(colName, value);
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: colName.toLowerCase(),
        operator: "EQ",
        values: [value]
      }
    ]);
  };

  const onFilterSelect = (value: string[]) => {
    applyFilter(filterName, value);
  };

  const onToggleFullHeight = (checked: boolean) => {
    setFullHeight(checked);
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

  const selectVizs = () => {
    embedRef.current.trigger(HostEvent.SetVisibleVizs, visibleVizIds);
  };

  // const customAction = () => {
  //   embedRef.current.trigger(HostEvent.Present, {
  //     vizId: "d389fb17-d524-469f-b716-b0ef3eaef309"
  //   });
  // };

  const onCustomAction = (e) => {
    logEvent(e);
    if (e.id === customActionNameForShowThisViz) {
      embedRef.current.trigger(HostEvent.Present, [
        "d389fb17-d524-469f-b716-b0ef3eaef309"
      ]);
      console.log(JSON.parse(e.data));
      console.log("selected current viz");
    }
  };

  const handlePathChange = (value: Page) => {
    setPage(value);
  };

  const onDialogOpen = (e) => {
    logEvent(e);
  };
  const onDialogClose = (e) => {
    logEvent(e);
  };

  // const onCustomAction = (e) => {
  //   if (e.id === "only-this-viz") {
  //     embedRef.current.trigger(HostEvent.SetVisibleVizs, [
  //       "6d39225c-8845-44b4-b105-910981cdbba8"
  //     ]);
  //     console.log(JSON.parse(e.data));
  //   }
  // };

  // const onCustomAction = (e) => {
  //   logEvent(e);
  //   if (e.id === customActionNameForShowThisViz) {
  //     embedRef.current.trigger(HostEvent.SetVisibleVizs, [
  //       "c083e80a-0606-4c94-a3a4-6c3124395cac"
  //     ]);
  //     console.log(JSON.parse(e.data));
  //     console.log("selected current viz");
  //   }
  // };

  const exploreViz = () => {
    embedRef.current.trigger(HostEvent.Explore, {
      vizId: "aa634926-d773-4b53-af84-418981befc74"
    });
    // points: clickedPointData,
    // autoDrillDown: true,
  };

  const Schedule = () => {
    embedRef.current.trigger(HostEvent.Schedule, {});
    // points: clickedPointData,
    // autoDrillDown: true,
  };

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

  const reload = () => {
    embedRef.current.trigger(HostEvent.Reload, {});
  };

  const navigate = () => {
    embedRef.current.trigger(HostEvent.Navigate, {
      path: "saved-answer/d3823bc-0fcb-4f57-abdd-fdbd8b264cd3",
      noReload: true
    });
  };

  const Remove = () => {
    embedRef.current.trigger(HostEvent.Remove, {});
  };

  return (
    <Layout>
      <Header>
        Full App Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200}>
          <div className="sider-content">
            <Select
              defaultValue={Page.Home}
              style={{ width: 120 }}
              onChange={handlePathChange}
            >
              <Option value={Page.Home}>Home</Option>
              <Option value={Page.Liveboards}>Liveboards</Option>
              <Option value={Page.Data}>Data</Option>
              <Option value={Page.Answers}>Answers</Option>
              <Option value={Page.Search}>Search</Option>
            </Select>

            <Select
              style={{ width: 135 }}
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
            <Button onClick={Remove}>Remove</Button>
            <Button onClick={navigate}>Navigate</Button>

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
            <Switch
              checkedChildren="Height is Adaptive"
              unCheckedChildren="Height is static"
              onChange={onToggleFullHeight}
            />
          </div>
        </Sider>

        <Content>
          <AppEmbed
            frameParams={{
              height: 1500
            }}
            className="liveboard-content"
            ref={embedRef}
            pageId={page}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason={disabledReason}
            path="/navigateToPage"
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
            onQueryChanged={logEvent}
            onAlert={logEvent}
            liveboardV2={lbV2}
            onDialogOpen={onDialogOpen}
            onDialogClose={onDialogClose}
            onRouteChange={logEvent(EmbedEvent.RouteChange)}
            showPrimaryNavbar={false}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
