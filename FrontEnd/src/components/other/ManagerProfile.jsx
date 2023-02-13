import Box from "@mui/material/Box";

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
      <div style={{ alignItems: "left" }}>
        <p style={{ fontSize: "20px" }}>Hồ sơ và chế độ hiển thị</p>

        <p>
          Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào
          người khác xem được và ứng dụng nào có thể truy cập.
        </p>
      </div>
    </Box>
  );
}
