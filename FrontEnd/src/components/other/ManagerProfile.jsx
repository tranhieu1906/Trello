import Box from "@mui/material/Box";
import * as React from "react";
import Avatar from "@mui/material/Avatar";

export default function ManagerProfile() {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "left", width: "500", height: "40" }}>
        <p style={{ fontSize: "30px" }}>Hồ sơ và chế độ hiển thị</p>

        <hr />
        <p>
          Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào
          người khác xem được và ứng dụng nào có thể truy cập.
        </p>
        <div>
          <p>Ảnh hồ sơ và ảnh </p>
          <Avatar
            alt="https://chungcutherivana.com/wp-content/uploads/2022/10/anh-meme-cute-1.jpg"
            // src = {
            //
            // }
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mt: 2,
              mb: 2,
              boxShadow: 2,
              marginLeft: 0,
            }}
          />
        </div>
        <hr />
        <div>
          <h2> Thông tin cá nhân </h2>
        </div>
      </div>
    </Box>
  );
}
