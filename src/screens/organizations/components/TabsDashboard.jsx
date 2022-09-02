import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import "@reach/tabs/styles.css";
import PropTypes from "prop-types";

const TabsDashboard = ({ panes }) => {
  return (
    <div className="bg-black">
      <Tabs orientation="vertical">
        <TabList className="!bg-black justify-center">
          {panes.map((pane) => (
            <Tab className="!border-none w-[91px] !py-12">{pane.menuItem}</Tab>
          ))}
        </TabList>
        <TabPanels className="tab-panels px-12 pt-2 pb-12 grow rounded-b-[3.5rem] bg-white h-[900px]">
          {panes.map((pane) => (
            <TabPanel className="h-full">{pane.render}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabsDashboard;

TabsDashboard.propTypes = {
  panes: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.shape({ menuItem: PropTypes.element, render: PropTypes.element }))
  ),
};
TabsDashboard.defaultProps = {
  panes: [],
};
