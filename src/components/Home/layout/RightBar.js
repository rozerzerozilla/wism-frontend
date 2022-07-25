const RightBar = ({ rightad, rightadlink }) => {
  return (
    <>
      {rightad && <img src={rightadlink} alt="leftBar" className="img-fluid" />}
    </>
  );
};

export default RightBar;
