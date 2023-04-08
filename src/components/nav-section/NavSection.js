import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
import { useContext } from "react";

// @mui
import { Box, List, ListItemText } from "@mui/material";

import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { UserContext } from "../../store/Contexts";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { user } = useContext(UserContext);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <>
            {item.role === "ALL" ? (
              <NavItem key={item.title} item={item} />
            ) : user?.role && item.role === user.role ? (
              <NavItem key={item.title} item={item} />
            ) : (
              ""
            )}
          </>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
