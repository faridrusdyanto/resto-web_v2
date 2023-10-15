import React, { useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  Button,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Homemenuitem from "../components/home/Homemenuitem";
import menudata from "../utils/menudata";

const useStyles = makeStyles((theme) => ({
  homemenu: {
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 500px)": {
      padding: "50px 0px",
    },
  },
  leaderBoard_left_h1: {
    lineHeight: "40px",
    fontFamily: "Inter, sans-serif",
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginTop: "17px",
    textAlign: "center",
    marginBottom: "20px",
  },
  homemenu_menu: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  homemenu_explore: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  homemenu_data: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    paddingTop: "30px",
    "@media (max-width: 500px)": {
      paddingTop: "0px",
    },
  },
  button: {
    borderRadius: "20px",
    width: "150px",
    marginTop: "10px",
    textTransform: "lowercase",
    background: "white",
    border: "1px solid grey",
  },
}));

export default function Allfoods() {
  const { homemenu_menu, homemenu_explore, homemenu, homemenu_data } =
    useStyles();
  const [menus, setmenus] = useState([]);
  const [tabs, settabs] = useState([]);
  const [tabSelect, setTabSelect] = useState(0);

  useEffect(() => {
    if (menudata) {
      const newMenu = [...menudata];
      let findCategory = [...new Set(newMenu.map((x) => x.category))];
      let fic = newMenu.filter((x) => x.category === findCategory[tabSelect]);
      setmenus(fic);
      settabs(findCategory);
    }
  }, [menudata]);

  const handleChange = (event, newValue) => {
    const newMenu = [...menudata];
    const findTab = [...tabs];
    let fic = newMenu.filter((x) => x.category === findTab[newValue]);
    setmenus(fic);
    setTabSelect(newValue);
  };

  return (
    <div className={homemenu}>
      <div className={homemenu_explore}>
        <Typography className={homemenu_menu} component="h1">
          Menu
        </Typography>
      </div>

      <Tabs
        value={tabSelect}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} value={index} />
        ))}
      </Tabs>
      <SwipeableViews axis={"x"} index={tabSelect}>
        {tabSelect === 0 && (
          <Box p={3}>
            <Typography>
              <div className={homemenu_data}>
                {menus.map((data, index) => (
                  <Homemenuitem key={index} {...data} />
                ))}
              </div>
            </Typography>
          </Box>
        )}
        {tabSelect === 1 && (
          <Box p={3}>
            <Typography>
              <div className={homemenu_data}>
                {menus.map((data, index) => (
                  <Homemenuitem key={index} {...data} />
                ))}
              </div>
            </Typography>
          </Box>
        )}
      </SwipeableViews>
    </div>
  );
}
