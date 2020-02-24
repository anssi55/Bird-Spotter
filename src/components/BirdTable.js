import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import Typography from "@material-ui/core/Typography";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import Moment from "react-moment";

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};

const BirdTable = ({ birdData }) => {
  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        { title: "Species", field: "species" },
        {
          title: "Rarity",
          field: "rarity"
        },
        {
          title: "Observation time",
          field: "spottedAt",
          defaultSort: "desc",
          render: rowData => (
            <Moment format="DD/MM/YYYY HH:mm">{rowData.spottedAt}</Moment>
          )
        },
        { title: "Notes", field: "notes", hidden: true }
      ]}
      data={birdData}
      title=""
      options={{
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF"
        }
      }}
      detailPanel={[
        {
          tooltip: "Show notes",
          render: rowData => {
            return <Typography variant="h6">{rowData.notes}</Typography>;
          }
        }
      ]}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
};
export default BirdTable;
