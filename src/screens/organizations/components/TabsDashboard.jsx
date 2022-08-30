import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import "@reach/tabs/styles.css";
import PropTypes from "prop-types";

const TabsDashboard = ({ panes }) => {
  return (
    <div className="bg-white">
      <Tabs orientation="vertical">
        <TabList className="w-[91px] !bg-black">
          {panes.map((pane) => (
            <Tab className="!border-none">{pane.menuItem}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {panes.map((pane) => (
            <TabPanel>
              <div>{pane.render}</div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabsDashboard;

TabsDashboard.propTypes = {
  panes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({ menuItem: PropTypes.element, name: PropTypes.string, render: PropTypes.element })
    )
  ),
};
TabsDashboard.defaultProps = {
  panes: [],
};
