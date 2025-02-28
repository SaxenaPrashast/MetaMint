import React from "react";
import { Box, Heading } from "@chakra-ui/react";

// Import table components
import CheckTable from "views/admin/Analytics/components/CheckTable";
import ColumnsTable from "views/admin/Analytics/components/ColumnsTable";
import ComplexTable from "views/admin/Analytics/components/ComplexTable";
import DevelopmentTable from "views/admin/Analytics/components/DevelopmentTable";

// Import column definitions
import {
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataDevelopment,
} from "views/admin/Analytics/variables/columnsData";

// Import table data
import tableDataCheck from "views/admin/Analytics/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/Analytics/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/Analytics/variables/tableDataComplex.json";
import tableDataDevelopment from "views/admin/Analytics/variables/tableDataDevelopment.json";

const Analytics = () => {
  return (
    <Box p={6}>
      <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />

      <Heading size="md" mt={6} mb={2}>Columns Table</Heading>
      <ColumnsTable columnsData={columnsDataColumns} tableData={tableDataColumns} />

      <Heading size="md" mt={6} mb={2}>Complex Table</Heading>
      <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />

      <Heading size="md" mt={6} mb={2}>Development Table</Heading>
      <DevelopmentTable columnsData={columnsDataDevelopment} tableData={tableDataDevelopment} />
    </Box>
  );
};

export default Analytics;
