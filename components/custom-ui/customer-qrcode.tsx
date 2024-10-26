import QRCode from "react-qr-code";

export const CustomerQrCode = ({ id }: { id: string }) => {
  const customerId = id || "";
  return (
    <>
      {customerId && (
        <QRCode
          value={customerId}
          bgColor="transparent"
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      )}
    </>
  );
};
