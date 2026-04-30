import { QRCodeSVG } from "qrcode.react";


function Qr() {
  return (
    <div className="grid h-24 w-24 place-items-center rounded-md border border-[#c78b38]/70 bg-black">
      <QRCodeSVG value={window.location.origin} size={110} bgColor="#000" fgColor="#c78b38" level="H" includeMargin={false} />
    </div>
  );
}

export default Qr;
