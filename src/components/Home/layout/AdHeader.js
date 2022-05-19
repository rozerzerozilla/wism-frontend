import SimpleImageSlider from "react-simple-image-slider";
const AdHeader = () => {
  const images = [
    { url: "http://localhost:5500/a.png" },
    { url: "http://localhost:5500/b.jpg" },
  ];
  return (
    <div className="row mt-5">
      <SimpleImageSlider
        width={1024}
        height={120}
        images={images}
        showBullets={true}
        showNavs={true}
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default AdHeader;
