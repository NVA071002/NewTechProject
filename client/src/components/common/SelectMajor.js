import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem"
function SelectMajor({ value, setValue, disabled = false }) {
  const [listMajor, setListMajor] = useState([]);

  useEffect(() => {
    const getListMajor = async () => {
      try {
        // const res = await list();
        // setListMajor(res.data?.filter((i) => i.isBlock > 0));
      } catch (error) {
        throw error;
      }
    };
    getListMajor();
  }, []);

  useEffect(() => {
    if (!value) {
      setValue && setValue(listMajor[0]?._id);
    }
  }, [listMajor]);

  return (
    <>
      <TextField
        fullWidth
        size="small"
        label="Chuyên ngành"
        value={value}
        select
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      >
        <MenuItem value={"Information Technology"}>
          Information Technology
        </MenuItem>
      </TextField>
    </>
  );
}

export default SelectMajor;
