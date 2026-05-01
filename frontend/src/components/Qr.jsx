import { QRCodeSVG } from "qrcode.react";


function Qr() {
  return (
    <div className="grid h-24 w-24 place-items-center rounded-md border border-yellow-700 bg-black">
      <QRCodeSVG value={window.location.origin} size={140} bgColor="#000" fgColor="#c78b38" level="H" includeMargin={false} />
      <p className="text-yellow-500">scan this QR code </p>
    </div>
  );
}

export default Qr;
