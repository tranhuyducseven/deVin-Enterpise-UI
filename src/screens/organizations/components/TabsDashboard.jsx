import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import "@reach/tabs/styles.css";
import PropTypes from "prop-types";

const TabsDashboard = ({ panes }) => {
  return (
    <div className="bg-white">
      <Tabs orientation="vertical">
        <TabList className="!bg-black">
          {panes.map((pane) => (
            <Tab className="!border-none w-[91px]">{pane.menuItem}</Tab>
          ))}
        </TabList>
        <TabPanels className="p-12">
          {panes.map((pane) => (
            <TabPanel>{pane.render}</TabPanel>
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
