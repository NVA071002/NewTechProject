import React from "react";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import SelectMajor from "../../../common/SelectMajor";

function ModalUpdateInfo({ data, setData, open, handleClose, handleOk }) {
  return (
    <ModalUpdate open={open} handleClose={handleClose} handleOk={handleOk}>
      <Grid container spacing={2} my={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Họ và tên"
            size="small"
            value={data?.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Username"
            size="small"
            value={data?.username}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Email"
            size="small"
            value={data?.email}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <SelectMajor
            value={data?.major?._id || data?.major}
            setValue={(e) => setData((prev) => ({ ...prev, major: e }))}
            disabled={true}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Ngày sinh"
            value={data?.birth}
            onChange={(e) =>
              setData((prev) => ({ ...prev, birth: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Địa chỉ"
            size="small"
            value={data?.address}
            onChange={(e) =>
              setData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            size="small"
            value={data?.phone}
            onChange={(e) =>
              setData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            row
            value={data?.sex}
            onChange={(e) =>
              setData((prev) => ({ ...prev, sex: e.target.value }))
            }
          >
            <FormControlLabel
              value={1}
              control={<Radio size="small" />}
              label="Nam"
            />
            <FormControlLabel
              value={0}
              control={<Radio size="small" />}
              label="Nữ"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalUpdateInfo;
