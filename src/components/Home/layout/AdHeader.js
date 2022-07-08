import SimpleImageSlider from "react-simple-image-slider";
console.log(process.env.NODE_ENV)
const AdHeader = () => {
  const images = [
    { url: "https://api.wism.in00/a.png" },
    { url: "https://api.wism.in:5500/b.jpg" },
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
