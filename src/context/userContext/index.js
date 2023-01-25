import React from 'react';
export const UserContext = React.createContext({
  auth: false,
  userId: null,
  setAuth: () => {},
  setUserId: () => {},
  userRole: null,
  setUserRole: () => {},
  userName: null,
  setUserName: () => {},
  organization_id: null,
  setOrganization_id: () => {},
  workspace: null,
  setWorkspaces: () => {},
});
